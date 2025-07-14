import { useState, useEffect } from "react";
import { X } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

function extractVideoId(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v");
    } else if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.slice(1);
    }
  } catch {
    return "";
  }
}

export default function CreateCharacterModal({ isOpen, onClose, onSave, initialData = null }) {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    image: "",
    homeworld: "",
    youtubeUrl: "",
    videoId: "",
    description: "",
  });

  const [formError, setFormError] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          ...initialData,
          youtubeUrl: `https://www.youtube.com/watch?v=${initialData.videoId || ""}`,
        });
      } else {
        setFormData({
          name: "",
          species: "",
          image: "",
          homeworld: "",
          youtubeUrl: "",
          videoId: "",
          description: "",
        });
      }
      setFormError(""); 
    }
  }, [isOpen, initialData]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const { name, species, description, homeworld, image, youtubeUrl, videoId } = formData;

    if (!name || !species || !description || !homeworld || !image || !youtubeUrl) {
      setFormError("Por favor completa todos los campos requeridos.");
      return;
    }

    if (!videoId) {
      setFormError("Por favor verifica que el enlace de YouTube sea válido (Si sea de youtube y no de youtube shorts).");
      return;
    }

    if (isCreating) return;
    setIsCreating(true);

    try {
      if (initialData) {
        const docRef = doc(db, "characters", initialData.id);
        await updateDoc(docRef, formData);
        onSave({ ...formData, id: initialData.id });
      } else {
        const docRef = await addDoc(collection(db, "characters"), formData);
        onSave({ ...formData, id: docRef.id });
      }
      onClose();
    } catch (error) {
      console.error("Error al guardar en Firestore:", error);
      setFormError("Ocurrió un error al guardar el personaje.");
    } finally {
      setIsCreating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center px-2 py-4 z-50">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl border border-gray-700 p-4 sm:p-6 w-full max-w-md max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-yellow-400">
            {initialData ? "Editar Personaje" : "Crear Personaje"}
          </h2>
          <button
            onClick={onClose}
            disabled={isCreating}
            className="cursor-pointer text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {formError && (
          <div className="mb-4 bg-red-600/20 border border-red-500 text-red-300 text-sm p-3 rounded-md">
            {formError}
          </div>
        )}

        {isCreating ? (
          <div className="py-8">
            <LoadingSpinner
              size="large"
              text={initialData ? "Guardando cambios..." : "Creando personaje en la galaxia..."}
            />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Nombre *", type: "text", key: "name", required: true, maxLength: 20 },
              { label: "Especie *", type: "text", key: "species", required: true, maxLength: 20 },
              { label: "Planeta de Origen *", type: "text", key: "homeworld", required: true, maxLength: 50 },
              { label: "Descripción *", type: "textarea", key: "description", required: true, maxLength: 150 },
              { label: "URL de Imagen *", type: "url", key: "image", required: true, maxLength: 500 },
              { label: "URL del Video de YouTube *", type: "text", key: "youtubeUrl", required: true, maxLength: 100 },
            ].map(({ label, type, key, required, maxLength }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
                {type === "textarea" ? (
                  <>
                    <textarea
                      required={required}
                      value={formData[key]}
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      maxLength={maxLength}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 h-20 resize-none"
                      placeholder="Breve descripción del personaje..."
                    />
                    <p className="text-xs text-right text-gray-500 mt-1">
                      {formData[key].length}/{maxLength} caracteres
                    </p>
                  </>
                ) : (
                  <>
                    <input
                      type={type}
                      required={required}
                      value={formData[key]}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (key === "youtubeUrl") {
                          setFormData({
                            ...formData,
                            youtubeUrl: value,
                            videoId: extractVideoId(value),
                          });
                        } else {
                          setFormData({ ...formData, [key]: value });
                        }
                      }}
                      maxLength={maxLength}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400"
                    />
                    {maxLength && (
                      <p className="text-xs text-right text-gray-500 mt-1">
                        {formData[key].length}/{maxLength} caracteres
                      </p>
                    )}
                  </>
                )}
              </div>
            ))}

            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="cursor-pointer flex-1 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors font-medium"
              >
                {initialData ? "Guardar Cambios" : "Crear"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

import { Star, Swords, Trash2 } from "lucide-react";
import { useState } from "react";

export default function CharacterCard({
  character,
  onSelect,
  isSelected,
  onDelete,
  onEdit,
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105 h-[460px] ${
        isSelected
          ? "ring-2 ring-yellow-400 shadow-lg shadow-yellow-400/50"
          : "hover:shadow-xl hover:shadow-blue-500/30"
      }`}
      onClick={() => onSelect(character)}
    >
      {confirmDelete && (
        <div className="absolute inset-0 bg-red-700/10 z-40 flex flex-col items-center justify-center text-white rounded-xl backdrop-blur-sm backdrop-brightness-75">
          <p className="text-sm mb-4 text-center px-4">
            ¿Eliminar{" "}
            <span className="text-yellow-300 font-semibold">
              {character.name}
            </span>
            ?
          </p>
          <div className="flex space-x-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(character.id);
              }}
              className="cursor-pointer bg-red-500 hover:bg-red-300 text-white font-medium px-3 py-1 rounded-md text-sm transition"
            >
              Confirmar
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setConfirmDelete(false);
              }}
              className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl border border-gray-700 p-4 backdrop-blur-sm overflow-hidden flex flex-col justify-between h-full">
        
        <div className="relative overflow-hidden rounded-lg mb-2">
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {isSelected && (
            <div className="absolute top-2 left-2 bg-yellow-400 text-black rounded-full p-1">
              <Star className="w-4 h-4" />
            </div>
          )}

          {!confirmDelete && (
            <>
              {onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirmDelete(true);
                  }}
                  title="Eliminar personaje"
                  className="absolute top-2 right-2 z-30 bg-black/60 text-red-400 hover:text-red-300 hover:bg-red-500/10 active:scale-90 active:bg-red-600/20 p-2 rounded-full cursor-pointer transition-all duration-150 ease-in-out backdrop-blur-sm shadow-md"
                  role="button"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              {onEdit && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(character);
                  }}
                  title="Editar personaje"
                  className="absolute top-2 left-2 z-30 bg-black/60 text-yellow-300 hover:text-yellow-200 hover:bg-yellow-500/10 active:scale-90 active:bg-yellow-600/20 p-2 rounded-full cursor-pointer transition-all duration-150 ease-in-out backdrop-blur-sm shadow-md"
                  role="button"
                >
                  ✏️
                </button>
              )}
            </>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors break-words line-clamp-2">
            {character.name}
          </h3>
          <p className="text-gray-300 text-sm truncate">{character.species}</p>
          <p className="text-gray-400 text-xs break-words leading-snug line-clamp-5">
            {character.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3">
          <div className="text-sm text-gray-400 italic">
  🌍 {character.homeworld || "Planeta desconocido"}
</div>
          <div className="flex items-center space-x-1 text-yellow-400">
            <Swords className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

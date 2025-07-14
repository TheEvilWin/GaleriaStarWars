import { useEffect, useState } from "react";
import AnimatedBackground from "../components/AnimatedBackground";
import FullPageLoader from "../components/FullPageLoader";
import Header from "../components/Header";
import VideoSection from "../components/VideoSection";
import CreateCharacterButton from "../components/CreateCharacterButton";
import CharactersGrid from "../components/CharactersGrid";
import CreateCharacterModal from "../components/CreateCharacterModal";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import MediaLinks from "../components/MediaLinks";

export default function StarWarsGallery() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isCharactersLoading, setIsCharactersLoading] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      setIsCharactersLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "characters"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCharacters(data);
        if (data.length > 0) setSelectedCharacter(data[0]);
      } catch (error) {
        console.error("Error cargando personajes desde Firestore:", error);
      } finally {
        setIsCharactersLoading(false);
        setIsInitialLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
  };

  const handleCreateCharacter = (newCharacter) => {
    setCharacters([...characters, newCharacter]);
    if (!selectedCharacter) setSelectedCharacter(newCharacter);
  };

  const handleDeleteCharacter = async (characterId) => {
    try {
      await deleteDoc(doc(db, "characters", characterId));
      setCharacters((prev) => {
        const updated = prev.filter((c) => c.id !== characterId);
        if (selectedCharacter?.id === characterId) {
          setSelectedCharacter(updated.length > 0 ? updated[0] : null);
        }
        return updated;
      });
    } catch (error) {
      console.error("Error al eliminar personaje:", error);
    }
  };

  const handleUpdateCharacter = async (updatedCharacter) => {
    try {
      const characterRef = doc(db, "characters", updatedCharacter.id);
      await updateDoc(characterRef, updatedCharacter);

      setCharacters((prev) =>
        prev.map((char) =>
          char.id === updatedCharacter.id ? updatedCharacter : char
        )
      );

      if (selectedCharacter?.id === updatedCharacter.id) {
        setSelectedCharacter(updatedCharacter);
      }
    } catch (error) {
      console.error("Error al actualizar personaje:", error);
    }
  };

  if (isInitialLoading) return <FullPageLoader />;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <Header characterCount={characters.length} />
        {selectedCharacter && (
          <VideoSection selectedCharacter={selectedCharacter} />
        )}
        <CreateCharacterButton onClick={() => setIsModalOpen(true)} />
        <CharactersGrid
          characters={characters}
          selectedCharacter={selectedCharacter}
          onCharacterSelect={handleCharacterSelect}
          onCharacterDelete={handleDeleteCharacter}
          onCharacterEdit={(character) => {
            setEditingCharacter(character);
            setIsModalOpen(true);
          }}
          isLoading={isCharactersLoading}
        />

        <MediaLinks />

        <CreateCharacterModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCharacter(null);
          }}
          onSave={
            editingCharacter ? handleUpdateCharacter : handleCreateCharacter
          }
          initialData={editingCharacter}
        />
      </div>
    </div>
  );
}

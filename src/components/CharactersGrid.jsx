import CharacterCard from "./CharacterCard";
import LoadingSpinner from "./LoadingSpinner";

export default function CharactersGrid({ characters, selectedCharacter, onCharacterSelect, onCharacterDelete, onCharacterEdit, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner size="large" text="Cargando personajes de la galaxia..." />
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-gray-400 text-lg mb-4">
          No hay personajes en la galaxia aún
        </div>
        <p className="text-gray-500 text-sm">
          Crea tu primer personaje para comenzar la aventura
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          onSelect={onCharacterSelect}
          onDelete={onCharacterDelete}
          onEdit={onCharacterEdit} 
          isSelected={selectedCharacter.id === character.id}
        />
      ))}
    </div>
  );
}

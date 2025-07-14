import { Plus } from "lucide-react";

export default function CreateCharacterButton({ onClick }) {
  return (
    <div className="flex justify-center mb-8">
      <button
        onClick={onClick}
        className="cursor-pointer flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-6 py-3 rounded-lg font-medium hover:from-yellow-400 hover:to-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        <Plus className="w-5 h-5" />
        <span>Crear Personaje</span>
      </button>
    </div>
  );
}

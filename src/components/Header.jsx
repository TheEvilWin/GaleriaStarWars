import { Users, Globe } from "lucide-react";

export default function Header({ characterCount }) {
  return (
    <div className="text-center mb-12">
      <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 drop-shadow-lg mb-4 tracking-wider">
        STAR WARS
      </h1>
      <p className="text-xl text-gray-300 mb-8">Galería de Personajes</p>
      <div className="flex justify-center space-x-8 mb-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Users className="w-6 h-6 text-yellow-400 mr-2" />
            <span className="text-2xl font-bold text-yellow-400">{characterCount}</span>
          </div>
          <p className="text-gray-400 text-sm">Personajes</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Globe className="w-6 h-6 text-blue-400 mr-2" />
            <span className="text-2xl font-bold text-blue-400">∞</span>
          </div>
          <p className="text-gray-400 text-sm">Galaxias</p>
        </div>
      </div>
    </div>
  );
}

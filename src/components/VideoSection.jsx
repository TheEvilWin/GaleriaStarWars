export default function VideoSection({ selectedCharacter }) {
  return (
    <div className="mb-12">
      <div className="relative w-full aspect-video mb-6 shadow-2xl rounded-xl overflow-hidden border border-gray-700">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 pointer-events-none"></div>
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${selectedCharacter.videoId}`}
          title={`${selectedCharacter.name} - Star Wars`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="text-center bg-gradient-to-r from-gray-900/80 to-gray-800/80 rounded-xl p-6 backdrop-blur-sm border border-gray-700">
        <h2 className="text-3xl font-bold text-yellow-400 mb-2 break-words">
          {selectedCharacter.name}
        </h2>
        <p className="text-gray-300 mb-2">{selectedCharacter.species}</p>
        <p className="text-gray-400 break-words">{selectedCharacter.description}</p>
      </div>
    </div>
  );
}

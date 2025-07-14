const platforms = [
  {
    name: "Disney+",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg",
    link: "https://www.disneyplus.com/",
    description: "Toda la saga de Star Wars disponible en streaming."
  },
  {
    name: "Amazon Prime Video",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png",
    link: "https://www.primevideo.com/",
    description: "Alquila o compra películas de la saga."
  },
  {
    name: "Netflix",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png",
    link: "https://www.netflix.com/mx/",
    description: "Episodios y películas de Star Wars disponibles en HD."
  },
  {
    name: "HBO Max",
    logo: "https://1000marcas.net/wp-content/uploads/2022/05/HBO-Max-Logo.png",
    link: "https://www.hbomax.com/mx/es",
    description: "Películas de Star Wars."
  }
];

export default function MediaLinks() {
  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold text-yellow-400 text-center mb-8">
        🎬 Dónde ver Star Wars
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {platforms.map((p) => (
          <a
            key={p.name}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-xl p-4 text-center hover:shadow-lg hover:scale-105 transition transform"
          >
            <img
              src={p.logo}
              alt={`${p.name} logo`}
              className="h-12 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-white mb-2">{p.name}</h3>
            <p className="text-gray-400 text-sm">{p.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

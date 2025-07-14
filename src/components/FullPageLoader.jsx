import AnimatedBackground from "./AnimatedBackground";
import LoadingSpinner from "./LoadingSpinner";

export default function FullPageLoader() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 drop-shadow-lg mb-8 tracking-wider">
            STAR WARS
          </h1>
          <LoadingSpinner size="xlarge" text="Iniciando transmisión desde una galaxia muy, muy lejana..." />
        </div>
      </div>
    </div>
  );
}

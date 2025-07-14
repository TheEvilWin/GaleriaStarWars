export default function LoadingSpinner({ size = "medium", text = "Cargando..." }) {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-8 h-8", 
    large: "w-12 h-12",
    xlarge: "w-16 h-16"
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-yellow-400/30 rounded-full animate-spin`}>
          <div className="absolute inset-0 border-4 border-transparent border-t-yellow-400 rounded-full animate-spin"></div>
        </div>
        <div className={`absolute inset-2 border-2 border-blue-400/50 rounded-full animate-spin`} style={{ animationDirection: 'reverse', animationDuration: '1s' }}>
          <div className="absolute inset-0 border-2 border-transparent border-b-blue-400 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        </div>
      </div>
      {text && <p className="text-gray-300 text-sm font-medium animate-pulse">{text}</p>}
    </div>
  );
}

export default function Spinner() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <div className="relative w-24 h-24">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-full border-4 border-blue-500 rounded-lg animate-spin-slow"
            style={{
              transform: `rotate(${i * 90}deg)`,
              animationDelay: `${i * 0.2}s`,
            }}
          ></div>
        ))}
        <div className="absolute inset-4 bg-blue-500 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
}

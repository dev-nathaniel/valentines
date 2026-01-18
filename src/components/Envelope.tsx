import React, { useState } from "react";

interface EnvelopeProps {
  isOpen: boolean;
  onClick: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({ isOpen, onClick }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={`relative w-80 h-56 transition-all duration-700 cursor-pointer group envelope-shadow ${isOpen ? "scale-110" : isHovering ? "scale-105" : "scale-100"}`}
      onClick={!isOpen ? onClick : undefined}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={() => setIsHovering(false)}
    >
      {/* Back face of envelope */}
      <div className="absolute inset-0 bg-rose-200 rounded-lg shadow-inner"></div>

      {/* The Letter inside */}
      <div
        className={`absolute left-4 right-4 bg-white p-6 shadow-lg transition-all duration-1000 ease-in-out origin-bottom ${
          isOpen
            ? "-translate-y-32 z-20 scale-100"
            : "translate-y-2 z-0 scale-95 opacity-0"
        }`}
      >
        <div className="border-2 border-rose-100 p-4 h-full flex flex-col items-center justify-center text-center">
          <h2 className="font-romantic text-3xl text-rose-600 mb-2">
            My Dearest,
          </h2>
          <p className="text-gray-700 italic text-sm">
            Every moment with you is like a beautiful dream...
          </p>
          <div className="mt-4 text-rose-400">❤</div>
        </div>
      </div>

      {/* Flap - Top */}
      <div
        className={`absolute top-0 left-0 w-full h-1/2 bg-rose-300 rounded-t-lg transition-all duration-700 origin-top z-30 ${
          isOpen ? "-rotate-x-180 opacity-0" : "rotate-x-0"
        }`}
        style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
      ></div>

      {/* Bottom pocket of envelope */}
      <div
        className="absolute inset-0 bg-rose-400 rounded-lg z-10"
        style={{
          clipPath: "polygon(0 40%, 50% 100%, 100% 40%, 100% 100%, 0 100%)",
        }}
      ></div>
      <div
        className="absolute inset-0 bg-rose-300 rounded-lg z-10"
        style={{
          clipPath: "polygon(0 100%, 0 40%, 50% 65%, 100% 40%, 100% 100%)",
        }}
      ></div>

      {/* Wax seal */}
      {!isOpen && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-rose-600 rounded-full z-40 flex items-center justify-center shadow-lg animate-pulse border-2 border-rose-400">
          <span className="text-white text-xl">❤</span>
        </div>
      )}
    </div>
  );
};

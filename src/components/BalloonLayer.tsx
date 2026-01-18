import React, { useEffect, useState } from "react";
import type { Balloon } from "../types";

export const BalloonLayer: React.FC<{ active: boolean }> = ({ active }) => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    if (active) {
      const colors = ["#fb7185", "#f43f5e", "#e11d48", "#be123c", "#fda4af"];
      const interval = setInterval(() => {
        const newBalloon: Balloon = {
          id: Date.now(),
          left: `${Math.random() * 100}%`,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: `${Math.floor(Math.random() * 30) + 20}px`,
          delay: `${Math.random() * 2}s`,
        };
        setBalloons((prev) => [...prev, newBalloon]);

        // Cleanup old balloons
        setTimeout(() => {
          setBalloons((prev) => prev.filter((b) => b.id !== newBalloon.id));
        }, 8000);
      }, 300);

      return () => clearInterval(interval);
    }
  }, [active]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="balloon"
          style={{
            left: balloon.left,
            color: balloon.color,
            fontSize: balloon.size,
            animationDelay: balloon.delay,
          }}
        >
          <svg fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

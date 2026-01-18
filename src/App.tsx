import { useEffect, useRef, useState } from "react";
import "./App.css";
import { BalloonLayer } from "./components/BalloonLayer";
import { AppState } from "./types";
import { Envelope } from "./components/Envelope";
import her from "./assets/her.jpg";
import axios from "axios";
import run from "./assets/DontRunAway.mp3";
import rainDance from "./assets/DaveRaindance.mp3";

function App() {
  const [state, setState] = useState<AppState>(AppState.CLOSED);
  const [isLoading, setIsLoading] = useState(false);
  const userName = "Kiara";
  const otherName = "Chiamaka";
  const [aiMessage, setAiMessage] = useState<string>(
    "Waiting for a special moment...",
  );
  // const [noButtonStyle, setNoButtonStyle] = useState<React.CSSProperties>({});
  const [audioPlaying, setAudioPlaying] = useState(false);
  const musicRef = useRef<HTMLAudioElement>(null);
  const [currentSong, setCurrentSong] = useState<"run" | "rainDance">("run");
  const [musicToggleClicked, setMusicToggleClicked] = useState(false);

  useEffect(() => {
    const startMusic = () => {
      if (musicRef.current && !audioPlaying) {
        musicRef.current
          .play()
          .catch((err) => console.log("Audio play failed:", err));
        setAudioPlaying(true);
      }
    };

    document.addEventListener("click", startMusic, { once: true });
    return () => document.removeEventListener("click", startMusic);
  }, [audioPlaying]);

  const handleMusicToggle = () => {
    if (musicRef.current) {
      musicRef.current.pause();

      // Switch to the other song
      const newSong = currentSong === "run" ? "rainDance" : "run";
      setCurrentSong(newSong);

      // Update the audio source
      musicRef.current.src = newSong === "run" ? run : rainDance;
      musicRef.current.load();

      // Play the new song if audio was playing
      if (audioPlaying) {
        musicRef.current
          .play()
          .catch((err) => console.log("Audio play failed:", err));
      }

      setMusicToggleClicked(true);
    }
  };

  const handleOpen = async () => {
    setState(AppState.OPENING);
    setIsLoading(true);

    // Simulate opening sequence
    setTimeout(() => {
      setState(AppState.OPENED);
    }, 500);
    // const message = await generateLoveMessage(userName);
    // setAiMessage(
    //   "Every moment with you feels like magic. You make my world brighter, my heart fuller, and my life infinitely better. Will you be my Valentine? ❤️",
    // );
    setAiMessage(
      "I wanted to do this in a way that felt a little more special and personal. To my love and the most beautiful girl, Chiamaka, who I love dearly. Will you be my Valentine? ❤️",
    );
    // setAiMessage(message);
    setIsLoading(false);
  };

  // const moveNoButton = useCallback(() => {
  //   const x = Math.random() * (window.innerWidth - 100);
  //   const y = Math.random() * (window.innerHeight - 50);
  //   setNoButtonStyle({
  //     position: "fixed",
  //     left: `${x}px`,
  //     top: `${y}px`,
  //     transition: "all 0.2s ease",
  //     zIndex: 100,
  //   });
  // }, []);

  const handleYes = async () => {
    setState(AppState.PROPOSED);

    try {
      console.log("Sending valentine notification...");
      await axios.post(
        "https://my-portfolio-backend-8401.onrender.com/valentine",
      );
      console.log("Valentine notification sent successfully.");
    } catch (error) {
      console.error("Failed to send valentine notification:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      <audio ref={musicRef} loop src={run} />

      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-50 via-rose-100/30 to-rose-200/20 pointer-events-none"></div>

      <BalloonLayer
        active={state === AppState.OPENED || state === AppState.PROPOSED}
      />

      {/* Pre-Intro Screen */}
      {state === AppState.CLOSED && (
        <div className="z-10 text-center max-w-md animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-romantic text-rose-600 mb-8 drop-shadow-sm">
            A Special Little Thing
          </h1>
          <div className="bg-white/60 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-rose-100 flex flex-col items-center">
            <p className="text-rose-700 mb-2 font-medium text-lg italic">
              To my dearest,
            </p>
            <h2 className="text-5xl font-romantic text-rose-500 mb-10 drop-shadow-sm">
              {userName}
            </h2>

            <p className="text-xs text-rose-400 mb-6 italic uppercase tracking-widest">
              Tap the wax seal to open
            </p>
            <div className="flex justify-center">
              <Envelope isOpen={false} onClick={handleOpen} />
            </div>
          </div>
        </div>
      )}

      {/* Opening/Opened State */}
      {(state === AppState.OPENING || state === AppState.OPENED) && (
        <div className="z-10 flex flex-col items-center max-w-2xl w-full">
          <div
            className={`transition-all duration-1000 transform ${state === AppState.OPENED ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
          >
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border-b-8 border-rose-100 text-center relative">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-5xl">
                💝
              </div>

              <h1 className="font-romantic text-4xl md:text-5xl text-rose-600 mb-6">
                To {userName},
              </h1>

              <div className="min-h-[100px] flex items-center justify-center">
                {isLoading ? (
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-rose-400 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-rose-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-3 h-3 bg-rose-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  </div>
                ) : (
                  <p className="text-xl md:text-2xl text-gray-700 italic leading-relaxed">
                    "{aiMessage}"
                  </p>
                )}
              </div>

              {!isLoading && (
                <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
                  <button
                    onClick={handleYes}
                    className="px-10 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-2xl font-bold shadow-lg transform hover:scale-110 active:scale-95 transition-all"
                  >
                    YES! 😍
                  </button>
                  {/* <button
                    onMouseEnter={moveNoButton}
                    onClick={moveNoButton}
                    style={noButtonStyle}
                    className="px-8 py-3 bg-gray-100 text-gray-500 rounded-full text-lg shadow hover:bg-gray-200 transition-colors"
                  >
                    No
                  </button> */}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Celebration State */}
      {state === AppState.PROPOSED && (
        <div className="z-10 text-center animate-bounce-slow">
          <h1 className="text-6xl md:text-8xl font-romantic text-rose-600 mb-6 drop-shadow-lg">
            My Baby!
          </h1>
          <div className="relative">
            <img
              // src="https://picsum.photos/seed/love/600/400"
              src={her}
              alt="Celebration"
              style={{
                width: "600px",
                maxHeight: "400px",
                objectFit: "cover",
              }}
              className="rounded-3xl shadow-2xl border-8 border-white max-w-full h-auto"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl transform rotate-12">
              <p className="font-romantic text-2xl text-rose-500">
                I Love You! ❤️
              </p>
            </div>
          </div>
          <p className="mt-12 text-rose-700 text-xl font-medium bg-white/50 py-2 px-6 rounded-full inline-block backdrop-blur-sm">
            Let's have an amazing Valentine's Day, {otherName}!
          </p>
        </div>
      )}

      {/* Audio toggle */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleMusicToggle}
          className="w-12 h-12 bg-white/80 backdrop-blur rounded-full shadow-lg flex items-center justify-center text-rose-500 hover:bg-white transition-all"
          title="Switch music"
        >
          <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </button>
        {!musicToggleClicked && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap">
            Click button below to switch music
          </div>
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `,
        }}
      />
    </div>
  );
}

export default App;

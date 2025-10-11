// NotificationPlayer.jsx
import { useState, useEffect } from "react";

export default function NotificationPlayer({ song }) {
    const [gradient, setGradient] = useState("");

    const getRandomGradient = () => {
const gradientList = [
  "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
  "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
  "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
  "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
  "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
  "linear-gradient(135deg, #c2e9fb 0%, #a1c4fd 100%)",
  "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
  "linear-gradient(135deg, #fbc7d4 0%, #9796f0 100%)",
  "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
  "linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)",
  "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
  "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
  "linear-gradient(135deg, #a1ffce 0%, #faffd1 100%)",
  "linear-gradient(135deg, #ffdde1 0%, #ee9ca7 100%)",
  "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 50%, #fad0c4 100%)",
  "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 50%, #fbc2eb 100%)",
  "linear-gradient(135deg, #89f7fe 0%, #66a6ff 50%, #6a85b6 100%)",
  "linear-gradient(135deg, #fddb92 0%, #d1fdff 50%, #a1c4fd 100%)"
];

        return gradients[Math.floor(Math.random() * gradients.length)];
    };

    useEffect(() => {
        setGradient(getRandomGradient());
    }, [song]);

    return (
        <div style={{ background: gradient }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md p-4 rounded-lg shadow-xl text-white backdrop-blur-sm transition-all duration-700">
            
            {/* Cover and Info */}
            <div className="flex items-center space-x-4">
                <img src={song.cover} alt="cover" className="w-16 h-16 rounded-md object-cover" />
                <div className="flex-1 overflow-hidden">
                    <h2 className="font-bold text-lg truncate">{song.title}</h2>
                    <p className="text-sm opacity-80 truncate">{song.artist}</p>
                    <p className="text-xs opacity-60">Duration: {song.duration}</p>
                </div>
            </div>

            {/* Progress bar */}
            <input type="range" min="0" max={song.durationSec} value={song.currentSec}
                onChange={() => {}} className="w-full mt-3 accent-white"/>

            {/* Branding */}
            <div className="absolute bottom-2 right-4 text-xs opacity-60">
                AURAMUSIC
            </div>
        </div>
    );
}

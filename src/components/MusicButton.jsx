import React, { useRef, useState } from "react";
import { PlayCircleOutlined, PauseCircleOutlined } from "@ant-design/icons";

const MusicButton = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* THÊM loop để nhạc tự lặp */}
      <audio ref={audioRef} src="/musics/relux.mp3" preload="auto" loop />
      <button
        onClick={handleTogglePlay}
        className="fixed bottom-28 right-4 z-50 bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-700 transition duration-300"
      >
        {isPlaying ? (
          <PauseCircleOutlined style={{ fontSize: 24 }} />
        ) : (
          <PlayCircleOutlined style={{ fontSize: 24 }} />
        )}
      </button>
    </>
  );
};

export default MusicButton;

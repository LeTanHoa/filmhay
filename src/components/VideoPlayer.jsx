import React, { useEffect, useRef } from "react";

const VideoPlayer = ({ link }) => {
  const playerRef = useRef(null);
  const [error, setError] = React.useState(false);

  useEffect(() => {
    const jwPlayerKey = process.env.REACT_APP_JW_PLAYER_KEY;
    
    if (!jwPlayerKey) {
      console.error("JW Player key is not configured. Please check your .env file.");
      setError(true);
      return;
    }

    if (window.jwplayer && link) {
      try {
        // Destroy existing player if it exists
        if (playerRef.current) {
          playerRef.current.remove();
        }

        // Initialize new player
        const player = window.jwplayer("player-container").setup({
          file: link,
          width: "100%",
          height: "500px",
          autostart: false,
          primary: "html5",
          hlshtml: true,
          androidhls: true,
          stretching: "uniform",
          events: {
            onError: (e) => {
              console.error("JW Player error:", e);
              setError(true);
            }
          }
        });

        playerRef.current = player;
      } catch (err) {
        console.error("Error initializing JW Player:", err);
        setError(true);
      }
    }

    // Cleanup on unmount
    return () => {
      if (playerRef.current) {
        playerRef.current.remove();
      }
    };
  }, [link]);

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500 mb-2">
          Video không thể phát trong trình phát. Bạn có thể mở nó trong tab mới:
        </p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Mở Video trong Tab mới
        </a>
      </div>
    );
  }

  return (
    <div className="my-4">
      <div id="player-container"></div>
    </div>
  );
};

export default VideoPlayer;

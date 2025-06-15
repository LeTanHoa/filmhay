import React, { useState } from "react";

const VideoPlayer = ({ link }) => {
  const [error, setError] = useState(false);

  const handleIframeError = () => {
    console.warn("Lỗi iframe: Video không load được");
    setError(true);
  };

  return (
    <div className="my-4">
      {!error ? (
        <iframe
          src={link}
          width="100%"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title="Video Player"
          onError={handleIframeError}
          referrerPolicy="no-referrer"
          style={{ border: "none" }}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          className="w-full aspect-video border-none"
        />
      ) : (
        <div className="text-center">
          <p className="text-red-500 mb-2">
            ⚠️ Không thể phát video trong trình phát. Vui lòng mở trong tab mới:
          </p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            👉 Mở Video trong Tab mới
          </a>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;

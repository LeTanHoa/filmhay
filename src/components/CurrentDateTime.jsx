import React, { useEffect, useState } from "react";

const CurrentDateTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // cập nhật mỗi giây

    return () => clearInterval(interval); // dọn dẹp khi unmount
  }, []);

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="flex justify-start mb-3 items-center gap-2">
      <span className="text-white text-xl font-bold">
        {formatTime(currentTime)}
      </span>
      <span className="text-white text-xl font-bold"> - </span>
      <span className="text-white text-xl font-bold">
        {formatDate(currentTime)}
      </span>
    </div>
  );
};

export default CurrentDateTime;

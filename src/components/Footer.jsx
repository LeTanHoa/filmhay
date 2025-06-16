import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex mt-10 flex-col gap-5">
      <div className="text-white  text-justify">
        <hr className="mb-4" />
        <strong>Chill With Bon</strong> là không gian giải trí nhẹ nhàng nơi bạn
        có thể thư giãn sau những giờ học tập và làm việc căng thẳng. Tại đây,
        bạn sẽ tìm thấy những bộ phim hấp dẫn, bài viết thú vị, cùng nhiều nội
        dung "chill" giúp bạn tái tạo năng lượng và kết nối với những người cùng
        gu. Hãy cùng Bôn tận hưởng những khoảnh khắc thư giãn đúng nghĩa!
      </div>
      <div className="flex justify-between items-center">
        <Link to="/" className="text-white text-5xl md:text-7xl font-bold">
          CWB
        </Link>
        <span className="text-white">Chill Một Chút - Vui Cả Ngày</span>
      </div>
    </div>
  );
};

export default Footer;

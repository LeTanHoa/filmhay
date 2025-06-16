import React from "react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  const dataCategories = [
    { name: "Phim SexHD", slug: "sexhd" },
    { name: "Phim Sex Vietsub", slug: "vietsub" },
    { name: "XVIDEOS", slug: "xvideos" },
    { name: "Nhật Bản", slug: "nhat-ban" },
    { name: "Học Sinh", slug: "hoc-sinh" },
    { name: "Vụng Trộm", slug: "vung-trom" },
    { name: "Tập Thể", slug: "tap-the" },
    { name: "Loạn Luân", slug: "loan-luan" },
    { name: "PornHub", slug: "pornhub" },
    { name: "Hiếp Dâm", slug: "hiep-dam" },
    { name: "Việt Nam Clip", slug: "viet-nam-clip" },
    { name: "Mỹ - Châu Âu", slug: "chau-au" },
    { name: "Trung Quốc", slug: "trung-quoc" },
    { name: "Hàn Quốc", slug: "han-quoc-18-" },
    { name: "Không Che", slug: "khong-che" },
    { name: "JavHD", slug: "jav-hd" },
    { name: "Hentai", slug: "hentai" },
  ];

  return (
    <div className="">
      <div className="flex gap-3 mb-4 flex-col">
        <span className="text-white text-xl font-bold">Danh Mục Phim</span>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              navigate(`/`);
            }}
            className="text-white cursor-pointer hover:text-blue-500 transition duration-300 ease-in-out"
          >
            Tất cả
          </button>
          {dataCategories.map((category) => (
            <button
              key={category.slug}
              onClick={() => {
                localStorage.setItem("categorySlug", category.slug);
                navigate(`/category/${category.slug}`);
              }}
              className="text-white cursor-pointer hover:text-blue-500 transition duration-300 ease-in-out"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;

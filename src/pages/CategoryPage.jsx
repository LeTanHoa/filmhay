import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { API_ENDPOINTS } from "../config/api";
import { Pagination, Spin } from "antd";

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

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
  ];

  const nameCategory = dataCategories.find(
    (category) => category.slug === categorySlug
  );

  useEffect(() => {
    const fetchMoviesByCategory = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          API_ENDPOINTS.CATEGORY_MOVIES(categorySlug, page)
        );
        setMovies(response.data.movies);
        setTotalPages(response.data.page.total);
      } catch (error) {
        console.error(
          `Error fetching movies for category ${categorySlug}:`,
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesByCategory();
  }, [categorySlug, page]);

  const handlePageChange = (current, size) => {
    setPage(current);
    setPageSize(size);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="flex min-h-28 flex-col gap-3 text-white">
      <span className="text-xl block font-bold text-white mb-6">
        Thể loại: {nameCategory ? nameCategory.name : ""}
      </span>

      <Spin
        spinning={loading}
        className="py-10 "
        tip="Đang tải phim..."
        size="large"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <div key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </Spin>

      {!loading && (
        <div className="flex justify-center mt-8">
          <Pagination
            current={page}
            pageSize={pageSize}
            total={totalPages}
            onChange={handlePageChange}
            showSizeChanger
            pageSizeOptions={["10", "20", "30", "50"]}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryPage;

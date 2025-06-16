import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import MoviesByActor from "./pages/MoviesByActor";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import Footer from "./components/Footer";
import MusicButton from "./components/MusicButton";
import { CaretUpOutlined } from "@ant-design/icons";
function App() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="min-h-screen bg-[#131313] flex flex-col">
      <Router>
        <Navbar />
        <div className="max-w-6xl px-5 md:px-0 mx-auto mt-44 md:mt-32 mb-24 flex flex-col gap-3 flex-grow ">
          <Categories />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:slug" element={<MovieDetail />} />
            <Route path="/category/:categorySlug" element={<CategoryPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/actor" element={<MoviesByActor />} />
          </Routes>
          <Footer />
        </div>
        <div>
          <div
            onClick={scrollToTop}
            className="fixed cursor-pointer bottom-44 right-4 z-50 bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-700 transition duration-300"
          >
            <CaretUpOutlined />
          </div>
          <MusicButton />
        </div>
      </Router>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import MoviesByActor from "./pages/MoviesByActor";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";

function App() {
  return (
    <div className="min-h-screen bg-[#131313] flex flex-col">
      <Router>
        <Navbar />
        <div className="max-w-6xl px-5 md:px-0 mx-auto my-36 flex flex-col gap-3 flex-grow ">
          <Categories />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:slug" element={<MovieDetail />} />
            <Route path="/category/:categorySlug" element={<CategoryPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/actor" element={<MoviesByActor />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

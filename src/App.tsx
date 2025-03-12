// Libraries
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Context
import { PhotoProvider } from "./context/PhotoContext/PhotoProvider";

// Pages components
import GridPage from "./pages/Grid";
import DetailsPage from "./pages/Details";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <PhotoProvider>
      <Router>
        <header>
          <h1>Mansonry Gallery</h1>
        </header>
        <Routes>
          <Route path="/" element={<GridPage />} />
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </PhotoProvider>
  );
}

export default App;

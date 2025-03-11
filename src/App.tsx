// Libraries
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages components
import GridPage from "./pages/Grid";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <header>
        <h1>Mansonry Gallery</h1>
      </header>
      <Routes>
        <Route path="/" element={<GridPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

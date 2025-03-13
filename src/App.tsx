// Libraries
import { Routes, Route } from "react-router-dom";

// Context
import { PhotoProvider } from "./contexts/PhotoContext/PhotoProvider";
import { photoContextInitialValues } from "./contexts/PhotoContext/PhotoContext";

// Pages components
import GridPage from "./pages/Grid";
import DetailsPage from "./pages/Details";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <PhotoProvider {...photoContextInitialValues}>
      <header>
        <h1>Mansonry Gallery</h1>
      </header>
      <Routes>
        <Route path="/" element={<GridPage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PhotoProvider>
  );
}

export default App;

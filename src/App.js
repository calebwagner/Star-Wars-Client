import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AppViews } from "./AppViews";

function App() {
  return (
    <Routes>
      <Route path="*" element={<AppViews />} />
    </Routes>

  );
}

export default App;

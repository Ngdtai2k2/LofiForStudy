import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/home';
import Music from './pages/music';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/music" element={<Music />} />
      </Routes>
    </Router>
  );
}

export default App;

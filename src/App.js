import './App.scss';
import LandingPage from './pages/landing_page/LandingPage';
import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
          <Route path="/" element={LandingPage()} />
      </Routes>
    </div>
  );
}

export default App;

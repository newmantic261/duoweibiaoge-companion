import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, ProjectPage, TemplatesPage } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
      </Routes>
    </Router>
  );
}

export default App;

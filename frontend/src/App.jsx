import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Home from './views/Home';
import AuthProvider from './context/AuthContext';
import PrivateRoutes from './utils/PrivateRoutes';
import Register from './views/Register';
import Profile from './views/Profile';
import BlogPage from './views/BlogPage';
import NotFound from './views/NotFound';
import PrivacyPolicy from './views/PrivacyPolicy';
import Contact from './views/Contact';
import About from './views/About';
import Terms from './views/Terms';
import Admin from './views/Admin';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/admin-panel" element={<Admin />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/blogs/:id" element={<BlogPage />} />
          </Route>
          <Route path="*" element={<NotFound />} /> {/* NotFound sayfasını ekle */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Employees from "./pages/Employees";
import Services from "./pages/Services";
import Subscriptions from "./pages/Subscriptions";
import BlogDetails from "./pages/BlogDetails";
import Backoffice from "./pages/Backofffice";
import About from "./pages/About";
import Login from "./pages/Login";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";


export default function App() {
  return (
    <AuthProvider>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tjenester" element={<Services />} />
        <Route path="/traenere" element={<Employees />} />
        <Route path="/priser" element={<Subscriptions />} />
        <Route path="/om-os" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route 
          path="/backoffice" 
          element={
            <ProtectedRoute requiredRole="admin">
              <Backoffice />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}
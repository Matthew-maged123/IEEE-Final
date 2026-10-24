import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { FloatingAssistant } from './components/FloatingAssistant';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { ServiceDetails } from './pages/ServiceDetails';
import { Portfolio } from './pages/Portfolio';
import { RequestWizard } from './pages/RequestWizard';
import { TrackRequest } from './pages/TrackRequest';
import { Contact } from './pages/Contact';
import { Policies } from './pages/Policies';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProductDetail } from './pages/ProductDetail';
import { Auth } from './pages/Auth';

export function App() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/request" element={<RequestWizard />} />
          <Route path="/track" element={<TrackRequest />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<Navigate to="/auth?mode=signin" replace />} />
          <Route path="/signup" element={<Navigate to="/auth?mode=signup" replace />} />
        </Routes>
      </main>

      <FloatingAssistant />
      <Footer />
    </div>
  );
}

export default App;

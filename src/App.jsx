import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactLenis } from '@studio-freight/react-lenis';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import OffersPage from './pages/OffersPage';
import EventsPage from './pages/EventsPage';

import ContactPage from './pages/ContactPage';

function App() {
  return (
    <ReactLenis root>
      <Router>
        <div className="relative min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/offers" element={<OffersPage />} />
              <Route path="/events" element={<EventsPage />} />
             
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ReactLenis>
  );
}

export default App;

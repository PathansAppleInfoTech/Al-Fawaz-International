import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import BackToTop from './components/BackToTop.jsx'
import WhatsAppFloat from './components/WhatsAppFloat.jsx'
import SmoothScroll from './components/SmoothScroll.jsx'
import Home from './pages/Home/page.jsx'
import About from './pages/About/page.jsx'
import Services from './pages/Services/page.jsx'
import Contact from './pages/Contact/page.jsx'

export default function App() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppFloat />
    </>
  )
}

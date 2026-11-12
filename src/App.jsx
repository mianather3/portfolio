import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import TelemetryLab from './components/TelemetryLab.jsx';
import ExperienceAndHonors from './components/ExperienceAndHonors.jsx';
import Footer from './components/Footer.jsx';

// Soft emerald mist and warm golden amber blooms, alternating down the page.
const AMBIENT = [
  'radial-gradient(50% 900px at 18% 0%, rgba(5, 150, 105, 0.08), transparent 70%)',
  'radial-gradient(45% 800px at 85% 3%, rgba(217, 119, 6, 0.10), transparent 70%)',
  'radial-gradient(40% 700px at 92% 30%, rgba(5, 150, 105, 0.08), transparent 70%)',
  'radial-gradient(40% 700px at 5% 42%, rgba(217, 119, 6, 0.10), transparent 70%)',
  'radial-gradient(45% 800px at 12% 72%, rgba(5, 150, 105, 0.08), transparent 70%)',
  'radial-gradient(45% 800px at 90% 86%, rgba(217, 119, 6, 0.10), transparent 70%)',
].join(', ');

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-x-clip bg-paper text-ink">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ backgroundImage: AMBIENT }} />
        <Navbar />
        <main className="relative">
          <Hero />
          <ProjectsSection />
          <TelemetryLab />
          <ExperienceAndHonors />
        </main>
        <div className="relative">
          <Footer />
        </div>
      </div>
    </MotionConfig>
  );
}

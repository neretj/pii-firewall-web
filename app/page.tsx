import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Domains from "./components/Domains";
import Backends from "./components/Backends";
import Integrations from "./components/Integrations";
import Languages from "./components/Languages";
import Quickstart from "./components/Quickstart";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--bg)" }}>
      <Navbar />
      <main id="main-content">
        <Hero />
        <HowItWorks />
        <Domains />
        <Backends />
        <Integrations />
        <Languages />
        <Quickstart />
      </main>
      <Footer />
    </div>
  );
}

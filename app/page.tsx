import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import Domains from "./components/Domains";
import Backends from "./components/Backends";
import Languages from "./components/Languages";
import Quickstart from "./components/Quickstart";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Domains />
      <Backends />
      <Languages />
      <Quickstart />
      <Footer />
    </div>
  );
}

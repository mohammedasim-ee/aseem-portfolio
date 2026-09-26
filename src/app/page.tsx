import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import DigitalTwin from "@/components/DigitalTwin";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Journey from "@/components/Journey";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <DigitalTwin />
        <Projects />
        <Skills />
        <Journey />
        <Contact />
      </main>
      <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Mohammed Aseem — built with Next.js, TypeScript, Tailwind &amp; an AI Digital Twin.
      </footer>
    </>
  );
}

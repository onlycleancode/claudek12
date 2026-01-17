import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Prototype from "@/components/Prototype";
import Philosophy from "@/components/Philosophy";
import AboutMe from "@/components/AboutMe";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Prototype />
        <Philosophy />
        <AboutMe />
      </main>
      <Footer />
    </>
  );
}

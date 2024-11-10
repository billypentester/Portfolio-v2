import Experience from "@/components/experience";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Services from "@/components/services";
import Work from "@/components/work";
import Expertise from "@/components/expertise";
import Education from "@/components/education";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <>
      <div className="custom-container">
        <Navbar />
        <Hero />
        <Services />
        <Work />
        <Experience />
        <Expertise />
        <Education />
        <Contact />
      </div>
      <Footer />
    </>
  );
}
import Experience from "@/components/experience";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Services from "@/components/services";
import Work from "@/components/work";
import Expertise from "@/components/expertise";
import Education from "@/components/education";
import Contact from "@/components/contact";
import Client from "@/components/clients";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="custom-container mt-36">
        <Hero />
        <Services />
        <Work />
        <Experience />
        <Client />
        <Expertise />
        <Education />
        <Contact />
      </div>
      <Footer />
    </>
  );
}
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
import { herolinks, Profile, services, work, experience, clients, expertise, edu, cert, urls } from '@/data/config'

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="custom-container mt-36">
        <Hero heroLinks={herolinks} profilePic={Profile} />
        <Services services={services} />
        <Work work={work} />
        <Experience experience={experience} />
        <Client clients={clients} />
        <Expertise expertise={ expertise } />
        <Education edu={edu} cert={cert} />
        <Contact urls={urls} />
      </div>
      <Footer />
    </>
  );
}
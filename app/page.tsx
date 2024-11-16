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
import { data } from '@/data/config'

export default function Home() {

  const { cert, socialLinks, clients, edu, experience, first_name, profile_pic, services, work, expertise, identity_keyword } = data

  return (
    <>
      <Navbar identity_keyword={identity_keyword} />
      <div className="page-container">
        <Hero heroLinks={socialLinks} profilePic={profile_pic as any} first_name={first_name} />
        <Services services={services} />
        <Work work={work} />
        <Experience experience={experience} />
        <Client clients={clients} />
        <Expertise expertise={ expertise } />
        <Education edu={edu} cert={cert} />
        <Contact urls={socialLinks} />
      </div>
      <Footer identity_keyword={identity_keyword} />
    </>
  );
}
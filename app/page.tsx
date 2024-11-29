import Experience from "@/components/experience";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Work from "@/components/work";
import Expertise from "@/components/expertise";
import Education from "@/components/education";
import Contact from "@/components/contact";
import Client from "@/components/clients";
import { data } from '@/data/config'

export default async function Home() {

  const { cert, socialLinks, clients, edu, experience, first_name, profile_pic, services, work, expertise } = data

  return (
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
  );
}
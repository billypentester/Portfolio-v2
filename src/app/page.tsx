import Experience from "@/src/components/home/experience";
import Hero from "@/src/components/home/hero";
import Services from "@/src/components/home/services";
import Work from "@/src/components/home/work";
import Expertise from "@/src/components/home/expertise";
import Education from "@/src/components/home/education";
import Client from "@/src/components/home/clients";
import { structuredData } from "@/src/config/data";
import SectionObserver from "@/src/components/shared/sectionObserver";

export default async function Home() {

  const { websiteSchema } = structuredData;

  return (
    <section>
      <SectionObserver ids={["hey", "services", "work", "experience", "clients", "expertise", "education"]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
        __html: JSON.stringify(websiteSchema).replace(/</g, '\\u003c'),
        }}
      />
      <Hero />
      <Services />
      <Work />
      <Experience />
      <Client />
      <Expertise />
      <Education />
    </section>
  );
}
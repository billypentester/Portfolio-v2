import Experience from "@/src/components/experience";
import Hero from "@/src/components/hero";
import Services from "@/src/components/services";
import Work from "@/src/components/work";
import Expertise from "@/src/components/expertise";
import Education from "@/src/components/education";
import Client from "@/src/components/clients";
import { structuredData } from "@/src/config/data";

export default async function Home() {

  const { websiteSchema } = structuredData;

  return (
    <section>
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
import Experience from "@/src/components/experience";
import Hero from "@/src/components/hero";
import Services from "@/src/components/services";
import Work from "@/src/components/work";
import Expertise from "@/src/components/expertise";
import Education from "@/src/components/education";
import Contact from "@/src/components/contact";
import Client from "@/src/components/clients";

export default async function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Work />
      <Experience />
      <Client />
      <Expertise />
      <Education />
    </>
  );
}
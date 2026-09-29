import Hero from "@/src/components/home/Hero";
import Snapshot from "@/src/components/home/Snapshot";
import Capabilities from "@/src/components/home/Capabilities";
import FeaturedWork from "@/src/components/home/FeaturedWork";
import ExperiencePreview from "@/src/components/home/ExperiencePreview";
import Approach from "@/src/components/home/Approach";
import Expertise from "@/src/components/home/Expertise";
import Now from "@/src/components/home/Now";
import Writing from "@/src/components/home/Writing";
import Credentials from "@/src/components/home/Credentials";
import SectionObserver from "@/src/components/shared/sectionObserver";
import JsonLd from "@/src/components/seo/JsonLd";
import { TRACKED_HOME_SECTIONS } from "@/src/lib/constants";
import { homeSchema } from "@/src/lib/seo";

export default function Home() {
  return (
    <>
      <JsonLd data={homeSchema()} />
      <SectionObserver ids={TRACKED_HOME_SECTIONS} />
      <Hero />
      <Snapshot />
      <Capabilities />
      <FeaturedWork />
      <ExperiencePreview />
      <Approach />
      <Expertise />
      <Now />
      <Writing />
      <Credentials />
    </>
  );
}

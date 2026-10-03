import type { Metadata } from "next";
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
import { SITE_DESCRIPTION, SITE_TITLE, buildMetadata, pageSchema } from "@/src/lib/seo";

export const metadata: Metadata = buildMetadata({ description: SITE_DESCRIPTION, path: "/" });

export default function Home() {
  return (
    <>
      <JsonLd data={pageSchema({ path: "/", name: SITE_TITLE, description: SITE_DESCRIPTION, mainEntity: "person" })} />
      <SectionObserver ids={TRACKED_HOME_SECTIONS} />
      <Hero />
      <Snapshot />
      <Capabilities />
      <FeaturedWork />
      <Now />
      <ExperiencePreview />
      <Approach />
      <Expertise />
      <Writing />
      <Credentials />
    </>
  );
}

import { Nav } from "@/components/site/nav";
import { About } from "@/components/sections/about";
import { Capabilities } from "@/components/sections/capabilities";
import { Contact } from "@/components/sections/contact";
import { Credentials } from "@/components/sections/credentials";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { Work } from "@/components/sections/work";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Stats />
        <Work />
        <Experience />
        <Capabilities />
        <Credentials />
        <Contact />
      </main>
    </>
  );
}

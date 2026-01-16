"use client";
import Navbar from "./components/Navbar";
import Text from "./components/portfolioText";
import HeroSection from "./components/heroSection";
import Tools from "./components/tools";
import Slider from "./components/services";
import NiddlePointer from "./components/niddlePointer";
import AboutSection from "./components/about";
import ProjectsSection from "./components/project";
import ContactCard from "./components/contactSection";

export default function Page() {
  return (
    <>
      <HeroSection />
      <Text
        title="About"
        highlight="Me"
        description="We provide modern web solutions focused on performance, scalability, and clean UI design."
      />
      <AboutSection />
      <Navbar />
      <Text />
      <Tools />
      <Text
        title="Services"
        highlight="To Offer"
        description="We provide modern web solutions focused on performance, scalability, and clean UI design."
      />
      <Slider/>
      <Text
        title="Design"
        highlight="Process"
        description="We provide modern web solutions focused on performance, scalability, and clean UI design.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        bgColor="bg-gray-50"
      />
      <NiddlePointer />
       <Text
        title="Case"
        highlight="Studies"
        description="We provide modern web solutions focused on performance, scalability, and clean UI design."
      />
      <ProjectsSection/>
      <ContactCard/>
    </>
  );
}

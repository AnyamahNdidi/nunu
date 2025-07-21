"use client";

import { useState, useEffect, useRef } from "react";
import { useInView, useScroll, useSpring } from "framer-motion";

import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
// import { About } from "@/components/about";
import { Testimonials } from "@/components/testimonials";
import { Contact } from "@/components/contact";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { Stats } from "@/components/stats";
import { VideoBackground } from "@/components/video-background";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { CardSlider } from "@/components/3dCardSlider";
import Service1 from "@/components/service1";
import AnimatedGoldIcons from "@/components/AnimatedGoldIcons";
import { About } from "@/components/about";

export default function HomePage() {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const testimonialsRef = useRef(null);
  const contactRef = useRef(null);
  const footerRef = useRef(null);

  const isHeroInView = useInView(heroRef, { margin: "-50% 0px -50% 0px" });
  const isStatsInView = useInView(statsRef, { margin: "-50% 0px -50% 0px" });
  const isServicesInView = useInView(servicesRef, {
    margin: "-50% 0px -50% 0px",
  });
  const isAboutInView = useInView(aboutRef, { margin: "-50% 0px -50% 0px" });
  const isTestimonialsInView = useInView(testimonialsRef, {
    margin: "-50% 0px -50% 0px",
  });
  const isContactInView = useInView(contactRef, {
    margin: "-50% 0px -50% 0px",
  });
  const isFooterInView = useInView(footerRef, { margin: "-50% 0px -50% 0px" });

  const [activeSection, setActiveSection] = useState("hero");

  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 150,
    damping: 20,
    mass: 0.5, // default is 1, lower makes it quicker
  });

  useEffect(() => {
    if (isHeroInView) setActiveSection("hero");
    else if (isStatsInView) setActiveSection("stats");
    else if (isServicesInView) setActiveSection("services");
    else if (isAboutInView) setActiveSection("about");
    else if (isTestimonialsInView) setActiveSection("testimonials");
    else if (isContactInView) setActiveSection("contact");
    else if (isFooterInView) setActiveSection("footer");
  }, [
    isHeroInView,
    isStatsInView,
    isServicesInView,
    isAboutInView,
    isTestimonialsInView,
    isContactInView,
    isFooterInView,
  ]);

  return (
    <>
      <VideoBackground />
      <ScrollProgress />
      <Navigation activeSection={activeSection} />
      <main className="min-h-screen relative scroll-snap-type-y-mandatory">
        <Hero ref={heroRef} scrollY={smoothScrollY} />
        <Stats ref={statsRef} scrollY={smoothScrollY} />
        {/* <Service1 /> */}
        <AnimatedGoldIcons ref={servicesRef} scrollY={smoothScrollY} />
        {/* <Services ref={servicesRef} scrollY={smoothScrollY} /> */}

        <About ref={aboutRef} scrollY={smoothScrollY} />
        <CardSlider />
        {/* <Testimonials ref={testimonialsRef} scrollY={scrollY} />
        <Contact ref={contactRef} scrollY={scrollY} /> */}
        <Footer ref={footerRef} scrollY={scrollY} />
      </main>
    </>
  );
}

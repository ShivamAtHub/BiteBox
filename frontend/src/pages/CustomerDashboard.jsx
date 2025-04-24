import React from "react";
import Navbar from "../components/ui/Navbar";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../components/ui/hero-highlight";
import { ContainerTextFlip } from "../components/ui/container-text-flip";
import { FeaturesSectionDemo } from "./CustomerFeature";
import Footer from '../components/ui/Footer';

const Dashboard = () => {
  return (
    <div className="flex flex-row min-h-screen w-full bg-white dark:bg-black">
      {/* Side bar - Fixed position */}
      <div className="sticky top-0 h-screen">
        <Navbar variant='sidebar' />
      </div>

      {/* Main content area */}
      <div className="flex-1 bg-white dark:bg-black">
        {/* Hero Section - Welcome */}
        <div className="bg-white dark:bg-black">
          <HeroHighlight>
            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: [20, -5, 0],
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-gray-700 dark:text-gray-200 max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto transition-colors duration-300"
            >
              Welcome to BiteBox — your destination for <span className="text-gray-800 dark:text-gray-100 transition-colors duration-300"><ContainerTextFlip words={["cravings", "control", "convenience", "deliciousness"]} /></span>
            </motion.h1>
          </HeroHighlight>
        </div>

        {/* Feature Section */}
        <FeaturesSectionDemo />

        <div className="max-w-screen-xl mx-auto px-4 pt-20 pb-10 bg-white dark:bg-black">
          <Footer />
        </div>
      </div>
    </div>

  );
};

export default Dashboard;
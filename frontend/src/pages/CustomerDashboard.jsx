import React from "react";
import Navbar from "../components/ui/Navbar";
import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "../components/ui/hero-highlight";
import { ContainerTextFlip } from "../components/ui/container-text-flip";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="flex flex-row h-screen">
        <Navbar variant='sidebar' />
        <div className="flex-1 overflow-auto">
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
              className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
            >
              Welcome to BiteBox — your destination for <span className="text-black dark:text-white"><ContainerTextFlip words={["cravings", "control", "convenience", "deliciousness"]} /></span>
            </motion.h1>
          </HeroHighlight>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
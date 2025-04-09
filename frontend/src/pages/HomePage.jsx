import React from 'react';
import { motion } from 'motion/react';
import { BackgroundBeams } from "../components/ui/background-beams";
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "../components/ui/glowing-effect";

export function HomePage() {
    return (
        <div className="overflow-x-hidden relative flex w-full min-h-screen flex-col items-center justify-center bg-white dark:bg-black">
            <div className="relative w-full max-w-7xl px-4 py-10 md:py-20">

                {/* <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
          <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
        </div>
        <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
          <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
        </div> */}

                <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
                    <div className="absolute inset-x-0 mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                </div>

                {/* --- CONTENT --- */}
                {/* The content elements remain largely the same, but padding is handled by the inner container now */}
                {/* Removed the wrapper div that had px-4 py-10 md:py-20 */}

                {/* Animated Heading */}
                <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
                    {"Launch your website in hours, not days"
                        .split(" ")
                        .map((word, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.1,
                                    ease: "easeInOut",
                                }}
                                className="mr-2 inline-block"
                            >
                                {word}{' '}
                            </motion.span>
                        ))}
                </h1>

                {/* Animated Paragraph */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                    className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
                >
                    With AI, you can launch your website in hours, not days. Try our best
                    in class, state of the art, cutting edge AI tools to get your website
                    up.
                </motion.p>

                {/* Animated Buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1 }}
                    className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
                >
                    <button className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                        Explore Now
                    </button>
                    <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
                        Contact Support
                    </button>
                </motion.div>

                {/* Animated Image Container */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1.2 }}
                    // Make image container full width within the max-w-7xl container, or keep it centered?
                    // Keeping mx-auto for the image block itself for now:
                    className="relative z-10 mx-auto mt-20 mb-20 max-w-5xl rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
                // If you want the image block to span the full max-w-7xl width, remove mx-auto and max-w-5xl from the line above
                >
                    <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
                        <img
                            src="https://assets.aceternity.com/pro/aceternity-landing.webp"
                            alt="Landing page preview"
                            className="aspect-[16/9] h-auto w-full object-cover"
                            height={1000}
                            width={1000}
                        />
                    </div>
                </motion.div>

                <GlowingEffectDemo />


            </div>
            {/* <BackgroundBeams /> */}
        </div>
    );
}

export default HomePage;

export function GlowingEffectDemo() {
    return (
        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
            <GridItem
                area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
                icon={<Box className="h-4 w-4 text-black dark:text-neutral-400" />}
                title="Do things the right way"
                description="Running out of copy so I'll write anything."
            />

            <GridItem
                area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
                icon={<Settings className="h-4 w-4 text-black dark:text-neutral-400" />}
                title="The best AI code editor ever."
                description="Yes, it's true. I'm not even kidding. Ask my mom if you don't believe me."
            />

            <GridItem
                area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
                icon={<Lock className="h-4 w-4 text-black dark:text-neutral-400" />}
                title="You should buy Aceternity UI Pro"
                description="It's the best money you'll ever spend"
            />

            <GridItem
                area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
                icon={<Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />}
                title="This card is also built by Cursor"
                description="I'm not even kidding. Ask my mom if you don't believe me."
            />

            <GridItem
                area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
                icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
                title="Coming soon on Aceternity UI"
                description="I'm writing the code as I record this, no shit."
            />
        </ul>
    );
}

const GridItem = ({
    area,
    icon,
    title,
    description
}) => {
    return (
        <motion.li
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 1.0 }}
            viewport={{ once: true, amount: 0.2 }} // 20% visible
            className={`min-h-[14rem] list-none ${area}`}
        >

            <div
                className="relative h-full rounded-2.5xl border  p-2  md:rounded-3xl md:p-3">
                <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01} />
                <div
                    className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
                    <div className="relative flex flex-1 flex-col justify-between gap-3">
                        <div className="w-fit rounded-lg border border-gray-600 p-2 ">
                            {icon}
                        </div>
                        <div className="space-y-3">
                            <h3
                                className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">
                                {title}
                            </h3>
                            <h2
                                className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
                md:text-base/[1.375rem]  text-black dark:text-neutral-400">
                                {description}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </motion.li>
    );
};

import React from 'react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { BackgroundBeams } from "../components/ui/background-beams";
import { Box, Lock, Search, Settings } from "lucide-react";
import { GlowingEffect } from "../components/ui/glowing-effect";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import { AnimatedTestimonials } from "../components/ui/animated-testimonials";
import { Carousel, Card } from "../components/ui/apple-cards-carousel";
import Footer from '../components/ui/Footer';
import {
    Route, Bike, Cpu, Rocket, Touchpad, Map, UserCheck, Code2, Sparkles, MousePointerClick, BarChart3, Headset
} from "lucide-react";
import {
    IconArrowWaveRightUp,
    IconBoxAlignRightFilled,
    IconBoxAlignTopLeft,
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
} from "@tabler/icons-react";
import Navbar from '../components/ui/Navbar';

export function HomePage() {
    return (
        <div className="overflow-x-hidden relative flex w-full min-h-screen flex-col items-center justify-center bg-white dark:bg-black">
            <Navbar variant='navbar' />
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
                <h1 className="relative z-10 mx-auto mt-40 max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
                    {"BiteBox delivers hot meals, fast & fresh"
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
                                className="mr-4 inline-block"
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
                    AI-powered order scheduling, optimized routing, and real-time delivery tracking — built to beat delays and deliver satisfaction.
                </motion.p>

                {/* Animated Buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1 }}
                    className="relative z-10 mt-8 mb-40 flex flex-wrap items-center justify-center gap-4"
                >
                    <a href='/login'>
                        <button className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                            Try BiteBox Now
                        </button>
                    </a>
                    <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
                        Contact Us
                    </button>
                </motion.div>

                {/* Animated Image Container */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 1.2 }}
                    className="relative z-10 mx-auto mt-20 mb-20 max-w-5xl rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
                >
                    <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
                        <img
                            loading="lazy"
                            src="https://assets.aceternity.com/pro/aceternity-landing.webp"
                            alt="Landing page preview"
                            className="aspect-[16/9] h-auto w-full object-cover"
                            height={1000}
                            width={1000}
                        />
                    </div>
                </motion.div> */}

                <AppleCardsCarouselDemo />

                {/* Heading before feature section*/}
                <h1 className="relative z-10 mx-auto mb-20 max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
                    {"Why BiteBox?"
                        .split(" ")
                        .map((word, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.1,
                                    ease: "easeInOut",
                                }}
                                viewport={{ once: true, amount: 0.6 }} // triggers once when 60% in view
                                className="mr-4 inline-block"
                            >
                                {word}{" "}
                            </motion.span>
                        ))}
                </h1>

                <div className='mb-20'>
                    <GlowingEffectDemo />
                </div>


                {/* Heading before Bento grid */}
                <h1 className="relative z-10 mx-auto mb-5 max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
                    {"Delivering More Than Just Food"
                        .split(" ")
                        .map((word, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.1,
                                    ease: "easeInOut",
                                }}
                                viewport={{ once: true, amount: 0.6 }} // triggers once when 60% in view
                                className="mr-4 inline-block"
                            >
                                {word}{" "}
                            </motion.span>
                        ))}
                </h1>

                <BentoGrid className="max-w-4xl mx-auto">
                    {items.map((item, i) => (
                        <BentoGridItem
                            key={i}
                            title={item.title}
                            description={item.description}
                            header={item.header}
                            icon={item.icon}
                            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                        />
                    ))}
                </BentoGrid>

                {/* Heading before Customer Reviews*/}
                <h1 className="relative z-10 mx-auto mt-20 mb-5 max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
                    {"What Our Customers Are Saying"
                        .split(" ")
                        .map((word, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.1,
                                    ease: "easeInOut",
                                }}
                                viewport={{ once: true, amount: 0.6 }} // triggers once when 60% in view
                                className="mr-4 inline-block"
                            >
                                {word}{" "}
                            </motion.span>
                        ))}
                </h1>
                <div className='mb-40'>
                    <AnimatedTestimonialsDemo />
                </div>
                <Footer />

            </div>
            {/* <BackgroundBeams /> */}
        </div>
    );
}

export default HomePage;

// **********------------------------------------------------ Feature-Section ------------------------------------------------**********
export function GlowingEffectDemo() {
    return (
        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
            <GridItem
                area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
                icon={<Route className="h-4 w-4 text-black dark:text-neutral-400" />}
                title="Smart Delivery Routes"
                description="Our system picks the best route for your order—real-time and traffic-aware."
            />

            <GridItem
                area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
                icon={<Bike className="h-4 w-4 text-black dark:text-neutral-400" />}
                title="Drivers Instantly"
                description="Orders get assigned to the nearest available driver in seconds. No delays."
            />

            <GridItem
                area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
                icon={<Cpu className="h-4 w-4 text-black dark:text-neutral-400" />}
                title="Modern Tech Stack"
                description="BiteBox is powered by MERN, Tailwind, and socket-driven real-time flow."
            />

            <GridItem
                area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
                icon={<Touchpad className="h-4 w-4 text-black dark:text-neutral-400" />}
                title="Seamless User Experience"
                description="From login to checkout, BiteBox keeps it buttery smooth for all users."
            />

            <GridItem
                area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
                icon={<Rocket className="h-4 w-4 text-black dark:text-neutral-400" />}
                title="More Features Coming"
                description="New tools for restaurants and customers are on the way. Stay tuned."
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
            viewport={{ once: true, amount: 0.2 }}
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


// **********------------------------------------------------Bento-Grid------------------------------------------------**********
const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
const items = [
    {
        title: "Smart Delivery Routes",
        description: "BiteBox optimizes your route live, avoiding traffic and delays.",
        header: (
            <div className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden items-center justify-center bg-white dark:bg-black">
                {/* Grid Background */}
                <div
                    className={cn(
                        "absolute inset-0",
                        "[background-size:40px_40px]",
                        "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                        "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
                    )}
                />
                {/* Gradient */}
                <div
                    className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 opacity-80 pointer-events-none"
                    style={{
                        WebkitMaskImage:
                            "radial-gradient(circle at bottom left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0) 90%)",
                        maskImage:
                            "radial-gradient(circle at bottom left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0) 90%)",
                    }}
                />
                <img loading="lazy" src="/assets/delivery.png" alt="Feature" className="relative z-10 h-30 w-30 object-contain" />
            </div>
        ),
        icon: <Map className="h-4 w-4" />,
    },
    {
        title: "Drivers Instantly",
        description: "Orders are assigned to nearby drivers in real time.",
        header: (
            <div className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden items-center justify-center bg-white dark:bg-black">
                <div
                    className={cn(
                        "absolute inset-0",
                        "[background-size:40px_40px]",
                        "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                        "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
                    )}
                />
                <div
                    className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-yellow-400 dark:from-yellow-800 dark:to-yellow-600 opacity-80 pointer-events-none"
                    style={{
                        WebkitMaskImage:
                            "radial-gradient(circle at bottom left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0) 90%)",
                        maskImage:
                            "radial-gradient(circle at bottom left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0) 90%)",
                    }}
                />
                <img loading="lazy" src="/assets/clock.png" alt="Driver" className="relative z-10 h-20 w-20 object-contain" />
            </div>
        ),
        icon: <UserCheck className="h-4 w-4" />,
    },
    {
        title: "Modern Tech Stack",
        description: "Built using MERN, Tailwind, and sockets for real-time speed.",
        header: (
            <div className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden items-center justify-center bg-white dark:bg-black">
                <div
                    className={cn(
                        "absolute inset-0",
                        "[background-size:40px_40px]",
                        "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                        "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
                    )}
                />
                <div
                    className="absolute inset-0 bg-gradient-to-br from-sky-300 to-sky-500 dark:from-sky-800 dark:to-sky-600 opacity-80 pointer-events-none"
                    style={{
                        WebkitMaskImage:
                            "radial-gradient(circle at bottom left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0) 90%)",
                        maskImage:
                            "radial-gradient(circle at bottom left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0) 90%)",
                    }}
                />
                <img loading="lazy" src="/assets/react.png" alt="Tech" className="relative z-10 h-20 w-20 object-contain" />
            </div>
        ),
        icon: <Code2 className="h-4 w-4" />,
    },
    {
        title: "Upcoming Features",
        description: "We're adding tools for restaurants and customers soon.",
        header: (
            <div className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden items-center justify-center bg-white dark:bg-black">
                <div
                    className={cn(
                        "absolute inset-0",
                        "[background-size:40px_40px]",
                        "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                        "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
                    )}
                />
                <div
                    className="absolute inset-0 bg-gradient-to-br from-purple-300 to-purple-500 dark:from-purple-800 dark:to-purple-600 opacity-80 pointer-events-none"
                    style={{
                        WebkitMaskImage:
                            "radial-gradient(circle at bottom left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0) 90%)",
                        maskImage:
                            "radial-gradient(circle at bottom left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0) 90%)",
                    }}
                />
                <img loading="lazy" src="/assets/upcoming.png" alt="Upcoming" className="relative z-10 h-25 w-25 object-contain" />
            </div>
        ),
        icon: <Sparkles className="h-4 w-4" />,
    },
    {
        title: "Seamless UX",
        description: "From login to checkout, BiteBox is built to feel effortless.",
        header: (
            <div className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden items-center justify-center bg-white dark:bg-black">
                <div
                    className={cn(
                        "absolute inset-0",
                        "[background-size:40px_40px]",
                        "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                        "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
                    )}
                />
                <div
                    className="absolute inset-0 bg-gradient-to-br from-pink-200 to-pink-400 dark:from-pink-800 dark:to-pink-600 opacity-80 pointer-events-none"
                    style={{
                        WebkitMaskImage:
                            "radial-gradient(circle at bottom left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0) 90%)",
                        maskImage:
                            "radial-gradient(circle at bottom left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0) 90%)",
                    }}
                />
                <img loading="lazy" src="/assets/ux.png" alt="UX" className="relative z-10 h-20 w-20 object-contain" />
            </div>
        ),
        icon: <MousePointerClick className="h-4 w-4" />,
    },
    {
        title: "Order Insights",
        description: "Track and manage your past orders and spending patterns.",
        header: (
            <div className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden items-center justify-center bg-white dark:bg-black">
                <div
                    className={cn(
                        "absolute inset-0",
                        "[background-size:40px_40px]",
                        "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                        "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
                    )}
                />
                <div
                    className="absolute inset-0 bg-gradient-to-br from-blue-200 to-blue-400 dark:from-blue-800 dark:to-blue-600 opacity-80 pointer-events-none"
                    style={{
                        WebkitMaskImage:
                            "radial-gradient(circle at bottom left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0) 90%)",
                        maskImage:
                            "radial-gradient(circle at bottom left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0) 90%)",
                    }}
                />
                <img loading="lazy" src="/assets/order.png" alt="Insights" className="relative z-10 h-20 w-20 object-contain" />
            </div>
        ),
        icon: <BarChart3 className="h-4 w-4" />,
    },
    {
        title: "Reliable Support",
        description: "Facing an issue? We're just a click away—24/7 support.",
        header: (
            <div className="relative flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden items-center justify-center bg-white dark:bg-black">
                <div
                    className={cn(
                        "absolute inset-0",
                        "[background-size:40px_40px]",
                        "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                        "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
                    )}
                />
                <div
                    className="absolute inset-0 bg-gradient-to-br from-red-200 to-red-400 dark:from-red-800 dark:to-red-600 opacity-80 pointer-events-none"
                    style={{
                        WebkitMaskImage:
                            "radial-gradient(circle at bottom left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0) 90%)",
                        maskImage:
                            "radial-gradient(circle at bottom left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0) 90%)",
                    }}
                />
                <img loading="lazy" src="/assets/support.png" alt="Support" className="relative z-10 h-20 w-20 object-contain" />
            </div>
        ),
        icon: <Headset className="h-4 w-4" />,
    },
];



// **********------------------------------------------- Animated Testimonials -------------------------------------------**********
export function AnimatedTestimonialsDemo() {
    const testimonials = [
        {
            quote:
                "BiteBox made my food deliveries way smoother. I can track everything in real-time, and the interface is super easy to use!",
            name: "Aarav Mehta",
            designation: "Verified Customer",
            src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=400&q=60",
        },
        {
            quote:
                "Honestly didn’t expect it to work this well. The app is fast, reliable, and my orders have always been on point.",
            name: "Priya Sharma",
            designation: "Happy Customer",
            src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=400&q=60",
        },
        {
            quote:
                "I love how simple everything is. Placing an order takes seconds, and I always know where my delivery is.",
            name: "Rahul Desai",
            designation: "Frequent User",
            src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=400&q=60",
        },
        {
            quote:
                "Whenever I’ve had a question, support was right there to help. Super impressed with how responsive they are!",
            name: "Sneha R.",
            designation: "Verified Buyer",
            src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=400&q=60",
        },
        {
            quote:
                "Been using BiteBox for a few months now and I’m loving it. Never had a single delay, and it scales well for our office orders too.",
            name: "Ritika Patel",
            designation: "Longtime Customer",
            src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=400&q=60",
        },
    ];
    return <AnimatedTestimonials testimonials={testimonials} />;
}

// **********------------------------------------------- Apple like carousel -------------------------------------------**********
export function AppleCardsCarouselDemo() {
    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    return (
        <div className="w-full h-full py-20">
            <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
                Explore BiteBox Highlights.
            </h2>
            <Carousel items={cards} />
        </div>
    );
}

const DummyContent = () => {
    return (
        <>
            {[...new Array(3).fill(1)].map((_, index) => {
                return (
                    <div
                        key={"dummy-content" + index}
                        className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
                    >
                        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                            <span className="font-bold text-neutral-700 dark:text-neutral-200">
                                The first rule of BiteBox is — we deliver smarter.
                            </span>{" "}
                            From lightning-fast order assignments to intelligent route planning, BiteBox ensures every meal reaches on time. Hungry or in a hurry, we've got your back.
                        </p>
                        <Image
                            src="https://assets.aceternity.com/macbook.png"
                            alt="Macbook mockup from Aceternity UI"
                            height="500"
                            width="500"
                            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                        />
                    </div>
                );
            })}
        </>
    );
};

const data = [
    {
        category: "Smart Delivery",
        title: "Lightning-fast food delivery.",
        src: "https://images.unsplash.com/photo-1623652621708-e641fe4810f1?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1920&q=75",
        content: <DummyContent />,
    },
    {
        category: "Real-time Tracking",
        title: "Track orders live from kitchen to doorstep.",
        src: "https://images.unsplash.com/photo-1554672409-87b40d480f70?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1920&q=75",
        content: <DummyContent />,
    },
    {
        category: "Customer Experience",
        title: "Built to delight food lovers everywhere.",
        src: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1920&q=75",
        content: <DummyContent />,
    },
    {
        category: "Route Optimization",
        title: "Smarter paths. Quicker deliveries.",
        src: "https://images.unsplash.com/photo-1631016800587-97917209db85?q=80&w=1827&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1920&q=75",
        content: <DummyContent />,
    },
    {
        category: "Partner With Us",
        title: "Join as a driver or a restaurant partner.",
        src: "https://images.unsplash.com/photo-1496115965489-21be7e6e59a0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1920&q=75",
        content: <DummyContent />,
    },
    {
        category: "Hiring",
        title: "We're hiring engineers and designers!",
        src: "https://images.unsplash.com/photo-1511376979163-f804dff7ad7b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1920&q=75",
        content: <DummyContent />,
    },
];

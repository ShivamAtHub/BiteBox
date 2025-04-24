import React, { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";
import { motion, useMotionValue, useTransform } from "framer-motion";
import createGlobe from "cobe";
import { Link } from "react-router-dom";

export function FeaturesSectionDemo() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const features = [
        {
            title: "Explore with Browser Menu",
            description: "Quickly browse through restaurants, cuisines, and exclusive offers — all in one intuitive menu.",
            skeleton: <MenuSkeleton />,
            link: "/",
            className: "col-span-1 md:col-span-3 border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black shadow-sm",
        },
        {
            title: "Order History",
            description: "View your past orders with just a click. Reorder favorites or explore what you loved last time.",
            skeleton: <HistorySkeleton />,
            className: "col-span-1 md:col-span-3 border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black shadow-sm",
        },
        {
            title: "Track Order Live",
            description: "Track your order in real-time — from kitchen to doorstep, see exactly where your food is.",
            skeleton: <SkeletonFour />,
            className: "col-span-1 md:col-span-3 border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black shadow-sm",
        },
        {
            title: "Settings",
            description: "Manage account details, notifications, and preferences effortlessly.",
            skeleton: <SettingSkeleton />,
            className: "col-span-1 md:col-span-3 border border-gray-200 dark:border-neutral-800 bg-white dark:bg-black shadow-sm",
        },
    ];

    if (!mounted) return null;

    return (
        <div className="relative z-20 py-8 lg:py-16 max-w-7xl mx-auto bg-white dark:bg-black transition-colors duration-300">
            <div className="px-6">
                <h4 className="text-2xl lg:text-4xl font-semibold text-center text-gray-800 dark:text-gray-100 transition-colors duration-300">
                    Packed with powerful features
                </h4>
                <p className="text-sm lg:text-base text-center mt-3 text-gray-600 dark:text-gray-300 transition-colors duration-300">
                    Manage your BiteBox experience easily from one dashboard.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-2 mt-10 rounded-md overflow-hidden">
                {features.map((feature) => (
                    <FeatureCard key={feature.title} className={feature.className}>
                        <Link to={feature.link || "#"} className="block h-full w-full">
                            <FeatureTitle>{feature.title}</FeatureTitle>
                            <FeatureDescription>{feature.description}</FeatureDescription>
                            <div className="h-full w-full">{feature.skeleton}</div>
                        </Link>
                    </FeatureCard>
                ))}
            </div>
        </div>
    );
}

const FeatureCard = ({ children, className }) => {
    const cardRef = useRef(null);
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const rotateX = useTransform(mouseY, [0, 1], [8, -8]);
    const rotateY = useTransform(mouseX, [0, 1], [-8, 8]);

    const handleMouseMove = (e) => {
        const bounds = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - bounds.left) / bounds.width;
        const y = (e.clientY - bounds.top) / bounds.height;
        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
                mouseX.set(0.5);
                mouseY.set(0.5);
            }}
            style={{
                rotateX,
                rotateY,
                transformPerspective: 800,
            }}
            className={cn(
                "p-4 sm:p-6 relative overflow-hidden transition-all duration-200 ease-in-out will-change-transform hover:shadow-md dark:hover:shadow-black",
                className
            )}
        >
            {children}
        </motion.div>
    );
};

const FeatureTitle = ({ children }) => (
    <p className="text-left text-gray-800 dark:text-gray-100 text-lg font-medium transition-colors duration-300">{children}</p>
);

const FeatureDescription = ({ children }) => (
    <p className="text-sm text-left mt-1 text-gray-600 dark:text-gray-300 max-w-sm transition-colors duration-300">{children}</p>
);

const FadedCornerImage = ({ src, alt }) => (
    <div className="relative w-full h-40">
        <motion.img
            src={src}
            alt={alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute bottom--20 right-0 h-64 w-64 object-cover rotate-[-40deg] rounded-md shadow-sm dark:shadow-black transition-shadow duration-300"
        />
    </div>
);

const MenuSkeleton = () => <FadedCornerImage src="/tools-kitchen-2.png" alt="Menu Preview" />;
const HistorySkeleton = () => <FadedCornerImage src="/history.png" alt="Order History" />;
const SettingSkeleton = () => <FadedCornerImage src="/settings.png" alt="Settings" />;

export const SkeletonFour = () => (
    <div className="h-60 flex flex-col items-center relative bg-transparent mt-6">
        <Globe className="absolute -right-10 -bottom-72" />
    </div>
);

export const Globe = ({ className }) => {
    const canvasRef = useRef(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(isDark);
        const listener = (e) => setIsDarkMode(e.matches);
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', listener);
        return () => mediaQuery.removeEventListener('change', listener);
    }, []);

    useEffect(() => {
        let phi = 0;
        if (!canvasRef.current) return;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 1,
            width: 600,
            height: 600,
            phi: 0,
            theta: 0,
            dark: isDarkMode ? 1 : 0,
            diffuse: 0.8,
            mapSamples: 4000,
            mapBrightness: isDarkMode ? 6 : 3,
            baseColor: isDarkMode ? [0, 0, 0] : [0.9, 0.9, 0.9],
            markerColor: [0.1, 0.7, 1],
            glowColor: isDarkMode ? [0.05, 0.05, 0.05] : [1, 1, 1],
            markers: [
                { location: [37.7595, -122.4367], size: 0.03 },
                { location: [40.7128, -74.006], size: 0.1 },
                { location: [22.5937, 78.9629], size: 0.1 },
            ],
            onRender: (state) => {
                state.phi = phi;
                phi += 0.01;
            },
        });

        return () => globe.destroy();
    }, [isDarkMode]);

    return (
        <canvas
            ref={canvasRef}
            style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
            className={className}
        />
    );
};

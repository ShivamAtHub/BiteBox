import React, { useEffect, useRef } from "react";
import { cn } from "../lib/utils";
import { motion, useMotionValue, useTransform } from "framer-motion";
import createGlobe from "cobe";
import { Link } from "react-router-dom";

export function FeaturesSectionDemo() {
    const features = [
        {
            title: "Explore with Browser Menu",
            description: "Quickly browse through restaurants, cuisines, and exclusive offers — all in one intuitive menu.",
            skeleton: <MenuSkeleton />,
            link: "/menu",
            className: "col-span-1 md:col-span-3 border dark:border-neutral-800",
        },
        {
            title: "Order History",
            description: "View your past orders with just a click. Reorder favorites or explore what you loved last time.",
            skeleton: <HistorySkeleton />,
            className: "col-span-1 md:col-span-3 border dark:border-neutral-800",
        },
        {
            title: "Track Order Live",
            description: "Track your order in real-time — from kitchen to doorstep, see exactly where your food is.",
            skeleton: <SkeletonFour />,
            className: "col-span-1 md:col-span-3 border dark:border-neutral-800",
        },
        {
            title: "Settings",
            description: "Manage account details, notifications, and preferences effortlessly.",
            skeleton: <SettingSkeleton />,
            className: "col-span-1 md:col-span-3 border dark:border-neutral-800",
        },
    ];

    return (
        <div className="relative z-20 py-8 lg:py-16 max-w-7xl mx-auto">
            <div className="px-6">
                <h4 className="text-2xl lg:text-4xl font-semibold text-center text-black dark:text-white">
                    Packed with powerful features
                </h4>
                <p className="text-sm lg:text-base text-center mt-3 text-neutral-500 dark:text-neutral-300">
                    Manage your BiteBox experience easily from one dashboard.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-2 mt-10 rounded-md overflow-hidden">
                {features.map((feature) => (
                    <FeatureCard key={feature.title} className={feature.className}>
                        <Link to={feature.link} className="block h-full w-full">
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
                "p-4 sm:p-6 relative overflow-hidden transition-transform duration-200 ease-in-out will-change-transform",
                className
            )}
        >
            {children}
        </motion.div>
    );
};


const FeatureTitle = ({ children }) => (
    <p className="text-left text-black dark:text-white text-lg font-medium">{children}</p>
);

const FeatureDescription = ({ children }) => (
    <p className="text-sm text-left mt-1 text-neutral-600 dark:text-neutral-300 max-w-sm">{children}</p>
);

// Shared image skeleton for menu/history/settings
const FadedCornerImage = ({ src, alt }) => (
    <div className="relative w-full h-40">
        <motion.img
            src={src}
            alt={alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute bottom--20 right-0 h-64 w-64 object-cover rotate-[-40deg] rounded-md"
        />
    </div>
);

const MenuSkeleton = () => (
    <FadedCornerImage src="/tools-kitchen-2.png" alt="Menu Preview" />
);

const HistorySkeleton = () => (
    <FadedCornerImage src="/history.png" alt="Order History" />
);

const SettingSkeleton = () => (
    <FadedCornerImage src="/settings.png" alt="Settings" />
);

export const SkeletonFour = () => (
    <div className="h-60 flex flex-col items-center relative bg-transparent mt-6">
        <Globe className="absolute -right-10 -bottom-72" />
    </div>
);

export const Globe = ({ className }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        let phi = 0;
        if (!canvasRef.current) return;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 1,
            width: 300 * 2,
            height: 300 * 2,
            phi: 0,
            theta: 0,
            dark: 1,
            diffuse: 0.8,
            mapSamples: 4000,
            mapBrightness: 3,
            baseColor: [0.3, 0.3, 0.3],
            markerColor: [0.1, 0.8, 1],
            glowColor: [1, 1, 1],
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
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
            className={className}
        />
    );
};

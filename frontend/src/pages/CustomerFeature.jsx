import React, { useEffect, useRef } from "react";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";
import createGlobe from "cobe";

export function FeaturesSectionDemo() {
    const features = [
        {
            title: "Explore with Browser Menu",
            description: "Quickly browse through restaurants, cuisines, and exclusive offers — all in one intuitive menu.",
            skeleton: <MenuSkeleton />,
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
                        <FeatureTitle>{feature.title}</FeatureTitle>
                        <FeatureDescription>{feature.description}</FeatureDescription>
                        <div className="h-full w-full">{feature.skeleton}</div>
                    </FeatureCard>
                ))}
            </div>
        </div>
    );
}

const FeatureCard = ({ children, className }) => (
    <div className={cn("p-4 sm:p-6 relative overflow-hidden", className)}>
        {children}
    </div>
);

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
        <div className="absolute inset-0 bg-gradient-to-br from-white dark:from-black to-transparent pointer-events-none" />
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
            devicePixelRatio: 2,
            width: 600 * 2,
            height: 600 * 2,
            phi: 0,
            theta: 0,
            dark: 1,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.3, 0.3, 0.3],
            markerColor: [0.1, 0.8, 1],
            glowColor: [1, 1, 1],
            markers: [
                { location: [37.7595, -122.4367], size: 0.03 },
                { location: [40.7128, -74.006], size: 0.1 },
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

"use client";

/**
 * Scroll Reveal Component
 * 
 * Wraps content with Framer Motion scroll-triggered animations.
 * Part of the "High-Touch" visual design for premium feel.
 */

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

type RevealVariant = "fade-up" | "fade-left" | "fade-right" | "scale-in";

interface ScrollRevealProps {
    children: React.ReactNode;
    variant?: RevealVariant;
    delay?: number;
    duration?: number;
    className?: string;
    /** Margin from viewport to trigger animation */
    margin?: string;
    /** Only animate once */
    once?: boolean;
}

const variants: Record<RevealVariant, Variants> = {
    "fade-up": {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    },
    "fade-left": {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0 },
    },
    "fade-right": {
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0 },
    },
    "scale-in": {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
    },
};

export function ScrollReveal({
    children,
    variant = "fade-up",
    delay = 0,
    duration = 0.6,
    className = "",
    margin = "-100px",
    once = true,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: margin as "-100px" });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants[variant]}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.4, 0.25, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * Stagger container for animating children sequentially
 */
interface StaggerContainerProps {
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
}

export function StaggerContainer({
    children,
    className = "",
    staggerDelay = 0.1,
}: StaggerContainerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" as const });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * Stagger item for use inside StaggerContainer
 */
export function StaggerItem({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

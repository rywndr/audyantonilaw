"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    distance?: number;
    once?: boolean;
}

function getInitialOffset(
    direction: FadeInProps["direction"],
    distance: number,
): { x?: number; y?: number } {
    switch (direction) {
        case "up":
            return { y: distance };
        case "down":
            return { y: -distance };
        case "left":
            return { x: distance };
        case "right":
            return { x: -distance };
        default:
            return {};
    }
}

export default function FadeIn({
    children,
    className = "",
    delay = 0,
    duration = 0.6,
    direction = "up",
    distance = 30,
    once = true,
}: FadeInProps) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                ...getInitialOffset(direction, distance),
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
            }}
            // A positive margin value means the animation only triggers after the element
            // has entered the viewport by that amount — preventing all elements from
            // firing the moment the user begins scrolling past the section boundary.
            viewport={{ once, margin: "0px 0px -80px 0px" }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Animates on mount rather than on scroll — used for above-the-fold hero content.
interface FadeInHeroProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    distance?: number;
}

export function FadeInHero({
    children,
    className = "",
    delay = 0,
    duration = 0.6,
    direction = "up",
    distance = 30,
}: FadeInHeroProps) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                ...getInitialOffset(direction, distance),
            }}
            animate={{
                opacity: 1,
                x: 0,
                y: 0,
            }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface FadeInStaggerProps {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
}

export function FadeInStagger({
    children,
    className = "",
    staggerDelay = 0.1,
}: FadeInStaggerProps) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
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

export function FadeInStaggerItem({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.5,
                        ease: [0.25, 0.1, 0.25, 1],
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

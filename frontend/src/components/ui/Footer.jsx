"use client";
import React from "react";
import { motion } from "framer-motion";
import { IconBrandLinkedin } from "@tabler/icons-react";

const teamMembers = [
  {
    name: "Shivam Darekar",
    linkedin: "https://www.linkedin.com/in/shivamdarekar2206/",
  },
  {
    name: "Darshan Bhere",
    linkedin: "https://www.linkedin.com/in/member2",
  },
  {
    name: "Bhagyashree Dhongde",
    linkedin: "https://www.linkedin.com/in/member3",
  },
];

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full px-4 py-6 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-center"
    >
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Made with ❤️ by the BiteBox Team
        </p>

        <div className="flex gap-6 flex-wrap justify-center">
          {teamMembers.map((member, idx) => (
            <a
              key={idx}
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-sm text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <IconBrandLinkedin className="h-4 w-4" />
              <span>{member.name}</span>
            </a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;

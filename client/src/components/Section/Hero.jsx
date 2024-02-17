import { motion, useViewportScroll, useTransform } from "framer-motion";
import { useState } from "react";

const Hero = () => {
  // Get the scrollYProgress value, which changes from 0 to 1 as you scroll down the page
  const { scrollYProgress } = useViewportScroll();

  // Create a variable that will change from 0 to 360 as you scroll down the page
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Define the hover variants for the span elements
  const hoverVariants = {
    normal: {
      color: "black",
      scale: 1,
    },
    hover: {
      // color: "skyblue",
      scale: 1.2,
    },
  };

  // Define the hover variants for the image components
  const imageVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  // Define the state variables for the hover state of each span element
  const [isHealthHovered, setHealthHovered] = useState(false);
  const [isSolutionsHovered, setSolutionsHovered] = useState(false);
  const [isDiagnoseHovered, setDiagnoseHovered] = useState(false);

  return (
    <div
      // data-scroll
      // data-scroll-speed="-0.3"
      className="w-full min-h-screen relative mb-10"
    >
      <div className="overlay h-full w-full flex items-center justify-center">
        <motion.span
          className="absolute logo font-bold"
          style={{ rotate: rotation }} // Apply the rotation
        >
                         <img src="../../sun.png" alt="sun" className="w-14 h-14 " />
        </motion.span>
      </div>
      <div className="pt-32 px-8 md:pt-40 md:px-16 mx-auto max-w-7xl border-b-2 flex flex-col items-center">
        <p className="text-center font-regular text-xl mb-6 md:mb-8 text-zinc-600">
          Your journey to wellness begins here
        </p>
        <p className={`text-center text-4xl leading-[.9] tracking-normal font-thin text-zinc-700`}>
          At <motion.span
          variants={hoverVariants}
            whileHover="hover"
            onHoverStart={() => setDiagnoseHovered(true)}
            onHoverEnd={() => setDiagnoseHovered(false)}
            className="italic font-semibold">SolarMed</motion.span>, we believe
          that{" "}
          <motion.span
            className="underline"
            variants={hoverVariants}
            whileHover="hover"
            onHoverStart={() => setHealthHovered(true)}
            onHoverEnd={() => setHealthHovered(false)}
          >
            health
          </motion.span>{" "}
          is more than just the absence of disease. It is a state of physical,
          mental, and emotional well-being that enables you to enjoy life to the
          fullest. That is why we offer accurate{" "}
          <motion.span
            className="italic underline"
            variants={hoverVariants}
            whileHover="hover"
            onHoverStart={() => setSolutionsHovered(true)}
            onHoverEnd={() => setSolutionsHovered(false)}
          >
            solutions
          </motion.span>{" "}
          from the get-go, using advanced technologies and proven methods to{" "}
          <motion.span
            className="underline"
            variants={hoverVariants}
            whileHover="hover"
            onHoverStart={() => setDiagnoseHovered(true)}
            onHoverEnd={() => setDiagnoseHovered(false)}
          >
            diagnose
          </motion.span>{" "}
          and treat even the most complex medical conditions.
        </p>
        <motion.div
          className="overlay pointer-events-none absolute bottom-5 left-20 m-4"
          animate={isHealthHovered ? "visible" : "hidden"}
          variants={imageVariants}
        >
          <img src="../../../a.png" alt="" className="w-1/2 h-1/3" />
        </motion.div>
        <motion.div
          className="overlay pointer-events-none absolute top-10 left-0 m-4"
          animate={isSolutionsHovered ? "visible" : "hidden"}
          variants={imageVariants}
        >
          <img src="../../../b.png" alt="" className="w-1/2 h-1/3" />
        </motion.div>
        <motion.div
          className="overlay pointer-events-none absolute bottom-40 right-40 m-4"
          animate={isDiagnoseHovered ? "visible" : "hidden"}
          variants={imageVariants}
        >
          <img src="../../../c.png" alt="" className="w-1/2 h-1/3" />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
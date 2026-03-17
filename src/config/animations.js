export const fadeEnterFlyExit = {
  initial: { opacity: 0 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: "-100%" }
};

export const slideUpVariants = {
  initial: { opacity: 0, y: "100%" },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: "-100%" }
};

export const defaultTransition = { 
  duration: 0.5, 
  ease: "easeInOut" 
};

export const bounceTransition = {
  type: "spring",
  stiffness: 420,
  damping: 25
};
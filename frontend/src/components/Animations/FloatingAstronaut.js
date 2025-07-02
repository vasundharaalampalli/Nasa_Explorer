import { motion } from 'framer-motion';

const FloatingAstronaut = () => {
  return (
    <motion.div
      className="fixed bottom-8 right-8 z-10"
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-12 -left-12"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 text-indigo-300 dark:text-yellow-300 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </motion.div>
        <div className="text-5xl">👨‍🚀</div>
      </div>
    </motion.div>
  );
};

export default FloatingAstronaut;
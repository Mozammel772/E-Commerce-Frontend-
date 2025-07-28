import { motion } from "framer-motion";

const TittleAnimation = ({ tittle, subtittle }) => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <div className="mb-5 md:mb-7 lg:mb-10">
      {/* Title */}
      <motion.h1
        className="text-2xl md:text-3xl font-bold text-center text-orange-600"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        {tittle}
      </motion.h1>
      <motion.div
        className="w-full mt-5 rounded-full"
        style={{
          height: "2px",
          backgroundImage: "",
          transformOrigin: "left",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
      />
      {/* Subtitle Divider */}
      <motion.div
        className="flex items-center justify-center -mt-2 "
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={2}
      >
        <div className="flex-grow h-px bg-orange-400 "></div>
        <span className="mx-4 text-lg md:text-xl font-semibold text-gray-800">{subtittle}</span>
        <div className="flex-grow h-px bg-orange-400 "></div>
      </motion.div>
    </div>
  );
};

export default TittleAnimation;
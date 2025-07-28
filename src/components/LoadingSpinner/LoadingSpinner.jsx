// components/LoadingSpinner.jsx
import { motion } from "framer-motion";

const LoadingSpinner = ({ size = 60, color = "#f97316" }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <motion.div
        className="rounded-full border-4 border-t-transparent"
        style={{
          width: size,
          height: size,
          borderColor: color,
          borderTopColor: "transparent",
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
      />
    </div>
  );
};

export default LoadingSpinner;

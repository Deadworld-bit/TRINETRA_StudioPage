import { motion, AnimatePresence } from "framer-motion";
import StudioLogo from "@/public/StudioLogo_7_white.png";

const SHIMMER_DURATION = 2.5;
const SHIMMER_DELAY = 1.0;

export default function LoadingScreen({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#1a1a1a] flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 1.0, ease: "easeInOut" },
          }}
        >
          <motion.div
            className="relative w-96 h-96"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.6, ease: "easeOut" },
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              transition: { duration: 0.4, ease: "easeIn" },
            }}
          >
            <div
              className="w-full h-full overflow-hidden"
              style={{
                backgroundColor: 'white', 
                maskImage: `url(${StudioLogo.src})`,
                WebkitMaskImage: `url(${StudioLogo.src})`, 
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
              }}
            >
              <motion.div
                className="w-full h-full"
                style={{
                  background:
                    "linear-gradient(110deg, transparent 30%, rgba(0, 255, 200, 0.5), transparent 70%)",
                }}
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  repeat: Infinity,
                  duration: SHIMMER_DURATION,
                  ease: "easeInOut",
                  repeatDelay: SHIMMER_DELAY,
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
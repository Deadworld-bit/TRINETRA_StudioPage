import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import StudioLogo from "@/public/StudioLogo_4_white.png";

const PULSE_INTERVAL = 2.0; 

export default function LoadingScreen({ show }: { show: boolean }) {

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#1a1a1a] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.0, ease: "easeInOut" } }}
        >
          <motion.div
            className="absolute rounded-full bg-[#00ffc8]/20" 
            style={{ width: '10rem', height: '10rem' }}
            animate={{
              scale: [1, 5, 1], 
              opacity: [0.6, 0, 0.6], 
              transition: {
                duration: PULSE_INTERVAL,
                ease: 'easeOut',
                repeat: Infinity, 
              },
            }}
          />
          <motion.div
            className="absolute rounded-full bg-white/10"
            style={{ width: '10rem', height: '10rem' }}
            animate={{
              scale: [1, 5, 1],
              opacity: [0.4, 0, 0.4],
              transition: {
                duration: PULSE_INTERVAL,
                ease: 'easeOut',
                repeat: Infinity,
                delay: PULSE_INTERVAL / 2, 
              },
            }}
          />

          <motion.div
            className="relative w-48 h-48 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { duration: 0.6, ease: "easeOut" } 
            }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.4, ease: "easeIn" }}}
          >
            <Image 
              src={StudioLogo} 
              alt="Studio Logo" 
              fill={true} 
              style={{objectFit:"contain"}}
              priority 
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
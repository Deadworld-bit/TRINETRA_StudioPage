import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ show }: { show: boolean }) {
  const [phase, setPhase] = useState<"loading" | "expand" | "done">("loading");

  useEffect(() => {
    if (show) {
      setPhase("loading");
      const timer1 = setTimeout(() => setPhase("expand"), 1200); 
      const timer2 = setTimeout(() => setPhase("done"), 1800);   
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-p3-charcoal flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          {/* Loading Bar Container */}
          <div className="w-full flex items-center justify-center">
            <motion.div
              className="h-2 rounded-full bg-p3-mint-flash shadow-lg"
              initial={{ width: "0%" }}
              animate={
                phase === "loading"
                  ? { width: "200px", transition: { duration: 1.2, ease: "easeInOut" } }
                  : { width: "100vw", transition: { duration: 0.6, ease: "easeInOut" } }
              }
              style={{
                margin: "0 auto",
                boxShadow: "0 0 24px 2px var(--p3-mint-flash, #00ffc8)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
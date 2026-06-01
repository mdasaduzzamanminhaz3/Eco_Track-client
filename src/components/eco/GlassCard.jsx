import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { forwardRef } from "react";
export const GlassCard = forwardRef(({ className, glow, children, ...rest }, ref) => (<motion.div ref={ref} className={cn("glass relative rounded-2xl p-5 transition-shadow duration-300", glow && "eco-glow-soft hover:eco-glow", className)} {...rest}>
      {children}
    </motion.div>));
GlassCard.displayName = "GlassCard";

import { motion } from "framer-motion";

import uniMarburg from "@/assets/logos/uni-marburg-official.png";
import studentenwerk from "@/assets/logos/studentenwerk-official.png";
import stadtMarburg from "@/assets/logos/stadt-marburg-official.png";
import auslanderbeirat from "@/assets/logos/auslanderbeirat.png";
import marburgLiebe from "@/assets/logos/marburg-liebe.png";
import internationalOffice from "@/assets/logos/international-office.png";

const logos = [
  { src: uniMarburg, alt: "Philipps University Marburg" },
  { src: studentenwerk, alt: "Studentenwerk Marburg" },
  { src: stadtMarburg, alt: "Stadt Marburg" },
  { src: auslanderbeirat, alt: "Ausländerbeirat" },
  { src: marburgLiebe, alt: "Marburg Liebe" },
  { src: internationalOffice, alt: "International Office" },
];

// Duplicate the strip so the loop can wrap seamlessly at -50%.
const track = [...logos, ...logos];

const LogoMarquee = () => {
  return (
    <div className="relative overflow-hidden py-10">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

      <motion.div
        className="flex w-max items-center gap-16"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {track.map((logo, i) => (
          <img
            key={`${logo.alt}-${i}`}
            src={logo.src}
            alt={logo.alt}
            className="h-12 w-auto shrink-0 object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default LogoMarquee;

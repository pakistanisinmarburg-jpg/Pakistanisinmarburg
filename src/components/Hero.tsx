import { ReactNode } from "react";

interface HeroProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  image: string;
  overlay?: boolean;
}

const Hero = ({ title, subtitle, children, image, overlay = true }: HeroProps) => {
  return (
    <section className="relative flex min-h-[500px] items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary/90" />
      )}

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="mb-4 text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/90 md:text-xl">
            {subtitle}
          </p>
        )}
        {children && (
          <div className="flex flex-wrap justify-center gap-4">
            {children}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;

import { Button } from "@/components/ui/button";
import heroMountains from "@/assets/hero-mountains.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      
      {/* Mountain background image */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url(${heroMountains})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Main content */}
          <div className="text-center lg:text-left space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Want to Acquire a Business?{" "}
              <span className="block">We'll Fund You!</span>
            </h1>
            
            <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
              At Passet, We back experienced operators with the capital, playbooks, and expert support needed to acquire and grow subscription-based mobile apps.
            </p>
            
            <Button variant="hero" size="lg" className="group">
              SET UP A MEETING NOW
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Button>
          </div>
          
          {/* Right side - Stats */}
          <div className="text-center lg:text-right">
            <div className="text-6xl lg:text-8xl font-bold text-white mb-4">
              11M+
            </div>
            <p className="text-xl text-white/80 max-w-md ml-auto">
              Our founders have scaled and sold mobile apps with 10M+ users.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
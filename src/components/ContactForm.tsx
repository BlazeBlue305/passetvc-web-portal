import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    
    toast({
      title: "Meeting request submitted!",
      description: "We'll get back to you soon.",
    });

    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Mobile and Desktop Layout */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content (Hidden on mobile, shown on desktop) */}
            <div className="hidden lg:block text-white space-y-6">
              <h2 className="text-4xl xl:text-5xl font-bold leading-tight">
                Want to Acquire a Business?{" "}
                <span className="block">We'll Fund You!</span>
              </h2>
              <p className="text-xl text-white/90 leading-relaxed">
                At Passet, We back experienced operators with the capital, playbooks, and expert support needed to acquire and grow subscription-based mobile apps.
              </p>
            </div>
            
            {/* Right side - Form */}
            <div className="w-full">
              {/* Mobile header (shown only on mobile) */}
              <div className="lg:hidden text-center text-white space-y-6 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                  Want to Acquire a Business?{" "}
                  <span className="block">We'll Fund You!</span>
                </h2>
                <p className="text-lg text-white/90 leading-relaxed">
                  At Passet, We back experienced operators with the capital, playbooks, and expert support needed to acquire and grow subscription-based mobile apps.
                </p>
              </div>
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="h-14 rounded-full bg-white/95 backdrop-blur-sm border-0 text-gray-900 placeholder:text-gray-500 text-lg"
                  required
                />
                
                <Input
                  name="email"
                  type="email"
                  placeholder="Email Id"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-14 rounded-full bg-white/95 backdrop-blur-sm border-0 text-gray-900 placeholder:text-gray-500 text-lg"
                  required
                />
                
                <Textarea
                  name="message"
                  placeholder="Anything you want to add!"
                  value={formData.message}
                  onChange={handleChange}
                  className="min-h-32 rounded-3xl bg-white/95 backdrop-blur-sm border-0 text-gray-900 placeholder:text-gray-500 text-lg resize-none"
                />
                
                <Button 
                  type="submit" 
                  variant="cta" 
                  size="lg" 
                  className="w-full h-14 text-lg font-semibold group"
                >
                  SET UP A MEETING NOW
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
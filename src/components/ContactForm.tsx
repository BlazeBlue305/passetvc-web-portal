import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([formData]);

      if (error) {
        throw error;
      }

      // Navigate to thank you page
      navigate('/thank-you');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error submitting form",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="h-14 rounded-full bg-white/95 backdrop-blur-sm border-0 text-gray-900 placeholder:text-gray-500 text-lg"
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "SUBMITTING..." : "SET UP A MEETING NOW"}
                  {!isSubmitting && (
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
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
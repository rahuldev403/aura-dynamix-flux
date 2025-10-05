import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png";

const footerLinks = {
  products: [
    { name: "Drones", href: "#" },
    { name: "Robotics", href: "#" },
    { name: "Hardware", href: "#" },
    { name: "Software", href: "#" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Contact", href: "#" },
  ],
  resources: [
    { name: "Documentation", href: "#" },
    { name: "Support", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Community", href: "#" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export const Footer = () => {
  return (
    <footer id="contact" className="relative pt-20 pb-8 border-t border-primary/20">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-primary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Aura Dynamics" className="w-12 h-12 glow" />
              <span className="font-orbitron font-bold text-xl gradient-text">
                AURA DYNAMICS
              </span>
            </div>
            
            <p className="text-foreground/60 font-inter mb-6 leading-relaxed">
              Engineering the future of autonomy with cutting-edge robotics, drones, and high-performance hardware.
            </p>

            <div className="space-y-3 text-sm text-foreground/60 font-inter">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>123 Innovation Drive, Tech Valley, CA 94025</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>contact@auradynamics.com</span>
              </div>
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h3 className="font-orbitron font-bold text-foreground mb-4">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-foreground/60 hover:text-primary transition-colors font-inter text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-orbitron font-bold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-foreground/60 hover:text-primary transition-colors font-inter text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-orbitron font-bold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-foreground/60 hover:text-primary transition-colors font-inter text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="glass-strong p-8 rounded-lg mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-orbitron font-bold text-2xl mb-2 gradient-text">
              Stay Updated
            </h3>
            <p className="text-foreground/60 font-inter mb-6">
              Subscribe to our newsletter for the latest updates on autonomous technology
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="glass border-primary/30 focus:border-primary"
              />
              <Button variant="hero" className="whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-4 mb-8">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="glass p-3 rounded-full hover:glass-strong hover:border-primary/50 transition-all duration-300 group relative"
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/20 blur-lg"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              <social.icon className="w-5 h-5 text-foreground/60 group-hover:text-primary transition-colors relative z-10" />
            </motion.a>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-primary/20 text-center">
          <p className="text-foreground/40 font-inter text-sm">
            © 2025 Aura Dynamics. All rights reserved. Pioneering the future of autonomous systems.
          </p>
        </div>
      </div>
    </footer>
  );
};

import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, Phone, MapPin, MessageCircle } from "lucide-react";

const Footer = () => {
  
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div>
            <div className="mb-4">
              <h3 className="font-bold text-foreground">Pakistanis in Marburg</h3>
              <p className="text-xs text-muted-foreground">Community</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Bringing families, students, and professionals together for events, support, and cultural celebration.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground transition-colors hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/students" className="text-muted-foreground transition-colors hover:text-primary">
                  Student Hub
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-muted-foreground transition-colors hover:text-primary">
                  Events Calendar
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground transition-colors hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-primary" />
                <span className="text-muted-foreground">pakistanisinmarburg@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 text-primary" />
                <span className="text-muted-foreground">+49 152 1616 4830</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Marburg, Germany</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/pakistanisinmarburg?igsh=czhhcTU4YzIwaXZs&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/share/1GoNnaCUZK/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://chat.whatsapp.com/LKrZxKpvjau5vJPmhCbrzg?mode=wwt"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Pakistanis in Marburg. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

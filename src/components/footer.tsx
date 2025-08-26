import Link from "next/link";
import { MapPin, Phone, GitBranchIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Restaurant Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  B
                </span>
              </div>
              <span className="font-bold text-xl text-foreground">
                Bella Vista
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Authentic Italian cuisine in the heart of the city. Experience the
              taste of Italy with every bite.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>123 Italian Street, City, State 12345</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <GitBranchIcon className="w-4 h-4" />
                <a href="https://github.com/Rayzor8" target="_blank">
                  https://github.com/Rayzor8
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Hours</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Mon - Thu</span>
                <span>5:00 PM - 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Fri - Sat</span>
                <span>5:00 PM - 11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>4:00 PM - 9:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <Link
                href="/menu"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Menu
              </Link>
              <Link
                href="/book"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Reservations
              </Link>
              <Link
                href="/about"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/gallery"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Gallery
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; 2025 @rayzor.dev - Made with ❤️ for authentic Italian dining.
          </p>
        </div>
      </div>
    </footer>
  );
}

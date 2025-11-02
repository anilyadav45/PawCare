export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Grami Pashu Sahayak</h3>
            <p className="text-secondary text-sm">
              Your trusted companion for livestock care and agricultural guidance in rural India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-secondary">
              <li>
                <a href="#health" className="hover:text-primary transition-colors">
                  Animal Health
                </a>
              </li>
              <li>
                <a href="#tips" className="hover:text-primary transition-colors">
                  Farm Tips
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-primary transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#vets" className="hover:text-primary transition-colors">
                  Find Vets
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Contact</h3>
            <p className="text-secondary text-sm mb-2">Email: info@gramipashusahayak.com</p>
            <p className="text-secondary text-sm">Phone: +91-XXXX-XXXX-XX</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <p className="text-center text-secondary text-sm">
            Built by <span className="font-semibold text-foreground">Team</span> with dedication to rural
            livestock care
          </p>
        </div>
      </div>
    </footer>
  )
}

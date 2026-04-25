import { Link } from "react-router-dom";

const SiteFooter = () => {
  return (
    <footer className="bg-field text-background mt-24">
      <div className="container-edge py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="size-8 bg-background/10 flex items-center justify-center">
              <div className="size-3.5 border border-background/30" />
            </div>
            <span className="font-semibold tracking-tighter text-lg uppercase">
              SBGFARMS <span className="text-background/40">Systems</span>
            </span>
          </div>
          <p className="text-sm text-background/60 max-w-md leading-relaxed">
            Biosecure, large-scale poultry production supplying wholesalers,
            retailers, supermarkets, and distributors with consistently graded
            eggs in bulk.
          </p>
          <p className="mt-6 text-[10px] font-mono uppercase tracking-widest text-background/40">
            ISO 22000 Certified · Tier-4 Biosecurity
          </p>
        </div>

        <div>
          <h4 className="text-[10px] font-mono uppercase tracking-widest text-background/40 mb-4">
            Navigate
          </h4>
          <ul className="space-y-2 text-sm">
            {[
              ["About", "/about"],
              ["Products", "/products"],
              ["Services", "/services"],
              ["Gallery", "/gallery"],
              ["Contact", "/contact"],
            ].map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="text-background/70 hover:text-background transition-smooth">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-mono uppercase tracking-widest text-background/40 mb-4">
            Contact
          </h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li>sales@sbgfarms.com</li>
            <li>+1 (555) 010-2024</li>
            <li className="pt-2">SBG Production Park</li>
            <li>Sector 04, Farmlands Road</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="container-edge py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-background/40">
          <span>© {new Date().getFullYear()} SBGFARMS Production · Unit B-09</span>
          <div className="flex gap-6">
            <Link to="/contact" className="hover:text-background">Wholesale</Link>
            <a href="#" className="hover:text-background">Privacy</a>
            <a href="#" className="hover:text-background">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;

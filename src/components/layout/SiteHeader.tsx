import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
];

const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="container-edge h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group" aria-label="SBGFARMS home">
          <div className="size-8 bg-primary flex items-center justify-center transition-smooth group-hover:bg-primary-glow">
            <div className="size-3.5 border border-primary-foreground/50" />
          </div>
          <span className="font-semibold tracking-tighter text-lg uppercase">
            Sbg<span className="text-primary">Farms</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium transition-smooth hover:text-primary ${
                  isActive ? "text-primary" : "text-foreground"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden md:flex items-center gap-2 text-[10px] font-mono uppercase text-muted-foreground tracking-widest">
            <span className="pulse-dot" /> Operational
          </span>
          <Button asChild size="sm" className="hidden md:inline-flex rounded-none">
            <Link to="/contact?intent=quote">Request Quote</Link>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 -mr-2 text-foreground"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container-edge py-4 flex flex-col gap-1" aria-label="Mobile">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `py-3 px-2 text-sm font-medium border-b border-border last:border-0 ${
                    isActive ? "text-primary" : "text-foreground"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Button asChild className="mt-3 rounded-none">
              <Link to="/contact?intent=quote">Request Quote</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;

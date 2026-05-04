import { Link } from "react-router-dom";
import { ArrowRight, Egg, ShieldCheck, Truck, Award, Beaker } from "lucide-react";
import { Button } from "@/components/ui/button";
import Seo from "@/components/Seo";
import heroEgg from "@/assets/hero-egg.jpg";
import hensLaying from "@/assets/hens-laying.jpg";
import eggCrates from "@/assets/egg-crates.jpg";

const features = [
  {
    code: "01",
    title: "Grade-A Integrity",
    body: "Electronic candling and laser shell-scanning ensure every unit meets pharmaceutical-level purity and structural standards.",
    bullets: ["99.8% Integrity Match", "Zero-Pathogen Environment"],
  },
  {
    code: "02",
    title: "Biosecure Hygiene",
    body: "Tier-4 biosecurity protocols. Sealed environments and HEPA-filtered ventilation prevent contamination at every stage.",
    bullets: ["HEPA-Filtered Ventilation", "UV-C Sanitization Line"],
  },
  {
    code: "03",
    title: "Automated Scale",
    body: "Optimized for wholesale fulfillment. Integrated cold-chain logistics distribute to regional and international hubs.",
    bullets: ["500k Daily Throughput", "Real-time Stock Telemetry"],
  },
];

const stats = [
  { value: "1,240+", label: "Retail Partners" },
  { value: "0.02%", label: "Variance Rate" },
  { value: "24h", label: "Farm to Shelf" },
  { value: "ISO", label: "22000 Certified" },
];

const Home = () => {
  return (
    <>
      <Seo
        title="SBGFARMS — Fresh, High-Quality Eggs in Bulk Supply"
        description="Biosecure poultry production supplying wholesalers, retailers, supermarkets, and distributors with consistently graded fresh eggs at scale."
      />

      {/* Hero */}
      <section className="border-b border-border" aria-labelledby="hero-title">
        <div className="container-edge px-0 lg:px-0 max-w-7xl mx-auto flex flex-col lg:flex-row">
          <div className="lg:w-1/2 px-6 lg:px-16 py-16 lg:py-24 flex flex-col justify-center lg:border-r border-border fade-in">
            <span className="eyebrow mb-8 self-start">
              <span className="pulse-dot" /> Grade-AA Certified Supply
            </span>
            <h1
              id="hero-title"
              className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] mb-8 text-balance"
            >
              Fresh, High-Quality{" "}
              <span className="font-medium italic text-primary">Eggs</span> in
              Bulk Supply
            </h1>
            <p className="text-lg text-muted-foreground max-w-[48ch] leading-relaxed mb-10 text-pretty">
              Clinical precision in avian health and nutrition. SBGFARMS provides
              biosecure, logistics-optimized egg distribution for supermarkets,
              wholesalers, and global food distributors.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-none h-12 px-8">
                <Link to="/contact?intent=quote">
                  Request Quote <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-none h-12 px-8 border-border">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>

          <div className="lg:w-1/2 bg-secondary relative overflow-hidden min-h-[420px]">
            <img
              src={heroEgg}
              alt="Pristine fresh egg on stainless steel surface in clinical poultry facility"
              className="w-full h-full object-cover absolute inset-0"
              width={1280}
              height={1600}
              fetchPriority="high"
            />
            <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 bg-background/95 backdrop-blur-sm p-5 lg:p-6 border border-border shadow-card max-w-[260px]">
              <div className="text-[10px] font-mono text-muted-foreground mb-2 uppercase tracking-tighter">
                Facility Log: [47.112-B]
              </div>
              <div className="text-sm font-medium mb-2">Thermal Control System</div>
              <div className="w-full bg-secondary h-1 mb-3" aria-hidden>
                <div className="bg-primary h-full w-[94%]" />
              </div>
              <p className="text-xs text-muted-foreground leading-snug">
                Automated grading across 500,000 units daily.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-border" aria-label="Key metrics">
        <div className="container-edge py-10 flex flex-wrap justify-between gap-8">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <span className="text-3xl md:text-4xl font-light tabular-nums leading-none tracking-tighter">
                {s.value}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest mt-2 text-muted-foreground">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-eggshell border-b border-border py-20 lg:py-28" aria-labelledby="features-title">
        <div className="container-edge">
          <div className="mb-16 max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-4">
              Protocol & Standards
            </span>
            <h2 id="features-title" className="text-3xl md:text-4xl font-light tracking-tight">
              Institutional-Grade Infrastructure
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
            {features.map((f) => (
              <div
                key={f.code}
                className="bg-eggshell p-8 lg:p-10 transition-smooth hover:bg-background"
              >
                <div className="size-12 bg-secondary border border-border flex items-center justify-center mb-8">
                  <span className="text-xs font-mono text-primary font-semibold">{f.code}</span>
                </div>
                <h3 className="text-lg font-medium mb-4 uppercase tracking-wide">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{f.body}</p>
                <ul className="space-y-2.5">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                      <div className="size-1 bg-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview / Two column */}
      <section className="border-b border-border py-20 lg:py-28">
        <div className="container-edge grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="aspect-[4/3] bg-secondary overflow-hidden border border-border order-2 lg:order-1">
            <img
              src={hensLaying}
              alt="Healthy hens inside a modern, hygienic SBGFARMS production barn"
              className="w-full h-full object-cover"
              width={1600}
              height={1200}
              loading="lazy"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="eyebrow mb-6">About SBGFARMS</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6 text-balance">
              A vertically-integrated poultry operation built for{" "}
              <span className="italic font-medium">scale and trust</span>.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We breed, raise, collect, grade, and ship under one roof — eliminating
              middlemen and giving wholesale partners total traceability from hen to
              delivery dock.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { icon: Award, text: "ISO 22000 & HACCP compliant" },
                { icon: ShieldCheck, text: "Tier-4 biosecure facilities" },
                { icon: Truck, text: "Cold-chain fleet, 24h dispatch" },
                { icon: Beaker, text: "In-house QA laboratory" },
              ].map((i) => (
                <div key={i.text} className="flex items-start gap-3">
                  <i.icon className="size-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground">{i.text}</span>
                </div>
              ))}
            </div>
            <Button asChild variant="outline" className="rounded-none">
              <Link to="/about">Our Story <ArrowRight className="size-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Product preview */}
      <section className="bg-eggshell border-b border-border py-20 lg:py-28" aria-labelledby="products-title">
        <div className="container-edge">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-3">
                Product Range
              </span>
              <h2 id="products-title" className="text-3xl md:text-4xl font-light tracking-tight">
                Three formats. One standard.
              </h2>
            </div>
            <Button asChild variant="outline" className="rounded-none self-start md:self-end">
              <Link to="/products">View all products <ArrowRight className="size-4" /></Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Jumbo Eggs", note: "73g+ · Premium AA", icon: Egg },
              { name: "Medium Brown Eggs", note: "53–63g · Wholesale", icon: Egg },
              { name: "Bulk Crate Eggs", note: "Pallet · Distributor", icon: Egg },
            ].map((p) => (
              <Link
                key={p.name}
                to="/products"
                className="group bg-background border border-border p-8 transition-smooth hover:border-primary"
              >
                <p.icon className="size-6 text-primary mb-6" />
                <h3 className="text-xl font-medium mb-1">{p.name}</h3>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{p.note}</p>
                <div className="mt-8 pt-6 border-t border-border flex items-center justify-between text-sm font-medium text-primary">
                  Explore <ArrowRight className="size-4 transition-smooth group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-field text-background py-20 lg:py-28" aria-labelledby="cta-title">
        <div className="container-edge grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-background/40 block mb-4">
              Begin Procurement
            </span>
            <h2 id="cta-title" className="text-3xl md:text-5xl font-light tracking-tight text-balance">
              Ready to provision your supply chain?
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-background/70 leading-relaxed">
              Tell us your volume, format, and cadence. Our wholesale desk responds
              within one business day with a tailored quote, lead times, and
              delivery options.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-none h-12 px-8 bg-background text-field hover:bg-background/90">
                <Link to="/contact?intent=quote">Request Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-none h-12 px-8 border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background">
                <Link to="/services">View services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Crates strip */}
      <section className="border-b border-border" aria-hidden>
        <div className="aspect-[5/2] md:aspect-[16/5] overflow-hidden bg-secondary">
          <img
            src={eggCrates}
            alt=""
            className="w-full h-full object-cover"
            width={1600}
            height={1200}
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
};

export default Home;

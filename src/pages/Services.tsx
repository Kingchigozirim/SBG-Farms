import { Link } from "react-router-dom";
import { Truck, Package, FileSignature, ArrowRight } from "lucide-react";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Package,
    title: "Bulk Supply",
    body:
      "High-volume, repeat fulfillment for wholesalers and supermarket chains. Mixed-format orders consolidated on palletized loads.",
    points: ["Daily, weekly, or scheduled cadences", "Mixed grade & size orders", "Custom palletization"],
  },
  {
    icon: Truck,
    title: "Delivery & Logistics",
    body:
      "Owned cold-chain fleet maintaining a sealed 4°C envelope from facility dock to your receiving bay across the region.",
    points: ["24–48h regional dispatch", "GPS-tracked refrigerated trucks", "Zero-touch handoff option"],
  },
  {
    icon: FileSignature,
    title: "Contract Supply",
    body:
      "Long-term agreements with locked pricing and guaranteed weekly volumes — ideal for processors and distribution networks.",
    points: ["Fixed quarterly pricing", "Volume reservations", "Dedicated account manager"],
  },
];

const Services = () => {
  return (
    <>
      <Seo
        title="Services — Bulk Supply, Logistics & Contracts | SBGFARMS"
        description="Wholesale bulk supply, refrigerated delivery, and long-term contract supply agreements for retailers, supermarkets, and distributors."
      />

      <section className="border-b border-border py-20 lg:py-28">
        <div className="container-edge max-w-4xl">
          <span className="eyebrow mb-8">Services</span>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-[1.05] mb-6 text-balance">
            Wholesale operations, engineered as a{" "}
            <span className="italic font-medium text-primary">single system</span>.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From spot orders to multi-year contracts, our services are built to
            slot directly into the inventory rhythm of your business.
          </p>
        </div>
      </section>

      <section className="border-b border-border py-16 lg:py-24 bg-eggshell">
        <div className="container-edge grid gap-px bg-border border border-border md:grid-cols-3">
          {services.map((s) => (
            <article key={s.title} className="bg-eggshell p-8 lg:p-10 flex flex-col">
              <s.icon className="size-7 text-primary mb-8" strokeWidth={1.5} />
              <h2 className="text-2xl font-light tracking-tight mb-4">{s.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">{s.body}</p>
              <ul className="space-y-3 mt-auto pt-6 border-t border-border">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-foreground">
                    <div className="size-1 bg-primary" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-border py-20 lg:py-28">
        <div className="container-edge max-w-3xl text-center">
          <span className="eyebrow mb-6">Coverage</span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6">
            Regional reach. Predictable delivery.
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Two distribution hubs and a fleet of refrigerated trucks let us hit
            same-day or next-day windows across the entire service region — every
            day of the year.
          </p>
          <Button asChild size="lg" className="rounded-none h-12 px-8">
            <Link to="/contact?intent=quote">
              Discuss your requirements <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Services;

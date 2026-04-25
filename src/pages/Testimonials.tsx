import Seo from "@/components/Seo";
import { Quote } from "lucide-react";

const reviews = [
  {
    quote:
      "The texture and shell integrity of SBG eggs are consistently superior to any wholesale supplier we've used. Their cold-chain reliability is what keeps the contract.",
    name: "Marcus Thorne",
    role: "Executive Chef, Hartwell Hospitality Group",
  },
  {
    quote:
      "We moved our entire bakery network onto SBGFARMS in 2022. Variance in size and grade is essentially zero. That predictability changed our production planning.",
    name: "Aisha Okafor",
    role: "Procurement Director, Kindred Bakeries",
  },
  {
    quote:
      "Their dispatch desk is the most professional I've worked with. Quotes inside the day, palletized exactly to spec, and never a missed window.",
    name: "Daniel Ríos",
    role: "Distribution Manager, Norte Foods",
  },
  {
    quote:
      "Traceability and biosecurity are non-negotiable for our supermarket banner. SBGFARMS' documentation is the cleanest in the category.",
    name: "Helena Voss",
    role: "Category Buyer, Northway Markets",
  },
];

const Testimonials = () => {
  return (
    <>
      <Seo
        title="Testimonials — What Wholesale Partners Say | SBGFARMS"
        description="Reviews from chefs, procurement directors, distribution managers, and category buyers working with SBGFARMS."
      />

      <section className="border-b border-border py-20 lg:py-28">
        <div className="container-edge max-w-4xl">
          <span className="eyebrow mb-8">Testimonials</span>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-[1.05] mb-6 text-balance">
            Trusted by partners who don't{" "}
            <span className="italic font-medium text-primary">tolerate variance</span>.
          </h1>
        </div>
      </section>

      <section className="border-b border-border py-16 lg:py-24 bg-eggshell">
        <div className="container-edge grid gap-px bg-border border border-border md:grid-cols-2">
          {reviews.map((r) => (
            <blockquote key={r.name} className="bg-eggshell p-8 lg:p-12">
              <Quote className="size-6 text-primary mb-6" strokeWidth={1.5} />
              <p className="text-lg lg:text-xl font-light leading-relaxed text-foreground mb-8 text-balance">
                "{r.quote}"
              </p>
              <footer className="border-t border-border pt-5">
                <div className="text-sm font-medium">{r.name}</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">
                  {r.role}
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </>
  );
};

export default Testimonials;

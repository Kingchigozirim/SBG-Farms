import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import QuoteDialog from "@/components/QuoteDialog";

const Products = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | undefined>();

  const requestQuote = (name: string) => {
    setActive(name);
    setOpen(true);
  };

  return (
    <>
      <Seo
        title="Products — Bulk Eggs for Wholesale | SBGFARMS"
        description="Jumbo, medium, and crate eggs for wholesalers, retailers, supermarkets, and distributors. Request a tailored quote in minutes."
      />

      <section className="border-b border-border py-20 lg:py-28">
        <div className="container-edge max-w-4xl">
          <span className="eyebrow mb-8">Product Range</span>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-[1.05] mb-6 text-balance">
            Bulk eggs, graded for{" "}
            <span className="italic font-medium text-primary">wholesale precision</span>.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Three core formats designed around the operational rhythm of
            wholesalers, supermarkets, and distributors. All units pass the same
            multi-stage quality gates.
          </p>
        </div>
      </section>

      <section className="border-b border-border py-16 lg:py-24" aria-label="Products">
        <div className="container-edge grid gap-px bg-border border border-border md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <article key={p.id} className="bg-background flex flex-col">
              <div className="aspect-square overflow-hidden bg-eggshell">
                <img
                  src={p.image}
                  alt={`${p.name} — ${p.category}`}
                  className="w-full h-full object-cover transition-smooth hover:scale-[1.03]"
                  width={1024}
                  height={1024}
                  loading="lazy"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-semibold mb-3">
                  {p.category}
                </span>
                <h2 className="text-2xl font-light tracking-tight mb-3">{p.name}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{p.description}</p>

                <dl className="grid grid-cols-3 gap-2 border-t border-border pt-5 mb-6">
                  {p.specs.map((s) => (
                    <div key={s.label}>
                      <dt className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{s.label}</dt>
                      <dd className="text-sm font-medium mt-1">{s.value}</dd>
                    </div>
                  ))}
                </dl>

                <Button
                  onClick={() => requestQuote(p.name)}
                  className="rounded-none mt-auto"
                >
                  Request Quote <ArrowRight className="size-4" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <QuoteDialog open={open} onOpenChange={setOpen} productName={active} />
    </>
  );
};

export default Products;

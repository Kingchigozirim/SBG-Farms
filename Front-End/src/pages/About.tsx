import Seo from "@/components/Seo";
import hensLaying from "@/assets/hens-laying.jpg";
import gradingImg from "@/assets/gallery-grading.jpg";

const milestones = [
  { year: "2008", text: "Founded as a 4,000-bird family operation." },
  { year: "2014", text: "First commercial supermarket contract signed." },
  { year: "2019", text: "ISO 22000 certification & Tier-4 biosecurity upgrade." },
  { year: "2024", text: "500,000 units / day across 1,240+ retail partners." },
];

const About = () => {
  return (
    <>
      <Seo
        title="About SBGFARMS — Heritage poultry, modern precision"
        description="Learn the story, mission, and rigorous farming process behind SBGFARMS' biosecure egg production at industrial scale."
      />

      <section className="border-b border-border py-20 lg:py-28">
        <div className="container-edge max-w-4xl">
          <span className="eyebrow mb-8">Our Story</span>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-[1.05] mb-8 text-balance">
            From a single barn to{" "}
            <span className="italic font-medium text-primary">half a million eggs a day</span>.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            SBGFARMS began in 2008 with a single conviction: that bulk egg supply
            could be both vast in scale and uncompromising in standard. Three
            generations later, we operate as one of the most technologically
            integrated poultry producers in the region — and still pack every
            order under the same family name.
          </p>
        </div>
      </section>

      <section className="border-b border-border py-20 lg:py-24 bg-eggshell">
        <div className="container-edge grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-3">
              Mission
            </span>
            <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-4">
              Reliable nutrition for the food supply chain.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Provide wholesalers, supermarkets, and distributors with eggs of
              consistent grade, timed dispatch, and total traceability — so they
              can guarantee the same to their customers.
            </p>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-3">
              Vision
            </span>
            <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-4">
              Set the regional benchmark for biosecure scale.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              By 2030, supply 1 million eggs per day with zero compromise on
              welfare, hygiene, or grade — backed by full digital traceability
              from nest to delivery dock.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-20 lg:py-28">
        <div className="container-edge grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="aspect-[4/3] overflow-hidden border border-border">
            <img
              src={hensLaying}
              alt="SBGFARMS production barn with healthy hens"
              className="w-full h-full object-cover"
              width={1600}
              height={1200}
              loading="lazy"
            />
          </div>
          <div>
            <span className="eyebrow mb-6">Farming Process</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6">
              Five controlled stages, one seamless pipeline.
            </h2>
            <ol className="space-y-5">
              {[
                ["Genetics & welfare", "Selectively bred layer flocks raised in low-stress, climate-controlled barns."],
                ["Nutrition", "Veterinary-formulated feed produced on-site, fortified with essential minerals."],
                ["Collection", "Automated belt collection minimizes handling and breakage."],
                ["Grading & QA", "Electronic candling, weight class sorting, manual spot checks."],
                ["Cold-chain dispatch", "Sealed crates moved through 4°C cold-chain to your dock within 24h."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="font-mono text-xs text-primary mt-1 shrink-0">0{i + 1}</span>
                  <div>
                    <h3 className="text-base font-medium mb-1">{t}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-20 lg:py-28 bg-eggshell">
        <div className="container-edge">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-3">
            Milestones
          </span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-12">A timeline of scale.</h2>
          <div className="grid md:grid-cols-4 gap-px bg-border border border-border">
            {milestones.map((m) => (
              <div key={m.year} className="bg-eggshell p-8">
                <div className="text-3xl font-light tabular-nums mb-3 text-primary">{m.year}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border" aria-hidden>
        <div className="aspect-[5/2] md:aspect-[16/5] overflow-hidden bg-secondary">
          <img src={gradingImg} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
      </section>
    </>
  );
};

export default About;

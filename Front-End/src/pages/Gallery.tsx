import Seo from "@/components/Seo";
import hens from "@/assets/gallery-hens.jpg";
import facility from "@/assets/gallery-facility.jpg";
import grading from "@/assets/gallery-grading.jpg";
import logistics from "@/assets/gallery-logistics.jpg";
import crates from "@/assets/egg-crates.jpg";
import barn from "@/assets/hens-laying.jpg";

const items = [
  { src: facility, alt: "SBGFARMS facility exterior on a clear day", caption: "Production Park · Sector 04" },
  { src: barn, alt: "Modern hygienic poultry barn interior", caption: "Layer Barn · Climate-controlled" },
  { src: hens, alt: "Free-range hens on fresh straw bedding", caption: "Welfare-First Flocks" },
  { src: grading, alt: "Workers in clean uniforms grading eggs on a conveyor", caption: "Grading & QA Line" },
  { src: crates, alt: "Trays of brown and white eggs prepared for dispatch", caption: "Pre-Dispatch Staging" },
  { src: logistics, alt: "Refrigerated truck loaded with crates of eggs at the dock", caption: "Cold-Chain Dispatch" },
];

const Gallery = () => {
  return (
    <>
      <Seo
        title="Gallery — Inside the SBGFARMS Operation"
        description="A visual tour of SBGFARMS facilities, layer barns, grading lines, and cold-chain logistics."
      />

      <section className="border-b border-border py-20 lg:py-28">
        <div className="container-edge max-w-4xl">
          <span className="eyebrow mb-8">Gallery</span>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-[1.05] mb-6 text-balance">
            Inside the operation.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A visual walk through our layer barns, grading lines, and cold-chain
            dispatch — the systems behind every crate we ship.
          </p>
        </div>
      </section>

      <section className="border-b border-border py-12 lg:py-16">
        <div className="container-edge grid gap-px bg-border border border-border sm:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <figure key={i.caption} className="group bg-background overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden bg-eggshell">
                <img
                  src={i.src}
                  alt={i.alt}
                  className="w-full h-full object-cover transition-smooth group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>
              <figcaption className="p-5 border-t border-border">
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  {i.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
};

export default Gallery;

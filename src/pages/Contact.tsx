import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { Mail, MapPin, Phone, MessageCircle, Loader2 } from "lucide-react";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "15550102024"; // placeholder — update with real number

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(6, "Enter a valid phone").max(40),
  message: z
    .string()
    .trim()
    .min(10, "Please add a little more detail")
    .max(1000),
});

const Contact = () => {
  const [params] = useSearchParams();
  const intent = params.get("intent");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  useEffect(() => {
    if (intent === "quote") {
      setForm((f) => ({
        ...f,
        message:
          f.message ||
          "I'd like to request a wholesale quote. Volume / format / cadence: ",
      }));
    }
  }, [intent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        next[i.path[0] as string] = i.message;
      });
      setErrors(next);
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    toast.success("Message sent", {
      description: "Our team will reply within one business day.",
    });
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello SBGFARMS, I'd like to discuss a bulk order."
  )}`;

  return (
    <>
      <Seo
        title="Contact SBGFARMS — Wholesale Sales & Quotes"
        description="Reach the SBGFARMS wholesale desk. Submit a quote request, message us on WhatsApp, or visit our production facility."
      />

      <section className="border-b border-border py-20 lg:py-24">
        <div className="container-edge max-w-4xl">
          <span className="eyebrow mb-8">Contact</span>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-[1.05] mb-6 text-balance">
            Talk to the wholesale desk.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Tell us your volume, format, and cadence — we respond within one
            business day.
          </p>
        </div>
      </section>

      <section className="border-b border-border py-16 lg:py-20">
        <div className="container-edge grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label htmlFor="c-name" className="text-xs uppercase tracking-wider">Name</Label>
                  <Input
                    id="c-name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="rounded-none h-12"
                    aria-invalid={!!errors.name}
                    maxLength={100}
                  />
                  {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-phone" className="text-xs uppercase tracking-wider">Phone</Label>
                  <Input
                    id="c-phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="rounded-none h-12"
                    aria-invalid={!!errors.phone}
                    maxLength={40}
                  />
                  {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="c-email" className="text-xs uppercase tracking-wider">Email</Label>
                <Input
                  id="c-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="rounded-none h-12"
                  aria-invalid={!!errors.email}
                  maxLength={255}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="c-msg" className="text-xs uppercase tracking-wider">Message</Label>
                <Textarea
                  id="c-msg"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="rounded-none min-h-[140px]"
                  aria-invalid={!!errors.message}
                  maxLength={1000}
                />
                {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
              </div>

              <Button type="submit" disabled={submitting} size="lg" className="rounded-none h-12 px-8">
                {submitting && <Loader2 className="size-4 animate-spin" />}
                Send Message
              </Button>
            </form>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2 space-y-8">
            <div className="border border-border p-6">
              <h2 className="text-sm font-medium uppercase tracking-wider mb-5">Direct channels</h2>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Mail className="size-4 text-primary mt-0.5 shrink-0" />
                  <a href="mailto:sales@sbgfarms.com" className="hover:text-primary transition-smooth">
                    sales@sbgfarms.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="size-4 text-primary mt-0.5 shrink-0" />
                  <a href="tel:+15550102024" className="hover:text-primary transition-smooth">
                    +1 (555) 010-2024
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="size-4 text-primary mt-0.5 shrink-0" />
                  <span>SBG Production Park<br />Sector 04, Farmlands Road</span>
                </li>
              </ul>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 p-6 bg-primary text-primary-foreground hover:bg-primary-glow transition-smooth"
            >
              <div className="flex items-center gap-3">
                <MessageCircle className="size-5" />
                <div>
                  <div className="text-sm font-medium">Chat on WhatsApp</div>
                  <div className="text-xs opacity-75 mt-0.5">Fastest response · business hours</div>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest">Open ↗</span>
            </a>
          </aside>
        </div>
      </section>

      {/* Map */}
      <section aria-label="Map">
        <div className="aspect-[16/9] md:aspect-[21/9] w-full bg-secondary border-t border-border">
          <iframe
            title="SBGFARMS location"
            src="https://www.google.com/maps?q=Farmlands+Road&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
};

export default Contact;

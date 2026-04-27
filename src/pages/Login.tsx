import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import heroEgg from "@/assets/hero-egg.jpg";

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Enter a valid email address" }).max(255),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).max(72),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    };

    const parsed = loginSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      parsed.error.issues.forEach((i) => {
        const key = i.path[0] as "email" | "password";
        if (key && !fieldErrors[key]) fieldErrors[key] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    // UI-only — no backend wired yet.
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Sign-in form validated", {
        description: "Connect Lovable Cloud to enable real authentication.",
      });
      navigate("/");
    }, 700);
  };

  return (
    <div className="min-h-[calc(100dvh-4rem)] grid lg:grid-cols-2">
      <Seo
        title="Sign In"
        description="Secure portal access for SBGFARMS wholesale partners, distributors, and supermarket buyers."
      />

      {/* Left — visual panel */}
      <aside
        className="relative hidden lg:flex flex-col justify-between p-10 text-primary-foreground overflow-hidden"
        aria-hidden="true"
      >
        <img
          src={heroEgg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-dark)", opacity: 0.92 }}
        />

        <div className="relative z-10 flex items-center gap-2.5">
          <div className="size-8 bg-primary-foreground/95 flex items-center justify-center">
            <div className="size-3.5 border border-primary" />
          </div>
          <span className="font-semibold tracking-tighter text-lg uppercase">
            Sbg<span className="text-primary-foreground/70">Farms</span>
          </span>
        </div>

        <div className="relative z-10 space-y-6 max-w-md">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary-foreground/10 border border-primary-foreground/20 text-[10px] font-mono uppercase tracking-[0.18em] text-primary-foreground font-semibold">
            <span className="size-1.5 rounded-full bg-primary-foreground" /> Secure Portal
          </span>
          <h2 className="text-3xl font-semibold tracking-tight leading-tight">
            Bulk egg supply, traced from coop to crate.
          </h2>
          <p className="text-sm text-primary-foreground/75 leading-relaxed">
            Manage standing orders, track shipments, and access wholesale pricing tailored to
            distributors, supermarkets, and retail networks.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-6 text-primary-foreground/85">
          {[
            { k: "99.4%", v: "Grade A yield" },
            { k: "24/7", v: "Cold-chain" },
            { k: "ISO", v: "HACCP audited" },
          ].map((s) => (
            <div key={s.v}>
              <div className="font-mono text-xl font-semibold">{s.k}</div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-primary-foreground/55 mt-1">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Right — form */}
      <section className="flex items-center justify-center p-6 sm:p-10 bg-background">
        <div className="w-full max-w-md fade-in">
          <div className="mb-8">
            <span className="eyebrow mb-4">
              <ShieldCheck className="size-3" /> Partner Access
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Sign in to your account
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              New to SBGFARMS?{" "}
              <Link
                to="/contact?intent=quote"
                className="text-primary font-medium hover:underline underline-offset-4"
              >
                Request partner access
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="buyer@company.com"
                  className="pl-9 rounded-none h-11 bg-card"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="text-xs text-destructive font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  Password
                </Label>
                <Link
                  to="/contact?intent=reset"
                  className="text-xs text-primary hover:underline underline-offset-4 font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className="pl-9 pr-10 rounded-none h-11 bg-card"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="text-xs text-destructive font-medium">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="remember" name="remember" className="rounded-none" />
              <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground cursor-pointer">
                Keep me signed in on this device
              </Label>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full h-11 rounded-none font-medium tracking-wide"
            >
              {submitting ? "Verifying…" : "Sign In"}
            </Button>

            <div className="flex items-center gap-2 pt-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              <ShieldCheck className="size-3 text-primary" />
              <span>Encrypted session · HACCP-aligned access controls</span>
            </div>
          </form>

          <p className="mt-10 text-xs text-muted-foreground">
            By signing in you agree to SBGFARMS{" "}
            <Link to="/about" className="underline underline-offset-2 hover:text-foreground">
              Terms
            </Link>{" "}
            and{" "}
            <Link to="/about" className="underline underline-offset-2 hover:text-foreground">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default Login;

import { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const quoteSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(6, "Enter a valid phone").max(40),
  quantity: z.string().trim().min(1, "Required").max(80),
  message: z.string().trim().max(1000).optional(),
});

interface QuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName?: string;
}

const QuoteDialog = ({ open, onOpenChange, productName }: QuoteDialogProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: "",
    message: "",
  });

  useEffect(() => {
    if (open && productName) {
      setForm((f) => ({
        ...f,
        message: f.message || `Interested in: ${productName}`,
      }));
    }
  }, [open, productName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const parsed = quoteSchema.safeParse(form);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        next[i.path[0] as string] = i.message;
      });
      setErrors(next);
      return;
    }
    setSubmitting(true);
    // Simulated submission — wire to backend later.
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    toast.success("Quote request received", {
      description: "Our wholesale team will respond within one business day.",
    });
    onOpenChange(false);
    setForm({ name: "", email: "", phone: "", quantity: "", message: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-none border-2">
        <DialogHeader>
          <DialogTitle className="font-mono text-[10px] uppercase tracking-widest text-primary font-semibold">
            Bulk Procurement
          </DialogTitle>
          <DialogDescription className="text-2xl font-light tracking-tight text-foreground pt-2">
            Request a wholesale quote
            {productName && (
              <span className="block text-sm text-muted-foreground mt-1 font-sans">
                Product: {productName}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2" noValidate>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="q-name" className="text-xs uppercase tracking-wider">Name</Label>
              <Input
                id="q-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-none"
                aria-invalid={!!errors.name}
                maxLength={100}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="q-phone" className="text-xs uppercase tracking-wider">Phone</Label>
              <Input
                id="q-phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="rounded-none"
                aria-invalid={!!errors.phone}
                maxLength={40}
              />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="q-email" className="text-xs uppercase tracking-wider">Email</Label>
            <Input
              id="q-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="rounded-none"
              aria-invalid={!!errors.email}
              maxLength={255}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="q-qty" className="text-xs uppercase tracking-wider">Quantity / pallets</Label>
            <Input
              id="q-qty"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              placeholder="e.g. 50 pallets / month"
              className="rounded-none"
              aria-invalid={!!errors.quantity}
              maxLength={80}
            />
            {errors.quantity && <p className="text-xs text-destructive">{errors.quantity}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="q-msg" className="text-xs uppercase tracking-wider">Message</Label>
            <Textarea
              id="q-msg"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="rounded-none min-h-[90px]"
              maxLength={1000}
            />
          </div>

          <DialogFooter className="pt-2">
            <Button type="submit" disabled={submitting} className="rounded-none w-full sm:w-auto">
              {submitting && <Loader2 className="size-4 animate-spin" />}
              Submit Request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteDialog;

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

import { AuthLayout } from "../../components/auth/AuthLayout";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { PasswordInput } from "../../components/ui/Input";
import { Divider } from "../../components/ui/Divider";
import { SocialButton } from "../../components/ui/SocialButton";
import { Checkbox } from "../../components/ui/Checkbox";

interface RegisterFormState {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTOS: boolean;
  subscribeNewsletter: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeTOS?: string;
}

const Register: React.FC = () => {
  const [form, setForm] = useState<RegisterFormState>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTOS: false,
    subscribeNewsletter: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }
    
    if (!form.email) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email.";
    }
    
    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    
    if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    
    if (!form.agreeTOS) {
      newErrors.agreeTOS = "You must agree to the terms.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    // Clear error
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    try {
      // TODO: Implement registration logic
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Registration submitted", form);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {/* ── Branded Card Container ─────────────────────── */}
      <div className="relative w-full max-w-[480px] mx-auto">
        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* ── Page heading ────────────────────────────── */}
          <div className="mb-8 text-center">
            <h2
              className="font-bold text-4xl text-slate-900 tracking-tight mb-2"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Join the Club
            </h2>
            <p
              className="text-slate-500 text-sm"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Elevate your aesthetic journey today.
            </p>
          </div>

          {/* ── Social Login ────────────────────────────── */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <SocialButton provider="google" onClick={() => console.log("Google registration")} />
            <SocialButton provider="facebook" onClick={() => console.log("Facebook registration")} />
          </div>

          <Divider label="OR VIA EMAIL" />

          {/* ── Registration Form ───────────────────────── */}
          <form onSubmit={handleSubmit} noValidate className="space-y-6 mt-8">
            {/* Full Name */}
            <Input
              label="FULL NAME"
              name="fullName"
              placeholder="Alex Rivera"
              value={form.fullName}
              onChange={handleChange}
              error={errors.fullName}
              className="bg-slate-100/50"
            />

            {/* Email Address */}
            <Input
              label="EMAIL ADDRESS"
              name="email"
              type="email"
              placeholder="alex@threadlux.com"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete="email"
              className="bg-slate-100/50"
            />

            {/* Password */}
            <PasswordInput
              label="PASSWORD"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              autoComplete="new-password"
              className="bg-slate-100/50"
            />

            {/* Confirm Password */}
            <PasswordInput
              label="CONFIRM PASSWORD"
              name="confirmPassword"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              autoComplete="new-password"
              className="bg-slate-100/50"
            />

            {/* Checkboxes */}
            <div className="space-y-4 pt-4">
              <Checkbox
                name="agreeTOS"
                checked={form.agreeTOS}
                onChange={handleChange}
                error={errors.agreeTOS}
                label={
                  <span className="text-sm">
                    I agree to the{" "}
                    <a href="#" className="text-[var(--color-pink)] font-bold hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[var(--color-pink)] font-bold hover:underline">
                      Privacy Policy
                    </a>.
                  </span>
                }
              />
              <Checkbox
                name="subscribeNewsletter"
                checked={form.subscribeNewsletter}
                onChange={handleChange}
                label="Subscribe to our newsletter for exclusive drops and trend reports."
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              rightIcon={!loading ? <ArrowRight size={18} /> : undefined}
              className="mt-6 py-4 rounded-3xl"
            >
              Create Account
            </Button>
          </form>

          {/* ── Login Link ──────────────────────────────── */}
          <p
            className="text-center text-sm text-slate-500 mt-10"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Already a member?{" "}
            <a
              href="/login"
              className="font-bold text-[var(--color-pink)] hover:text-[var(--color-pink-dim)] transition-colors"
            >
              Login here
            </a>
          </p>
          
          {/* Gradient bottom border active indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 signature-gradient" />
        </div>

        {/* Signature footer code from screenshot */}
        <div className="mt-6 text-center opacity-30 pointer-events-none">
          <span className="text-[10px] font-mono tracking-widest uppercase">
            REG_MODE_V2 // LUX-00192
          </span>
        </div>
        
        <div className="mt-8 text-center opacity-40">
           <span className="text-[10px] font-mono tracking-widest uppercase">
             © 2024 THREADLUX EDITORIAL
           </span>
        </div>
      </div>
    </AuthLayout>
  );

};

export default Register;

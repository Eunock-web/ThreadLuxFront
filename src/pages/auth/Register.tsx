import React, { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, AlertTriangle } from "lucide-react";

import { AuthLayout } from "../../components/auth/AuthLayout";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { PasswordInput } from "../../components/ui/Input";
import { Divider } from "../../components/ui/Divider";
import { SocialButton } from "../../components/ui/SocialButton";
import { Checkbox } from "../../components/ui/Checkbox";
import { useAuth } from "../../contexts/AuthContext";

interface RegisterFormState {
  firstname: string;
  lastname: string;
  email : string;
  password: string;
  password_confirmation: string;
  agreeTOS: boolean;
  subscribeNewsletter: boolean;
}

interface FormErrors {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  agreeTOS?: string;
  api?: string;
}

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterFormState>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password_confirmation: "",
    agreeTOS: false,
    subscribeNewsletter: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!form.firstname.trim()) {
      newErrors.firstname = "First name is required.";
    }
    
    if (!form.lastname.trim()) {
      newErrors.lastname = "Last name is required.";
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
    
    if (form.password_confirmation !== form.password) {
      newErrors.password_confirmation = "Passwords do not match.";
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
      setErrors((prev) => ({ ...prev, [name]: undefined, api: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    setErrors((prev) => ({ ...prev, api: undefined }));

    try {
      const result = await register(form);
      if (result.success) {
        navigate({ to: "/login" });
      } else {
        setErrors((prev) => ({
          ...prev,
          api: result.message || "Registration failed. Please check your details.",
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        api: "Failed to connect to the registration server. Please try again later.",
      }));
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
            {errors.api && (
              <div className="p-4 rounded-[24px] bg-red-500/10 border border-red-500/20 flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertTriangle className="text-red-500 shrink-0" size={20} />
                <p className="text-xs font-semibold text-red-500 leading-snug">
                  {errors.api}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="FIRST NAME"
                name="firstname"
                placeholder="Alex"
                value={form.firstname}
                onChange={handleChange}
                error={errors.firstname}
                className="bg-slate-100/50"
              />
              <Input
                label="LAST NAME"
                name="lastname"
                placeholder="Rivera"
                value={form.lastname}
                onChange={handleChange}
                error={errors.lastname}
                className="bg-slate-100/50"
              />
            </div>

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
              name="password_confirmation"
              placeholder="••••••••"
              value={form.password_confirmation}
              onChange={handleChange}
              error={errors.password_confirmation}
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
            <Link
              to="/login"
              className="font-bold text-[var(--color-pink)] hover:text-[var(--color-pink-dim)] transition-colors"
            >
              Login here
            </Link>
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

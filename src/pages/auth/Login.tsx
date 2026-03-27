import React, { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, AlertTriangle } from "lucide-react";

import { AuthLayout } from "../../components/auth/AuthLayout";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { PasswordInput } from "../../components/ui/Input";
import { Divider } from "../../components/ui/Divider";
import { SocialButton } from "../../components/ui/SocialButton";
import { useAuth } from "../../contexts/AuthContext";

interface LoginFormState {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  api?: string;
}

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginFormState>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
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
      const result = await login(form);
      if (result.success) {
        navigate({ to: "/" });
      } else {
        setErrors((prev) => ({
          ...prev,
          api: result.message || "Invalid credentials. Please try again.",
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        api: "Connection to security terminal failed. Please check your network.",
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleSocial = (provider: "google" | "apple") => {
    console.log("Social login:", provider);
  };

  return (
    <AuthLayout>
      {/* ── Page heading ──────────────────────────────── */}
      <div className="mb-10">
        <h2
          className="font-bold text-4xl text-[var(--color-on-surface)] tracking-tight mb-2"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Welcome Back
        </h2>
        <p
          className="text-[var(--color-on-surface-variant)] text-sm"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Sign in to your private collection
        </p>
      </div>

      {/* ── Login form ────────────────────────────────── */}
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {errors.api && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <AlertTriangle className="text-red-500 shrink-0" size={18} />
            <p className="text-xs font-semibold text-red-500 leading-snug">
              {errors.api}
            </p>
          </div>
        )}
        {/* Email */}
        <Input
          label="User Terminal"
          name="email"
          type="email"
          placeholder="email@threadlux.com"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
        />

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span
              className="text-[11px] uppercase tracking-widest text-[var(--color-on-surface-variant)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Security Key
            </span>
            <a
              href="#"
              className="text-xs font-semibold text-[var(--color-pink)] hover:text-[var(--color-pink-dim)] transition-colors"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Forgot password?
            </a>
          </div>
          <PasswordInput
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="current-password"
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          rightIcon={!loading ? <ArrowRight size={18} /> : undefined}
          className="mt-4"
        >
          Sign In
        </Button>
      </form>

      {/* ── Divider ───────────────────────────────────── */}
      <Divider label="External Handshake" />

      {/* ── Social login ──────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3">
        <SocialButton provider="google" onClick={() => handleSocial("google")} />
        <SocialButton provider="apple" onClick={() => handleSocial("apple")} />
      </div>

      {/* ── Register link ─────────────────────────────── */}
      <p
        className="text-center text-sm text-[var(--color-on-surface-variant)] mt-8"
        style={{ fontFamily: "var(--font-body)" }}
      >
        New to the network?{" "}
        <Link
          to="/register"
          className="font-bold text-[var(--color-pink)] hover:text-[var(--color-pink-dim)] transition-colors"
        >
          Join ThreadLux
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;


















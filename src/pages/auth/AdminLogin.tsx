import React, { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, AlertTriangle, ShieldCheck } from "lucide-react";

import { AuthLayout } from "../../components/auth/AuthLayout";
import { Button } from "../../components/ui/Button";
import { Input, PasswordInput } from "../../components/ui/Input";
import { useAuth } from "../../contexts/AuthContext";

interface FormErrors {
  email?: string;
  password?: string;
  api?: string;
}

const AdminLogin: React.FC = () => {
  const { adminLogin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.email) {
      newErrors.email = "Email requis.";
    }
    if (!form.password) {
      newErrors.password = "Mot de passe requis.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined, api: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});

    try {
      const result = await adminLogin(form);
      if (result.success) {
        navigate({ to: "/dashboard" });
      } else {
        setErrors({
          api: result.message || "Accès refusé. Vérifiez vos identifiants.",
        });
      }
    } catch (error) {
      setErrors({
        api: "Erreur de connexion au serveur.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-10 relative">
        <div className="flex items-center gap-3 mb-4">
           <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
              <ShieldCheck size={24} />
           </div>
           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Merchant Terminal</span>
        </div>
        <h2 className="font-bold text-4xl text-slate-900 tracking-tight mb-2 italic">
          Espace <span className="text-[var(--color-pink)]">Vendeur</span>
        </h2>
        <p className="text-slate-400 text-sm font-medium">
          Accédez à votre tableau de bord sécurisé ThreadLux.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {errors.api && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-100 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <AlertTriangle className="text-red-500 shrink-0" size={18} />
            <p className="text-xs font-bold text-red-600 leading-snug">
              {errors.api}
            </p>
          </div>
        )}

        <Input
          label="Email Professionnel"
          name="email"
          type="email"
          placeholder="vendeur@threadlux.com"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          className="bg-slate-50/50 border-slate-100 focus:bg-white transition-all"
        />

        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Clé d'accès
            </span>
          </div>
          <PasswordInput
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            className="bg-slate-50/50 border-slate-100 focus:bg-white transition-all"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          rightIcon={!loading ? <ArrowRight size={18} /> : undefined}
          className="mt-6 h-14 rounded-2xl shadow-xl shadow-pink-200/50 font-black uppercase tracking-widest text-xs"
        >
          {loading ? "Vérification..." : "S'identifier"}
        </Button>
      </form>

      <div className="mt-12 p-6 rounded-[30px] bg-slate-50 border border-slate-100">
        <p className="text-[10px] font-bold text-slate-400 leading-relaxed text-center uppercase tracking-widest">
           Accès restreint aux comptes marchands vérifiés.<br/>
           <span className="text-slate-300">Système de cryptage AES-256 actif.</span>
        </p>
      </div>
    </AuthLayout>
  );
};

export default AdminLogin;

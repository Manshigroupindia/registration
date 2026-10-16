import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BRAND_ASSETS } from '../../assets/constants';
import { ShieldCheck, Lock, Mail, ArrowLeft, AlertCircle } from 'lucide-react';
import { SEO } from '../../components/common/SEO';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@iconiccreationofgod.com');
  const [password, setPassword] = useState('IconicRoyalAdmin2026!');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmitting(true);

    const res = await login(email, password);
    setSubmitting(false);

    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setErrorMessage(res.error || 'Authentication failed. Please verify administrator credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      <SEO
        title="Admin Portal | Iconic Creation Of God"
        description="Private administrative portal."
        noindex={true}
      />
      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="relative w-full max-w-md bg-surface-container rounded-3xl border border-primary/30 p-space-lg lg:p-space-xl shadow-2xl flex flex-col">
        {/* Emblem & Title */}
        <div className="flex flex-col items-center text-center mb-space-lg">
          <img
            src={BRAND_ASSETS.emblem}
            alt="ICG Crest"
            className="h-12 w-auto object-contain mb-space-sm"
          />
          <h1 className="font-title-lg text-title-lg text-primary uppercase font-bold tracking-wider">
            ICG Secretariat Portal
          </h1>
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest mt-1">
            Executive Authorization Required
          </span>
        </div>

        {errorMessage && (
          <div className="mb-space-md p-space-md rounded-2xl bg-secondary-container text-on-secondary-container font-body-sm text-body-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm uppercase text-outline">
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@iconiccreationofgod.com"
                className="w-full pl-11 pr-space-md py-3 rounded-xl bg-surface-container-high text-on-surface placeholder:text-outline-variant font-body-sm focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30 text-body-md"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-label-sm uppercase text-outline">
              Secretariat Passkey
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-space-md py-3 rounded-xl bg-surface-container-high text-on-surface placeholder:text-outline-variant font-body-sm focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30 text-body-md"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-space-sm w-full py-3.5 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md uppercase font-bold tracking-wider hover:bg-primary shadow-gold-glow transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>{submitting ? 'Verifying Authorization...' : 'Access Secretariat Console'}</span>
          </button>
        </form>

        <div className="mt-space-lg pt-space-md border-t border-surface-variant/40 flex items-center justify-between text-xs text-outline">
          <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Site</span>
          </Link>
          <span>Delhi NCR • 2026</span>
        </div>
      </div>
    </div>
  );
};

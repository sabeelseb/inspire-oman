"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ChevronDown, Send, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCmsSite } from "@/components/CmsProvider";
import FormThankYou from "@/components/FormThankYou";
import SummitRegCategoryPicker from "@/components/SummitRegCategoryPicker";
import { usePastFirstView } from "@/hooks/usePastFirstView";
import { submitToAdmin } from "@/lib/submit-form";
import {
  getSummitRegCategory,
  resolveSummitRegCategories,
  summitRegCategoryLabel,
  type SummitRegCategory,
} from "@/lib/summit-registration";
import {
  EMAIL_PATTERN,
  MIN_TEXT_LENGTH,
  NAME_PATTERN,
  PHONE_MAX_LENGTH,
  PHONE_PATTERN,
  sanitizePhoneInput,
  SUMMIT_THANK_YOU,
  validateContactFields,
  type FieldErrors,
} from "@/lib/form-validation";

const ROLES = [
  "CEO / Business Owner",
  "Investor",
  "Government Official",
  "Corporate Executive",
  "SME Leader",
  "Media",
  "Delegate",
] as const;

const inputClass =
  "w-full px-3.5 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-gold/40 transition-colors";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  role: "CEO / Business Owner",
};

export default function RegisterWidget() {
  const siteConfig = useCmsSite();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const widget = siteConfig.header.registerWidget;
  const enabled = widget?.enabled !== false;
  const hideOnSummit = pathname === "/summit";
  const isHome = pathname === "/";
  const pastFirstView = usePastFirstView(100);

  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [form, setForm] = useState(emptyForm);
  const [category, setCategory] = useState<SummitRegCategory | null>(null);
  const [mounted, setMounted] = useState(false);
  const regCategories = resolveSummitRegCategories(
    siteConfig.registrationCategories,
  );
  const selectedCategory = getSummitRegCategory(
    category,
    siteConfig.registrationCategories,
  );

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!enabled || hideOnSummit || !mounted) return null;

  const label = widget?.label?.trim() || "Register Now";
  const panelTitle = widget?.title?.trim() || "Register for Summit 2026";
  // Home: FAB only after scroll. Other pages: FAB always available.
  const showFab = !open && (!isHome || pastFirstView);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) {
      setErrors({ form: "Please select a registration category first." });
      return;
    }
    const nextErrors = validateContactFields(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const categoryLabel = summitRegCategoryLabel(
      category,
      siteConfig.registrationCategories,
    );
    setSending(true);
    const result = await submitToAdmin("summit", {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone,
      organization: form.organization,
      category,
      role: form.role,
      message: `Summit registration (widget) - ${categoryLabel} - role: ${form.role}`,
    });
    setSending(false);
    if (!result.ok) {
      setErrors({ form: result.error });
      return;
    }
    setOpen(false);
    setSubmitted(true);
    setCategory(null);
    setForm(emptyForm);
  };

  const fieldError = (key: string) =>
    errors[key] ? (
      <p className="mt-1.5 text-xs text-red-400">{errors[key]}</p>
    ) : null;

  return createPortal(
    <>
      <AnimatePresence>
        {showFab ? (
          <motion.button
            key="register-fab"
            type="button"
            onClick={() => setOpen(true)}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 0.78, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 12 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[55] btn-primary shadow-md shadow-gold/20 right-3 bottom-[max(1rem,env(safe-area-inset-bottom))] sm:right-6 sm:bottom-6 min-h-11 px-4 py-2.5 text-sm sm:min-h-0 sm:px-5 sm:py-3 sm:text-base opacity-[0.78] hover:opacity-100 hover:shadow-lg hover:shadow-gold/30 transition-opacity"
            aria-haspopup="dialog"
            aria-expanded={false}
          >
            {label}
          </motion.button>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="register-panel"
            className="fixed inset-0 z-[70] flex items-end justify-end sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            <button
              type="button"
              aria-label="Close register widget"
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={reduceMotion ? false : { opacity: 0, y: 40, x: 0 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 24 }}
              transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-2xl border border-gold/20 bg-primary-dark shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:max-h-[90vh] sm:w-full sm:max-w-md sm:rounded-2xl"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-gold/15 to-transparent"
                aria-hidden
              />

              <div className="relative flex items-start justify-between gap-3 border-b border-white/5 px-5 pb-4 pt-5 sm:px-6">
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/80">
                    Investors Summit
                  </p>
                  <h2 id={titleId} className="text-xl font-bold text-white sm:text-2xl">
                    {panelTitle}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/50">
                    {category
                      ? selectedCategory
                        ? `${selectedCategory.label} · ${selectedCategory.subtitle}`
                        : "Complete your registration details"
                      : "Choose your registration category to continue"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setCategory(null);
                    setErrors({});
                  }}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="relative flex-1 space-y-3.5 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">
                {!category ? (
                  <SummitRegCategoryPicker
                    compact
                    categories={regCategories}
                    value={category}
                    onSelect={(id) => {
                      setCategory(id);
                      setErrors({});
                    }}
                  />
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
                    <button
                      type="button"
                      onClick={() => setCategory(null)}
                      className="inline-flex items-center gap-1.5 text-xs text-white/45 transition-colors hover:text-gold"
                    >
                      <ArrowLeft size={14} />
                      Change category
                    </button>
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        required
                        autoComplete="name"
                        minLength={MIN_TEXT_LENGTH}
                        pattern={NAME_PATTERN.source}
                        title={`Letters only (A-Z), at least ${MIN_TEXT_LENGTH} characters`}
                        value={form.name}
                        onChange={(e) => {
                          setForm({ ...form, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: "" });
                        }}
                        className={inputClass}
                        aria-invalid={Boolean(errors.name)}
                      />
                      {fieldError("name")}
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                        autoComplete="email"
                        pattern={EMAIL_PATTERN.source}
                        title="Valid email like name@example.com"
                        value={form.email}
                        onChange={(e) => {
                          setForm({ ...form, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: "" });
                        }}
                        className={inputClass}
                        aria-invalid={Boolean(errors.email)}
                      />
                      {fieldError("email")}
                    </div>
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        required
                        autoComplete="tel"
                        inputMode="tel"
                        maxLength={PHONE_MAX_LENGTH}
                        pattern={PHONE_PATTERN.source}
                        title="Digits only, optional leading +, max 15 characters"
                        value={form.phone}
                        onChange={(e) => {
                          setForm({
                            ...form,
                            phone: sanitizePhoneInput(e.target.value),
                          });
                          if (errors.phone) setErrors({ ...errors, phone: "" });
                        }}
                        className={inputClass}
                        aria-invalid={Boolean(errors.phone)}
                      />
                      {fieldError("phone")}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="organization"
                        placeholder="Organization"
                        required
                        minLength={MIN_TEXT_LENGTH}
                        title={`At least ${MIN_TEXT_LENGTH} characters`}
                        value={form.organization}
                        onChange={(e) => {
                          setForm({ ...form, organization: e.target.value });
                          if (errors.organization) {
                            setErrors({ ...errors, organization: "" });
                          }
                        }}
                        className={inputClass}
                        aria-invalid={Boolean(errors.organization)}
                      />
                      {fieldError("organization")}
                    </div>
                    <div className="relative">
                      <select
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        className={`${inputClass} appearance-none pr-10`}
                      >
                        {ROLES.map((r) => (
                          <option key={r} value={r} className="bg-primary text-white">
                            {r}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30"
                      />
                    </div>
                    {errors.form ? (
                      <p className="text-sm text-red-400">{errors.form}</p>
                    ) : null}
                    <button type="submit" className="btn-primary w-full" disabled={sending}>
                      {sending ? "Registering..." : label}
                      <Send size={16} className="ml-2" />
                    </button>
                    <p className="text-center text-xs text-white/30">
                      By registering, you agree to receive communications regarding Inspire Oman.
                    </p>
                  </form>
                )}
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <FormThankYou
        open={submitted}
        title={SUMMIT_THANK_YOU.title}
        paragraphs={SUMMIT_THANK_YOU.paragraphs}
        onClose={() => setSubmitted(false)}
        ctaLabel="Done"
      />
    </>,
    document.body
  );
}

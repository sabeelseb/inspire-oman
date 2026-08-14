"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  Users,
  Clock,
  Mic,
  Coffee,
  Star,
  Send,
  ChevronDown,
  ArrowLeft,
  type LucideIcon,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import IslamicPattern from "@/components/IslamicPattern";
import TitleHighlight from "@/components/TitleHighlight";
import FormThankYou from "@/components/FormThankYou";
import SummitRegCategoryPicker from "@/components/SummitRegCategoryPicker";
import { useCmsSite } from "@/components/CmsProvider";
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

const typeColors: Record<string, string> = {
  keynote: "border-l-gold",
  featured: "border-l-gold bg-gold/5",
  session: "border-l-white/20",
  break: "border-l-white/10",
  general: "border-l-white/10",
};

const typeIcons: Record<string, LucideIcon> = {
  keynote: Mic,
  featured: Star,
  session: Users,
  break: Coffee,
  general: Clock,
};

type PageData = {
  eyebrow?: string | null;
  title?: string | null;
  highlight?: string | null;
  subtitle?: string | null;
  registerEyebrow?: string | null;
  registerTitle?: string | null;
  registerTitleHighlight?: string | null;
  registerChooseSubtitle?: string | null;
  registerFormSubtitle?: string | null;
};

type AgendaItem = { time: string; title: string; type: string };
type Speaker = {
  name: string;
  role: string;
  description: string;
  featured: boolean;
};

export default function SummitClient({
  page,
  agenda,
  speakers,
}: {
  page: PageData | null;
  agenda: AgendaItem[];
  speakers: Speaker[];
}) {
  const siteConfig = useCmsSite();
  const [category, setCategory] = useState<SummitRegCategory | null>(null);
  const [regForm, setRegForm] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    role: "CEO / Business Owner",
  });

  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const regCategories = resolveSummitRegCategories(
    siteConfig.registrationCategories,
  );
  const selectedCategory = getSummitRegCategory(
    category,
    siteConfig.registrationCategories,
  );
  const SelectedIcon = selectedCategory?.icon;

  const registerEyebrow = page?.registerEyebrow || "Register";
  const registerTitle = page?.registerTitle || "Secure Your Spot";
  const registerHighlight = page?.registerTitleHighlight || "Spot";
  const registerChooseSubtitle =
    page?.registerChooseSubtitle ||
    "Choose your registration category to continue.";
  const registerFormSubtitle =
    page?.registerFormSubtitle ||
    "Complete your details to confirm your place at the summit.";

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) {
      setErrors({ form: "Please select a registration category first." });
      return;
    }
    const nextErrors = validateContactFields(regForm);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const categoryLabel = summitRegCategoryLabel(
      category,
      siteConfig.registrationCategories,
    );
    setSending(true);
    const result = await submitToAdmin("summit", {
      name: regForm.name.trim(),
      email: regForm.email.trim(),
      phone: regForm.phone,
      organization: regForm.organization,
      category,
      role: regForm.role,
      message: `Summit registration - ${categoryLabel} - role: ${regForm.role}`,
    });
    setSending(false);
    if (!result.ok) {
      setErrors({ form: result.error });
      return;
    }
    setSubmitted(true);
    setCategory(null);
    setRegForm({
      name: "",
      email: "",
      phone: "",
      organization: "",
      role: "CEO / Business Owner",
    });
  };

  const title = page?.title || "Investors Summit 2026";
  const highlight = page?.highlight || "2026";

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-dark-gradient" />
        <IslamicPattern opacity={0.05} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/[0.04] blur-[100px]" />

        <div className="relative site-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-8"
          >
            <CalendarDays size={16} />
            {siteConfig.summitDate}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
          >
            <TitleHighlight title={title} highlight={highlight} />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg max-w-2xl mx-auto mb-8"
          >
            {page?.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 text-white/40 text-sm"
          >
            <MapPin size={16} className="text-gold/60" />
            {siteConfig.venue}
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="site-container">
          <ScrollReveal className="text-center mb-16">
            <p className="io-keynote text-gold text-sm font-semibold uppercase tracking-widest mb-4">
              Programme
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Summit <span className="gold-text">Agenda</span>
            </h2>
          </ScrollReveal>

          <div className="space-y-3">
            {agenda.map((item, i) => {
              const Icon = typeIcons[item.type] || Clock;
              return (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div
                    className={`glass-card p-5 border-l-4 ${
                      typeColors[item.type] || typeColors.general
                    } flex items-center gap-4`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-gold" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">{item.title}</p>
                    </div>
                    <p className="text-gold/70 text-sm font-medium shrink-0">{item.time}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary-light relative">
        <IslamicPattern opacity={0.03} />
        <div className="relative site-container">
          <ScrollReveal className="text-center mb-16">
            <p className="io-keynote text-gold text-sm font-semibold uppercase tracking-widest mb-4">
              Speakers
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Inspiring <span className="gold-text">Voices</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {speakers.map((speaker, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className={`glass-card-hover p-6 text-center h-full flex flex-col items-center ${
                    speaker.featured ? "border-gold/30 gold-glow" : ""
                  }`}
                >
                  {speaker.featured && (
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-semibold mb-4">
                      <Star size={10} /> FEATURED
                    </div>
                  )}
                  <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <Mic size={28} className="text-gold/40" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{speaker.name}</h3>
                  <p className="text-gold/70 text-sm mb-3">{speaker.role}</p>
                  <p className="text-white/40 text-sm flex-1">{speaker.description}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding" id="register">
        <div className="site-container">
          <div className="mx-auto w-full max-w-5xl">
            <ScrollReveal className="text-center mb-12">
              <p className="io-keynote text-gold text-sm font-semibold uppercase tracking-widest mb-4">
                {registerEyebrow}
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                <TitleHighlight
                  title={registerTitle}
                  highlight={registerHighlight}
                />
              </h2>
              <p className="text-white/50">
                {category ? registerFormSubtitle : registerChooseSubtitle}
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <AnimatePresence mode="wait">
                {!category ? (
                  <motion.div
                    key="category-step"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <SummitRegCategoryPicker
                      categories={regCategories}
                      value={category}
                      onSelect={(id) => {
                        setCategory(id);
                        setErrors({});
                      }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="form-step"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="mx-auto w-full max-w-3xl"
                  >
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setCategory(null)}
                        className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-gold"
                      >
                        <ArrowLeft size={16} />
                        Change category
                      </button>
                      {selectedCategory && SelectedIcon ? (
                        <div className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-3.5 py-1.5 text-xs font-semibold text-gold">
                          <SelectedIcon size={14} />
                          {selectedCategory.label} · {selectedCategory.subtitle}
                        </div>
                      ) : null}
                    </div>

                    <form
                      onSubmit={handleRegister}
                      className="glass-card space-y-5 border-gold/15 p-8"
                      noValidate
                    >
                      <div className="grid gap-5 sm:grid-cols-2">
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
                            value={regForm.name}
                            onChange={(e) => {
                              setRegForm({ ...regForm, name: e.target.value });
                              if (errors.name) setErrors({ ...errors, name: "" });
                            }}
                            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/30 transition-colors focus:border-gold/40 focus:outline-none"
                            aria-invalid={Boolean(errors.name)}
                          />
                          {errors.name ? (
                            <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                          ) : null}
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
                            value={regForm.email}
                            onChange={(e) => {
                              setRegForm({ ...regForm, email: e.target.value });
                              if (errors.email) setErrors({ ...errors, email: "" });
                            }}
                            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/30 transition-colors focus:border-gold/40 focus:outline-none"
                            aria-invalid={Boolean(errors.email)}
                          />
                          {errors.email ? (
                            <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                          ) : null}
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
                            value={regForm.phone}
                            onChange={(e) => {
                              setRegForm({
                                ...regForm,
                                phone: sanitizePhoneInput(e.target.value),
                              });
                              if (errors.phone) setErrors({ ...errors, phone: "" });
                            }}
                            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/30 transition-colors focus:border-gold/40 focus:outline-none"
                            aria-invalid={Boolean(errors.phone)}
                          />
                          {errors.phone ? (
                            <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>
                          ) : null}
                        </div>
                        <div>
                          <input
                            type="text"
                            name="organization"
                            placeholder="Organization"
                            required
                            minLength={MIN_TEXT_LENGTH}
                            title={`At least ${MIN_TEXT_LENGTH} characters`}
                            value={regForm.organization}
                            onChange={(e) => {
                              setRegForm({ ...regForm, organization: e.target.value });
                              if (errors.organization) {
                                setErrors({ ...errors, organization: "" });
                              }
                            }}
                            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/30 transition-colors focus:border-gold/40 focus:outline-none"
                            aria-invalid={Boolean(errors.organization)}
                          />
                          {errors.organization ? (
                            <p className="mt-1.5 text-xs text-red-400">
                              {errors.organization}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <div className="relative">
                        <select
                          value={regForm.role}
                          onChange={(e) =>
                            setRegForm({ ...regForm, role: e.target.value })
                          }
                          className="w-full appearance-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3.5 text-sm text-white transition-colors focus:border-gold/40 focus:outline-none"
                        >
                          {[
                            "CEO / Business Owner",
                            "Investor",
                            "Government Official",
                            "Corporate Executive",
                            "SME Leader",
                            "Media",
                            "Delegate",
                          ].map((r) => (
                            <option key={r} value={r} className="bg-primary text-white">
                              {r}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={16}
                          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/30"
                        />
                      </div>
                      {errors.form ? (
                        <p className="text-sm text-red-400">{errors.form}</p>
                      ) : null}
                      <button type="submit" className="btn-primary w-full" disabled={sending}>
                        {sending ? "Registering..." : "Register Now"}
                        <Send size={16} className="ml-2" />
                      </button>
                      <p className="text-center text-xs text-white/30">
                        By registering, you agree to receive communications regarding
                        Inspire Oman.
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <FormThankYou
        open={submitted}
        title={SUMMIT_THANK_YOU.title}
        paragraphs={SUMMIT_THANK_YOU.paragraphs}
        onClose={() => setSubmitted(false)}
        ctaLabel="Done"
      />
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  Braces,
  CalendarDays,
  CarFront,
  Check,
  ChevronRight,
  Gauge,
  Instagram,
  MapPin,
  Menu,
  Paintbrush,
  Phone,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

import heroImage from "../assets/aq-hero.jpg";
import diagnosticsImage from "../assets/aq-diagnostics.jpg";
import bodyworkImage from "../assets/aq-bodywork.jpg";
import performanceImage from "../assets/aq-performance.jpg";
import craftImage from "../assets/aq-craft.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "European Auto Repair NYC | AQ Prestige" },
      {
        name: "description",
        content:
          "European performance tuning, auto repair, diagnostics, and body work in Long Island City, NY.",
      },
      { property: "og:title", content: "AQ Prestige Euro Performance" },
      {
        property: "og:description",
        content: "Precision performance, repair, and body work for European vehicles in Long Island City.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  { icon: Braces, number: "01", title: "Advanced Diagnostics", text: "Factory-level scanning and methodical fault isolation for complex European systems." },
  { icon: Wrench, number: "02", title: "Engine Repair", text: "Precision mechanical repairs, cooling systems, drivetrains, and complete engine care." },
  { icon: Gauge, number: "03", title: "Performance Tuning", text: "Purpose-built ECU calibration and performance upgrades shaped around your goals." },
  { icon: Paintbrush, number: "04", title: "Body Shop & Paint", text: "Collision repair, panel restoration, exacting color match, and premium refinishing." },
  { icon: SlidersHorizontal, number: "05", title: "Brake & Suspension", text: "Confident stopping, precise handling, alignments, and road-ready chassis setup." },
  { icon: ShieldCheck, number: "06", title: "Scheduled Maintenance", text: "Proactive, model-specific service that protects performance and long-term value." },
];

const projects = [
  { image: performanceImage, title: "Performance Setup", category: "Tuning · Suspension" },
  { image: bodyworkImage, title: "Factory-Finish Restoration", category: "Body · Paint" },
  { image: diagnosticsImage, title: "Electrical Diagnosis", category: "Diagnostics · Repair" },
  { image: craftImage, title: "Chassis Precision", category: "Brakes · Dynamics" },
];

const testimonials = [
  { quote: "The attention to detail was exceptional. Everything was explained clearly and the car came back feeling completely dialed in.", service: "Performance service" },
  { quote: "A meticulous finish and a refreshingly professional process from estimate through delivery. The bodywork looks factory new.", service: "Body repair" },
  { quote: "They found the issue other shops missed and walked me through every step before the work began. Exactly the level of care I wanted.", service: "Diagnostics" },
];

function Brand() {
  return (
    <a href="#top" className="group flex min-w-0 items-center gap-3" aria-label="AQ Prestige home">
      <span className="grid size-10 shrink-0 place-items-center border border-champagne/60 font-display text-sm font-bold text-champagne transition-colors group-hover:bg-champagne group-hover:text-background">AQ</span>
      <span className="min-w-0 leading-none">
        <span className="block truncate font-display text-sm font-semibold uppercase text-foreground sm:text-base">Prestige</span>
        <span className="mt-1 block truncate text-[9px] uppercase tracking-[0.22em] text-muted-foreground sm:text-[10px]">Euro Performance</span>
      </span>
    </a>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [review, setReview] = useState(0);
  const [formMode, setFormMode] = useState<"appointment" | "quote">("appointment");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (lightbox === null) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", close);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  const selectMode = (mode: "appointment" | "quote") => {
    setFormMode(mode);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setError("Please complete the required fields before sending.");
      form.reportValidity();
      return;
    }
    setError("");
    setSubmitted(true);
    form.reset();
  };

  return (
    <main id="top" className="overflow-x-clip bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto grid h-20 max-w-[1480px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:flex sm:justify-between sm:px-8 lg:px-12">
          <Brand />
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {[["Services", "services"], ["Expertise", "expertise"], ["Work", "work"], ["Reviews", "reviews"], ["Contact", "contact"]].map(([label, id]) => (
              <a key={id} href={`#${id}`} className="text-sm text-muted-foreground transition-colors hover:text-champagne">{label}</a>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <button onClick={() => selectMode("appointment")} className="hidden min-h-11 items-center bg-champagne px-5 font-display text-sm font-semibold text-primary-foreground transition-colors hover:bg-champagne-bright sm:inline-flex">Book service</button>
            <button onClick={() => setMenuOpen((open) => !open)} className="grid size-11 place-items-center border border-border text-foreground transition-colors hover:border-champagne hover:text-champagne lg:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-border bg-background px-5 py-5 lg:hidden" aria-label="Mobile navigation">
            {["Services", "Expertise", "Work", "Reviews", "Contact"].map((label) => (
              <a key={label} href={`#${label.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="flex min-h-12 items-center justify-between border-b border-border text-sm text-foreground">
                {label}<ChevronRight size={16} className="text-champagne" />
              </a>
            ))}
          </nav>
        )}
      </header>

      <section className="relative flex min-h-[760px] items-end pt-20 lg:min-h-[850px]">
        <img src={heroImage} alt="Graphite European sports car in a precision workshop" width={1920} height={1088} className="absolute inset-0 size-full object-cover object-[68%_center]" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto w-full max-w-[1480px] px-5 pb-14 sm:px-8 lg:px-12 lg:pb-20">
          <div className="max-w-4xl animate-rise">
            <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-champagne"><span className="h-px w-10 bg-champagne" /> Long Island City · New York</p>
            <h1 className="max-w-[950px] font-display text-5xl font-semibold leading-[0.92] text-foreground sm:text-7xl lg:text-[6.75rem]">
              European care.<br /><span className="text-champagne">Without compromise.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-foreground/70 sm:text-lg">Performance tuning, mechanical repair, and body craftsmanship for the cars that demand more.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => selectMode("appointment")} className="inline-flex min-h-13 items-center justify-center gap-3 bg-champagne px-6 font-display text-sm font-semibold text-primary-foreground transition-colors hover:bg-champagne-bright">Book an appointment <ArrowDownRight size={18} /></button>
              <button onClick={() => selectMode("quote")} className="inline-flex min-h-13 items-center justify-center gap-3 border border-foreground/30 bg-background/35 px-6 font-display text-sm font-semibold text-foreground backdrop-blur-md transition-colors hover:border-champagne hover:text-champagne">Get a body work quote <ArrowDownRight size={18} /></button>
            </div>
          </div>
          <div className="mt-14 grid max-w-3xl grid-cols-1 border-y border-foreground/15 sm:grid-cols-3 sm:divide-x sm:divide-foreground/15">
            {["European vehicle focus", "Precision diagnostics", "Repair, body & performance"].map((item, index) => <p key={item} className="flex items-center gap-3 py-4 text-xs uppercase tracking-[0.12em] text-foreground/60 sm:px-5 first:pl-0"><span className="text-champagne">0{index + 1}</span>{item}</p>)}
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-20 bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
          <SectionHeading eyebrow="01 — Capability" title="One shop. Every discipline." text="From a warning light to a complete performance build, every service follows the same measured standard." />
          <div className="mt-12 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, number, title, text }) => (
              <article key={title} className="group min-h-[270px] border-b border-r border-border p-7 transition-colors hover:bg-champagne hover:text-primary-foreground lg:p-9">
                <div className="flex items-center justify-between"><Icon size={25} strokeWidth={1.5} className="text-champagne transition-colors group-hover:text-primary-foreground" /><span className="font-display text-xs text-muted-foreground group-hover:text-primary-foreground/60">{number}</span></div>
                <h3 className="mt-12 font-display text-2xl font-medium">{title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground transition-colors group-hover:text-primary-foreground/75">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="expertise" className="scroll-mt-20 bg-background py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1480px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:px-12">
          <div className="lg:col-span-5">
            <p className="section-kicker">02 — Why AQ</p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl">Specialists in the machines we admire.</h2>
            <p className="mt-6 max-w-lg leading-7 text-muted-foreground">European cars reward exact knowledge. Our approach combines marque-aware diagnostics, disciplined workmanship, and honest recommendations built around how you use your vehicle.</p>
            <div className="mt-10 space-y-5">
              {["European vehicle expertise", "State-of-the-art diagnostic equipment", "Careful documentation and transparent communication"].map((item) => <div key={item} className="flex items-center gap-4 border-t border-border pt-5"><span className="grid size-7 place-items-center border border-champagne text-champagne"><Check size={15} /></span><span className="text-sm text-foreground/80">{item}</span></div>)}
            </div>
          </div>
          <div className="relative lg:col-span-7 lg:pl-10">
            <img src={diagnosticsImage} alt="Technician performing advanced European vehicle diagnostics" loading="lazy" width={1200} height={900} className="aspect-[4/3] w-full object-cover" />
            <div className="absolute -bottom-6 left-0 max-w-xs bg-champagne p-6 text-primary-foreground lg:left-2"><p className="font-display text-2xl font-semibold">Measure first.</p><p className="mt-1 text-sm text-primary-foreground/75">Every recommendation begins with evidence.</p></div>
          </div>
        </div>
      </section>

      <section className="bg-champagne py-5 text-primary-foreground" aria-label="Vehicle specialties">
        <div className="marquee-row font-display text-sm font-semibold uppercase tracking-[0.18em]">
          {Array.from({ length: 2 }).flatMap(() => ["BMW", "Mercedes-Benz", "Audi", "Porsche", "Volkswagen", "Exotic Cars"]).map((brand, i) => <span key={`${brand}-${i}`} className="flex shrink-0 items-center gap-8"><span>{brand}</span><span className="text-primary-foreground/35">◆</span></span>)}
        </div>
      </section>

      <section id="work" className="scroll-mt-20 bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
          <SectionHeading eyebrow="03 — Selected work" title="Craft, in the details." text="A closer look at the disciplines behind a properly finished car." />
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
            {projects.map((project, index) => (
              <button key={project.title} onClick={() => setLightbox(index)} className={`group relative overflow-hidden text-left ${index === 0 || index === 3 ? "lg:col-span-7" : "lg:col-span-5"}`} aria-label={`Open ${project.title} project image`}>
                <img src={project.image} alt={project.title} loading="lazy" width={1200} height={900} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gallery-overlay p-5">
                  <span><span className="block font-display text-lg font-semibold text-foreground">{project.title}</span><span className="mt-1 block text-xs uppercase tracking-[0.15em] text-foreground/55">{project.category}</span></span>
                  <span className="grid size-10 place-items-center border border-foreground/30 text-foreground transition-colors group-hover:border-champagne group-hover:text-champagne"><ArrowDownRight size={18} /></span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="scroll-mt-20 bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4"><p className="section-kicker">04 — Client perspective</p><h2 className="mt-5 font-display text-4xl font-semibold sm:text-5xl">Trust is built in the process.</h2><p className="mt-5 text-sm text-muted-foreground">Sample testimonials shown until verified customer reviews are supplied.</p></div>
            <div className="lg:col-span-8">
              <div className="border-l border-champagne pl-6 sm:pl-10">
                <div className="flex gap-1 text-champagne" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, i) => <Sparkles key={i} size={15} fill="currentColor" />)}</div>
                <blockquote className="mt-8 font-display text-2xl leading-snug text-foreground sm:text-4xl">“{testimonials[review].quote}”</blockquote>
                <p className="mt-7 text-xs uppercase tracking-[0.18em] text-muted-foreground">Sample client · {testimonials[review].service}</p>
              </div>
              <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
                <span className="font-display text-sm text-muted-foreground">0{review + 1} / 0{testimonials.length}</span>
                <div className="flex gap-2"><button onClick={() => setReview((review - 1 + testimonials.length) % testimonials.length)} className="grid size-11 place-items-center border border-border text-foreground transition-colors hover:border-champagne hover:text-champagne" aria-label="Previous review"><ArrowLeft size={18} /></button><button onClick={() => setReview((review + 1) % testimonials.length)} className="grid size-11 place-items-center bg-champagne text-primary-foreground transition-colors hover:bg-champagne-bright" aria-label="Next review"><ArrowRight size={18} /></button></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="section-kicker">05 — Start a conversation</p>
              <h2 className="mt-5 font-display text-4xl font-semibold sm:text-5xl">Your car deserves a clear plan.</h2>
              <p className="mt-6 max-w-md leading-7 text-muted-foreground">Tell us what your vehicle needs. This preview form confirms your request on screen; delivery will be connected once your preferred contact channel is supplied.</p>
              <div className="mt-9 space-y-5">
                <a href="https://www.google.com/maps/search/?api=1&query=11-11+36th+Ave+Long+Island+City+NY+11106" target="_blank" rel="noreferrer" className="flex gap-4 border-t border-border pt-5 text-foreground transition-colors hover:text-champagne"><MapPin size={20} className="mt-0.5 shrink-0 text-champagne" /><span><span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground">Visit</span><span className="mt-1 block text-sm">11-11 36th Ave, Long Island City, NY 11106</span></span></a>
                <div className="flex gap-4 border-t border-border pt-5"><Phone size={20} className="mt-0.5 shrink-0 text-champagne" /><span><span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground">Call</span><span className="mt-1 block text-sm text-muted-foreground">Phone number to be added</span></span></div>
                <div className="flex gap-4 border-t border-border pt-5"><CalendarDays size={20} className="mt-0.5 shrink-0 text-champagne" /><span><span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground">Hours</span><span className="mt-1 block text-sm text-muted-foreground">Business hours to be added</span></span></div>
              </div>
              <a href="https://www.google.com/maps/search/?api=1&query=11-11+36th+Ave+Long+Island+City+NY+11106" target="_blank" rel="noreferrer" className="map-panel mt-9 flex aspect-[16/8] items-end border border-border p-5" aria-label="Open AQ Prestige location in Google Maps"><span className="flex w-full items-center justify-between bg-background/90 p-4 text-sm backdrop-blur"><span>Open in Google Maps</span><ArrowRight size={18} className="text-champagne" /></span></a>
            </div>

            <div className="border border-border bg-background p-6 sm:p-9 lg:col-span-7">
              <div className="grid grid-cols-2 border border-border p-1">
                <button onClick={() => { setFormMode("appointment"); setSubmitted(false); }} className={`min-h-11 px-3 text-sm font-semibold transition-colors ${formMode === "appointment" ? "bg-champagne text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>Appointment</button>
                <button onClick={() => { setFormMode("quote"); setSubmitted(false); }} className={`min-h-11 px-3 text-sm font-semibold transition-colors ${formMode === "quote" ? "bg-champagne text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>Body work quote</button>
              </div>
              {submitted ? (
                <div className="flex min-h-[430px] flex-col items-center justify-center text-center" role="status"><span className="grid size-14 place-items-center border border-champagne text-champagne"><Check size={25} /></span><h3 className="mt-6 font-display text-2xl font-semibold">Request prepared.</h3><p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">Thanks. This demo does not send submissions yet; contact delivery can be connected when your business phone or email is ready.</p><button onClick={() => setSubmitted(false)} className="mt-7 border-b border-champagne pb-1 text-sm text-champagne">Send another request</button></div>
              ) : (
                <form onSubmit={submitForm} className="mt-8 space-y-5" noValidate>
                  <div className="grid gap-5 sm:grid-cols-2"><Field label="Full name" name="name" placeholder="Your name" required /><Field label="Phone or email" name="contact" placeholder="Best way to reach you" required /></div>
                  <div className="grid gap-5 sm:grid-cols-2"><Field label="Vehicle" name="vehicle" placeholder="Year, make, model" required /><label className="block"><span className="form-label">Service</span><select name="service" className="form-field" defaultValue={formMode === "quote" ? "Body Shop & Paint" : "Advanced Diagnostics"}>{services.map((service) => <option key={service.title}>{service.title}</option>)}</select></label></div>
                  <label className="block"><span className="form-label">Tell us what the car needs</span><textarea name="details" required maxLength={1000} rows={5} className="form-field resize-none" placeholder={formMode === "quote" ? "Describe the damage or body work needed" : "Describe the issue, goal, or service needed"} /></label>
                  <div className="grid gap-5 sm:grid-cols-2"><Field label="Preferred date" name="date" type="date" required /><label className="block"><span className="form-label">Preferred contact</span><select name="preference" className="form-field"><option>Phone call</option><option>Text message</option><option>Email</option></select></label></div>
                  {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
                  <button type="submit" className="flex min-h-13 w-full items-center justify-center gap-3 bg-champagne px-6 font-display text-sm font-semibold text-primary-foreground transition-colors hover:bg-champagne-bright">{formMode === "quote" ? "Prepare quote request" : "Request appointment"}<ArrowRight size={18} /></button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-[1480px] px-5 py-12 sm:px-8 lg:px-12">
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
            <div><Brand /><p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">European performance tuning, mechanical repair, and premium body work in Long Island City.</p></div>
            <div><p className="footer-heading">Navigate</p><div className="mt-4 grid gap-3 text-sm text-muted-foreground">{["Services", "Expertise", "Work", "Reviews", "Contact"].map((label) => <a key={label} href={`#${label.toLowerCase()}`} className="transition-colors hover:text-champagne">{label}</a>)}</div></div>
            <div><p className="footer-heading">Location</p><p className="mt-4 text-sm leading-6 text-muted-foreground">11-11 36th Ave<br />Long Island City, NY 11106</p><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="mt-5 grid size-10 place-items-center border border-border text-muted-foreground transition-colors hover:border-champagne hover:text-champagne"><Instagram size={18} /></a></div>
          </div>
          <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><span>© 2026 AQ Prestige Euro Performance</span><span>Built for drivers who notice the details.</span></div>
        </div>
      </footer>

      {lightbox !== null && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background/95 p-4 backdrop-blur" role="dialog" aria-modal="true" aria-label={`${projects[lightbox].title} gallery image`} onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute right-5 top-5 grid size-11 place-items-center border border-border text-foreground transition-colors hover:border-champagne hover:text-champagne" aria-label="Close gallery"><X size={20} /></button>
          <figure className="max-w-5xl" onClick={(event) => event.stopPropagation()}><img src={projects[lightbox].image} alt={projects[lightbox].title} width={1200} height={900} className="max-h-[78vh] w-full object-contain" /><figcaption className="mt-4 flex items-center justify-between"><span className="font-display text-lg">{projects[lightbox].title}</span><span className="text-xs uppercase tracking-[0.15em] text-champagne">{projects[lightbox].category}</span></figcaption></figure>
        </div>
      )}
    </main>
  );
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <div className="grid gap-6 lg:grid-cols-2 lg:items-end"><div><p className="section-kicker">{eyebrow}</p><h2 className="mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl">{title}</h2></div><p className="max-w-lg leading-7 text-muted-foreground lg:justify-self-end">{text}</p></div>;
}

function Field({ label, name, placeholder, type = "text", required = false }: { label: string; name: string; placeholder?: string; type?: string; required?: boolean }) {
  return <label className="block"><span className="form-label">{label}</span><input type={type} name={name} placeholder={placeholder} required={required} maxLength={150} className="form-field" /></label>;
}
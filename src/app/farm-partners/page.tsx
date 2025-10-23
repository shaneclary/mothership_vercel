// src/app/farm-partners/page.tsx
"use client";

import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

type Farm = {
  name: string;
  location: string;
  since?: string;
  categories: ("Produce" | "Dairy" | "Meat" | "Grains" | "Herbs" | "Eggs")[];
  practices: string[];
  blurb?: string;
  image?: string; // URL
  featured?: boolean;
};

const FEATURED_FARMS: Farm[] = [
  {
    name: "Moonrise Acres",
    location: "Templeton, CA",
    since: "Supplying Mothership with organic vegetables since 2023.",
    categories: ["Produce", "Herbs"],
    practices: ["Regenerative", "Organic", "No-til", "Irrigation-smart"],
    blurb:
      "&ldquo;We plant with intention, harvest at sunrise, and send our best to Mothership — because every new mother deserves food that feels alive.&rdquo;",
    image: "/images/farms/moonrise-acres.jpg",
    featured: true,
  },
  {
    name: "Gold Ridge Creamery",
    location: "Petaluma, CA",
    since: "Supplying Mothership with pasture-raised dairy since 2024.",
    categories: ["Dairy"],
    practices: ["Grass-fed", "Humane", "Low-temp pasteurization"],
    blurb:
      "&ldquo;Slow milk, slow cultures, slow aging. Slowness is a love language — and mothers deserve the most tender care.&rdquo;",
    image: "/images/farms/gold-ridge-creamery.jpg",
    featured: true,
  },
];

const ALL_FARMS: Farm[] = [
  ...FEATURED_FARMS,
  {
    name: "Riverbend Ranch",
    location: "San Luis Obispo, CA",
    categories: ["Meat", "Eggs"],
    practices: ["Pasture-raised", "Rotational grazing", "No antibiotics"],
    image: "/images/farms/riverbend-ranch.jpg",
  },
  {
    name: "Carmel Valley Greens",
    location: "Carmel Valley, CA",
    categories: ["Produce"],
    practices: ["Organic", "Heirloom cultivars", "Biodiversity corridors"],
    image: "/images/farms/carmel-valley-greens.jpg",
  },
  {
    name: "Seaside Grains",
    location: "Santa Cruz, CA",
    categories: ["Grains"],
    practices: ["Stone-milled", "Heritage wheat", "Low-input"],
    image: "/images/farms/seaside-grains.jpg",
  },
];

export default function FarmPartnersPage() {
  // Basic controlled state for forms (you can replace with react-hook-form if preferred)
  const [applyForm, setApplyForm] = useState({
    contactName: "",
    email: "",
    phone: "",
    farmName: "",
    location: "",
    acreage: "",
    categories: [] as string[],
    practices: "",
    intent: "",
    website: "",
    instagram: "",
  });

  const [nominateForm, setNominateForm] = useState({
    yourName: "",
    yourEmail: "",
    farmName: "",
    farmContact: "",
    why: "",
  });

  const onApplyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setApplyForm((s) => ({ ...s, [name]: value }));
  };

  const onNominateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNominateForm((s) => ({ ...s, [name]: value }));
  };

  const toggleCategory = (cat: string) => {
    setApplyForm((s) => {
      const has = s.categories.includes(cat);
      return { ...s, categories: has ? s.categories.filter((c) => c !== cat) : [...s.categories, cat] };
    });
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to /api/farms/apply (POST) or external (Airtable/Notion/Email)
    // console.log("Apply payload:", applyForm);
    alert("Thanks! We received your farm application and will be in touch soon.");
  };

  const handleNominateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to /api/farms/nominate (POST)
    // console.log("Nomination payload:", nominateForm);
    alert("Thank you for the nomination! We&apos;ll reach out to this farm.");
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/60 to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <h1 className="font-cedarville text-4xl sm:text-5xl lg:text-6xl tracking-tight text-stone-900">
            Farm Partners
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-7 text-stone-700">
            At Mothership, we believe nourishment begins long before a meal reaches your table.
            It starts in the soil — in the hands of farmers who care deeply for the earth, the
            animals, and the people they feed.
          </p>
          <p className="mt-3 max-w-3xl text-lg leading-7 text-stone-700">
            Every farm we partner with shares our commitment to transparency, regenerative
            practices, and food raised with love. Together, we form a circle of care — farmers
            nourishing mothers, mothers nourishing families, and families nourishing the future.
          </p>
          <blockquote className="mt-6 border-l-4 border-emerald-600 pl-4 text-stone-800 italic">
            &quot;From the ground to the cradle — every bite tells a story of care.&quot;
          </blockquote>
        </div>
      </section>

      {/* Standards */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <h2 className="font-cedarville text-3xl lg:text-4xl text-stone-900">Our Standards of Integrity</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Regenerative & Sustainable", "Prioritizing soil health, biodiversity, and closed-loop systems."],
            ["Humane Animal Care", "Respecting natural rhythms; pasture-raised, never rushed or confined."],
            ["Pure Ingredients", "No industrial seed oils (including canola) or synthetic additives."],
            ["Local & Seasonal", "California-grown, uplifting small and family farms."],
            ["Transparent & Traceable", "Open about practices, pricing, and impact."],
            ["Women-Led & Family-Owned", "Honoring matriarchs and traditions of care wherever possible."],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-cedarville text-xl text-stone-900">{title}</h3>
              <p className="mt-2 text-stone-700">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured farms */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <h2 className="font-cedarville text-3xl lg:text-4xl text-stone-900">Featured Partners</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {FEATURED_FARMS.map((farm) => (
            <article
              key={farm.name}
              className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-[16/9] w-full bg-stone-100">
                {farm.image ? (
                  // Replace with next/image in your codebase
                  <img src={farm.image} alt={farm.name} className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div className="p-6">
                <h3 className="font-cedarville text-2xl text-stone-900">{farm.name}</h3>
                <p className="text-stone-600">{farm.location}</p>
                {farm.blurb && (
                  <blockquote className="mt-4 border-l-4 border-emerald-600 pl-4 text-stone-800 italic">
                    {farm.blurb}
                  </blockquote>
                )}
                {farm.since && (
                  <p className="mt-3 text-sm text-stone-600">{farm.since}</p>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  {farm.categories.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-emerald-600/30 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* All farms grid */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-cedarville text-3xl lg:text-4xl text-stone-900">Our Partner Network</h2>
          {/* Optional: add a Download PDF/Map link here */}
        </div>
        <p className="mt-2 max-w-3xl text-stone-700">
          These are the trusted farms that help us nourish mothers throughout California. Every one
          is visited, vetted, and honored for their devotion to clean, regenerative food.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ALL_FARMS.map((farm) => (
            <div
              key={farm.name}
              className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-stone-100">
                {farm.image ? (
                  <img src={farm.image} alt={farm.name} className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div className="mt-4">
                <h3 className="font-cedarville text-xl text-stone-900">{farm.name}</h3>
                <p className="text-stone-600">{farm.location}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {farm.categories.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-stone-300 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-800"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Apply form */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 md:p-10">
          <h2 className="font-cedarville text-3xl lg:text-4xl text-stone-900">Apply to Become a Partner</h2>
          <p className="mt-2 max-w-3xl text-stone-800">
            Are you a farmer, rancher, or producer who shares our values of integrity and nourishment?
            We&apos;d love to learn about your work and explore how we can serve mothers and families together.
          </p>

          <form onSubmit={handleApplySubmit} className="mt-8 grid gap-6 md:grid-cols-2">
            <Input label="Your Name" name="contactName" value={applyForm.contactName} onChange={onApplyChange} required />
            <Input type="email" label="Email" name="email" value={applyForm.email} onChange={onApplyChange} required />
            <Input label="Phone" name="phone" value={applyForm.phone} onChange={onApplyChange} />
            <Input label="Farm/Ranch Name" name="farmName" value={applyForm.farmName} onChange={onApplyChange} required />
            <Input label="Location (City, State)" name="location" value={applyForm.location} onChange={onApplyChange} required />
            <Input label="Acreage (approx.)" name="acreage" value={applyForm.acreage} onChange={onApplyChange} />

            <fieldset className="md:col-span-2">
              <legend className="mb-2 block text-sm font-medium text-stone-900">Product Categories</legend>
              <div className="flex flex-wrap gap-3">
                {["Produce", "Dairy", "Meat", "Grains", "Herbs", "Eggs"].map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={
                      "rounded-full border px-3 py-1 text-sm " +
                      (applyForm.categories.includes(cat)
                        ? "border-emerald-600 bg-emerald-100 text-emerald-900"
                        : "border-stone-300 bg-white text-stone-800 hover:bg-stone-50")
                    }
                    aria-pressed={applyForm.categories.includes(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </fieldset>

            <Textarea
              label="Practices (e.g., regenerative, pasture-raised, biodynamic)"
              name="practices"
              value={applyForm.practices}
              onChange={onApplyChange}
              required
            />
            <Textarea
              label="Statement of Intent (how your work supports mothers & families)"
              name="intent"
              value={applyForm.intent}
              onChange={onApplyChange}
              required
            />

            <Input label="Website" name="website" value={applyForm.website} onChange={onApplyChange} />
            <Input label="Instagram" name="instagram" value={applyForm.instagram} onChange={onApplyChange} />

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full md:w-auto rounded-full bg-stone-900 px-6 py-3 text-white hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Nominate form */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:py-20">
        <div className="rounded-3xl border border-stone-200 bg-white p-6 md:p-10 shadow-sm">
          <h2 className="font-cedarville text-3xl lg:text-4xl text-stone-900">Nominate a Farm</h2>
          <p className="mt-2 max-w-3xl text-stone-800">
            Many of our best connections start with word of mouth — one mother sharing with another.
            If you know a local farm that embodies honesty, sustainability, and heart, we&apos;d love to hear about them.
          </p>

          <form onSubmit={handleNominateSubmit} className="mt-8 grid gap-6 md:grid-cols-2">
            <Input label="Your Name" name="yourName" value={nominateForm.yourName} onChange={onNominateChange} required />
            <Input type="email" label="Your Email" name="yourEmail" value={nominateForm.yourEmail} onChange={onNominateChange} required />
            <Input label="Farm Name" name="farmName" value={nominateForm.farmName} onChange={onNominateChange} required />
            <Input label="Farm Contact (email or phone)" name="farmContact" value={nominateForm.farmContact} onChange={onNominateChange} />
            <Textarea
              className="md:col-span-2"
              label="Why are you nominating this farm?"
              name="why"
              value={nominateForm.why}
              onChange={onNominateChange}
              required
            />
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full md:w-auto rounded-full bg-emerald-700 px-6 py-3 text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              >
                Submit Nomination
              </button>
            </div>
          </form>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}

// ----- UI helpers -----

type InputProps = {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  required?: boolean;
  className?: string;
};

function Input({ label, name, value, onChange, type = "text", required, className }: InputProps) {
  return (
    <label className={`block ${className || ""}`}>
      <span className="mb-2 block text-sm font-medium text-stone-900">{label}{required ? " *" : ""}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-300"
      />
    </label>
  );
}

type TextareaProps = {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  required?: boolean;
  className?: string;
};

function Textarea({ label, name, value, onChange, required, className }: TextareaProps) {
  return (
    <label className={`block ${className || ""}`}>
      <span className="mb-2 block text-sm font-medium text-stone-900">{label}{required ? " *" : ""}</span>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={5}
        className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-300"
      />
    </label>
  );
}

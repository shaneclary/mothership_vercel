"use client";

import Link from "next/link";
import { useAppStore } from "@/lib/store";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function WelcomePage() {
  const user = useAppStore((state) => state.user);
  const firstName = user?.firstName || "friend";

  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main className="text-stone-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 to-ivory">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <h1 className="font-cedarville text-5xl sm:text-6xl lg:text-7xl tracking-tight">
            Welcome to Mothership
          </h1>
          <p className="mt-4 text-lg text-stone-700">
            You&apos;ve joined a circle that nourishes you as you nourish your family.
          </p>
          <p className="mt-3 text-base text-stone-700">
            We&apos;re so glad you&apos;re here. Mothership was created by mothers, for mothers —
            a place where food, care, and community meet.
          </p>
          <p className="mt-2 text-base text-stone-700">
            Your membership helps support small farms, regenerative practices, and the
            postpartum wellness movement.
          </p>
        </div>
      </section>

      {/* Promise */}
      <section className="mx-auto max-w-5xl px-6 py-16 text-center">
        <h2 className="font-cedarville text-3xl lg:text-4xl text-stone-900 mb-6">Our Promise</h2>
        <blockquote className="mx-auto max-w-3xl border-l-4 border-emerald-600 pl-4 text-lg italic text-stone-800">
          &ldquo;We exist to make sure every mother feels nourished, rested, and supported — body,
          mind, and spirit.&rdquo;
        </blockquote>
        <p className="mt-4 text-stone-700">
          Our meals are made with love from local farms, time-honored traditions, and ingredients chosen for deep healing.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {[
            ["🌱", "Regenerative & local sourcing"],
            ["🍲", "Warming, nutrient-dense meals"],
            ["💛", "Designed for recovery & vitality"],
            ["🌸", "Rooted in ancient postpartum care"],
          ].map(([icon, text]) => (
            <div
              key={text}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl">{icon}</div>
              <p className="mt-2 text-stone-700">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Next steps */}
      <section className="mx-auto max-w-5xl px-6 py-16 text-center">
        <h2 className="font-cedarville text-3xl lg:text-4xl">Here&apos;s what to do next</h2>
        <ol className="mt-6 space-y-3 text-left text-stone-700 sm:text-lg mx-auto max-w-2xl">
          <li>1. <strong>Set your preferences:</strong> Choose your meal plan and delivery schedule.</li>
          <li>2. <strong>Meet your farms:</strong> Explore the farmers and producers behind your food.</li>
          <li>3. <strong>Join the circle:</strong> Connect with other mothers for tips, support, and inspiration.</li>
          <li>4. <strong>Rest easy:</strong> We&apos;ll handle the rest — nourishing you with care and consistency.</li>
        </ol>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/meals"
            className="rounded-full bg-stone-900 px-8 py-3 text-white hover:bg-stone-800 transition font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            Set Your Meal Plan →
          </Link>
          <Link
            href="/farm-partners"
            className="rounded-full bg-emerald-700 px-8 py-3 text-white hover:bg-emerald-600 transition font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            Explore Our Farms →
          </Link>
        </div>
      </section>

      {/* Community */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="bg-emerald-50 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="font-cedarville text-3xl lg:text-4xl">Connect with the Community</h2>
          <p className="mt-4 text-stone-700 max-w-2xl mx-auto">
            The Mothership is more than a meal service — it&apos;s a living network of care.
            You&apos;ll find stories, postpartum wisdom, and shared experiences that remind you:
            you&apos;re never alone.
          </p>
          <Link
            href="/portal/community"
            className="mt-8 inline-block rounded-full bg-emerald-700 px-8 py-3 text-white hover:bg-emerald-600 transition font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            Visit the Community Hub →
          </Link>
        </div>
      </section>

      {/* Closing */}
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <p className="text-lg text-stone-700">
          Thank you for trusting us to be part of your journey.
        </p>
        <p className="mt-2 font-cedarville text-3xl text-stone-900">Welcome aboard — your nourishment has already begun.</p>
        <p className="mt-4 text-stone-700">With love,</p>
        <p className="text-xl font-cedarville text-stone-900">The Mothership Team 💛</p>
      </section>
      </main>
      <Footer />
    </div>
  );
}

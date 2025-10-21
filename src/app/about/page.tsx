import Image from 'next/image'
import Link from 'next/link'
import { Heart, Sparkles, ArrowRight, Award, Book, Beaker } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function AboutPage() {
  return (
    <>
      <Header />

      <div style={{ backgroundColor: '#F9F6F1' }}>
        {/* Hero Section - Modern gradient design */}
        <section className="relative py-24 overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-cream to-blush opacity-60" />

          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sage-green rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blush rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center animate-fade-in-up">
            <div className="inline-flex items-center backdrop-blur-xl bg-sage-green/10 border border-sage-green/20 px-6 py-3 rounded-full mb-8 shadow-lg">
              <Heart className="w-5 h-5 text-sage-green mr-2" />
              <span className="text-sage-green font-semibold text-sm uppercase tracking-wider">Our Story</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-8 font-cedarville text-sage-green">
              Our Story
            </h1>
            <p className="text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Where neuroscience meets nourishment — a chef&apos;s journey from the laboratory
              to the postpartum kitchen.
            </p>
          </div>
        </section>

        {/* Founder Image Section - Enhanced with glass effect */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="group relative h-[700px] overflow-hidden rounded-3xl shadow-2xl border-4 border-white hover:shadow-sage-green/20 transition-all duration-500 bg-gradient-to-b from-sage-green/5 to-cream">
            <Image
              src="/images/founder_Monika_Knapp.PNG"
              alt="Monika Knapp, Founder of Mothership"
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-700"
              priority
            />
            {/* Gradient overlay - removed for contain */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-40" />

            {/* Caption */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className="backdrop-blur-2xl bg-white/90 rounded-2xl p-6 shadow-2xl">
                <p className="text-xl font-bold text-charcoal">Monika Knapp</p>
                <p className="text-sage-green font-semibold">Founder & Chef</p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section - The Journey */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4 font-cedarville text-sage-green">
                The Journey
              </h2>
              <p className="text-xl text-gray-600">From research to craft to motherhood</p>
            </div>

            {/* Timeline Item 1 */}
            <div className="relative mb-16 group">
              <div className="absolute left-8 top-12 bottom-0 w-0.5 bg-gradient-to-b from-sage-green to-transparent hidden md:block" />

              <div className="backdrop-blur-xl bg-white/90 rounded-3xl p-8 md:p-12 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 md:ml-20">
                <div className="absolute -left-6 top-8 w-16 h-16 rounded-full bg-gradient-to-br from-sage-green to-sage-700 flex items-center justify-center shadow-xl hidden md:flex">
                  <Beaker className="w-8 h-8 text-white" />
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="md:hidden w-12 h-12 rounded-full bg-gradient-to-br from-sage-green to-sage-700 flex items-center justify-center shadow-lg">
                    <Beaker className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-charcoal">A Scientist&apos;s Journey</h3>
                </div>

                <div className="prose prose-lg max-w-none text-gray-700 space-y-6 leading-relaxed">
                  <p>
                    Before Mothership, there was a laboratory bench at the University of Pennsylvania&apos;s Smell & Taste Center,
                    where Monika Knapp studied the intricate pathways through which the human brain interprets flavor. Long before
                    she understood the profound metabolic demands of postpartum recovery, she was mapping the neural architecture
                    of taste perception — measuring threshold sensitivities, documenting chemoreceptor responses, understanding how
                    a single volatile compound could unlock memory, emotion, comfort.
                  </p>

                  <p>
                    This was not research divorced from lived experience. It was, she would come to understand, preparation.
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative mb-16 group">
              <div className="absolute left-8 top-12 bottom-0 w-0.5 bg-gradient-to-b from-sage-green to-transparent hidden md:block" />

              <div className="backdrop-blur-xl bg-white/90 rounded-3xl p-8 md:p-12 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 md:ml-20">
                <div className="absolute -left-6 top-8 w-16 h-16 rounded-full bg-gradient-to-br from-terracotta to-red-600 flex items-center justify-center shadow-xl hidden md:flex">
                  <Award className="w-8 h-8 text-white" />
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="md:hidden w-12 h-12 rounded-full bg-gradient-to-br from-terracotta to-red-600 flex items-center justify-center shadow-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-charcoal">The Craft of Fermentation</h3>
                </div>

                <div className="prose prose-lg max-w-none text-gray-700 space-y-6 leading-relaxed">
                  <p>
                    Armed with a B.A. in Biological Basis of Behavior, with minors in Psychology and Sociology, Monika brought
                    her scientific training into the kitchen, founding Colony Culture — a sourdough microbakery in Atascadero, California,
                    where the principles of microbiology, fermentation kinetics, and enzymatic transformation became the foundation of her
                    craft. Each loaf of naturally leavened bread was an experiment in controlled wildness: wild yeasts and lactobacilli
                    converting starches into acids and gases, creating structure, aroma, and that complex interplay of tang and sweetness
                    that could only arise from patient observation and deep understanding of microbial ecology.
                  </p>

                  <p>
                    She learned to taste with precision — to identify the bright acidity of acetic acid versus the mellow roundness of
                    lactic acid, to distinguish the caramelized notes of Maillard reactions from the fruity esters produced during fermentation.
                    Her work with seasonal, locally sourced ingredients from California&apos;s Central Coast became a study in terroir and time,
                    each batch of dough a living system responding to temperature, hydration, and the invisible microbiome of her hands and workspace.
                  </p>
                </div>
              </div>
            </div>

            {/* Turning Point - Pull Quote */}
            <div className="relative mb-16">
              <div className="backdrop-blur-2xl bg-gradient-to-br from-sage-green/20 to-blush/20 rounded-3xl p-12 border-l-8 border-sage-green shadow-2xl">
                <Sparkles className="w-12 h-12 text-sage-green mb-6 animate-pulse" />
                <p className="text-3xl md:text-4xl font-bold text-charcoal italic leading-relaxed">
                  And then she became a mother.
                </p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative mb-16 group">
              <div className="absolute left-8 top-12 bottom-0 w-0.5 bg-gradient-to-b from-sage-green to-transparent hidden md:block" />

              <div className="backdrop-blur-xl bg-white/90 rounded-3xl p-8 md:p-12 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 md:ml-20">
                <div className="absolute -left-6 top-8 w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-xl hidden md:flex">
                  <Heart className="w-8 h-8 text-white" />
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="md:hidden w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-charcoal">The First Forty Days</h3>
                </div>

                <div className="prose prose-lg max-w-none text-gray-700 space-y-6 leading-relaxed">
                  <p>
                    Pregnancy initiated a cascade of physiological changes that Monika observed with both wonder and scientific curiosity.
                    Her body was orchestrating an extraordinary feat of biological engineering — building new tissue, expanding blood volume
                    by nearly fifty percent, recalibrating hormonal systems, preparing for the metabolic marathon of childbirth and lactation.
                    The research she consumed during those months revealed an entire culinary tradition she had somehow missed in all her years
                    of training: the science of postpartum nourishment.
                  </p>

                  <p>
                    She discovered <em>The First Forty Days</em> by Heng Ou, and suddenly, ancient wisdom and modern physiology aligned with
                    crystalline clarity. The warming soups, the bone broths rich with glycine and proline for tissue repair, the gentle spices
                    that stimulated circulation without overtaxing digestion, the easily digestible grains that provided sustained energy without
                    inflammatory load — these weren&apos;t merely comfort foods. They were precisely calibrated interventions, developed over millennia,
                    designed to support a body engaged in the profound work of recovery and milk production.
                  </p>
                </div>
              </div>
            </div>

            {/* Another Pull Quote */}
            <div className="relative mb-16">
              <div className="backdrop-blur-2xl bg-gradient-to-br from-blush/30 to-cream/30 rounded-3xl p-12 border-l-8 border-terracotta shadow-2xl">
                <p className="text-2xl md:text-3xl font-semibold text-charcoal italic leading-relaxed">
                  When her own postpartum period arrived, Monika wanted nothing more than to remain in bed, cocooned in warmth, nourished
                  by these precise, healing foods. But circumstances — as they so often do — had other plans.
                </p>
              </div>
            </div>

            {/* Timeline Item 4 - Mothership */}
            <div className="relative group">
              <div className="backdrop-blur-xl bg-gradient-to-br from-sage-green via-sage-600 to-sage-700 rounded-3xl p-8 md:p-12 shadow-2xl text-white hover:shadow-sage-green/30 transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center shadow-xl">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold">Mothership: Showing Up for Others</h3>
                </div>

                <div className="prose prose-lg prose-invert max-w-none space-y-6 leading-relaxed">
                  <p className="text-white/95">
                    The gap between what her body needed and what she could access in those early weeks became the founding principle of Mothership.
                    As a chef trained in the careful observation of fermentation and flavor, as a scientist who understood the neurochemistry of
                    nourishment, Monika recognized that she could show up for other mothers in the way she wished someone had shown up for her.
                  </p>

                  <p className="text-white/95">
                    Mothership emerged from this dual expertise: the precision of laboratory method and the intuition of culinary craft. Every meal
                    is designed with the same rigor she once brought to her research at Penn&apos;s Smell & Taste Center.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Science Section - Modern card grid */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4 font-cedarville text-sage-green">
                The Science of Postpartum Nourishment
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Monika&apos;s approach is grounded in key principles, each supported by both traditional practice and modern research
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Warming Foods for Circulation",
                  description: "Ginger, cinnamon, turmeric, and black pepper contain compounds that stimulate circulation and possess anti-inflammatory properties. These warming spices support a body working to heal from the physical demands of childbirth.",
                  icon: "🔥",
                  gradient: "from-orange-500 to-red-600"
                },
                {
                  title: "Bone Broths for Tissue Repair",
                  description: "Long-simmered bone broths are rich in collagen, gelatin, glycine, and proline — amino acids essential for connective tissue repair and gut lining integrity.",
                  icon: "🍲",
                  gradient: "from-sage-green to-sage-700"
                },
                {
                  title: "Easily Digestible Nutrition",
                  description: "Monika designs meals that are nutrient-dense yet gentle: slow-cooked stews where proteins are partially broken down, fermented foods rich in beneficial bacteria.",
                  icon: "🥣",
                  gradient: "from-pink-500 to-rose-600"
                },
                {
                  title: "Lactation Support",
                  description: "Traditional galactagogues — fenugreek, fennel, oats, brewer's yeast, flaxseed — appear throughout Mothership's menu, thoughtfully incorporated to support milk production.",
                  icon: "🌿",
                  gradient: "from-green-500 to-green-700"
                }
              ].map((principle, index) => (
                <div
                  key={index}
                  className="group backdrop-blur-xl bg-white/90 rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${principle.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <span className="text-4xl">{principle.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-charcoal mb-4 group-hover:text-sage-green transition-colors">
                    {principle.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4">
            <div className="backdrop-blur-2xl bg-white/80 rounded-3xl p-12 md:p-16 shadow-2xl border border-white/20">
              <div className="text-center mb-12">
                <div className="inline-block p-4 rounded-full bg-gradient-to-br from-sage-green to-sage-700 mb-6">
                  <Book className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-5xl font-bold mb-6 font-cedarville text-sage-green">
                  A Philosophy of Care
                </h2>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700 space-y-8 leading-relaxed">
                <p className="text-xl">
                  If there is a through line in Monika&apos;s work — from the Smell & Taste Center to Colony Culture to Mothership — it is this:
                  an understanding that nourishment is both biochemical and deeply human.
                </p>

                <div className="backdrop-blur-xl bg-sage-green/10 rounded-2xl p-8 border-l-4 border-sage-green">
                  <p className="text-lg italic text-charcoal">
                    &ldquo;Food, prepared with attention and knowledge, can be a form of medicine. Each mother&apos;s recovery is unique. Each body has its own timeline, its own needs, its own relationship to food and comfort.&rdquo;
                  </p>
                </div>

                <p className="text-xl font-semibold text-sage-green">
                  Mothership exists because Monika Knapp knows, from both scientific training and lived experience, that the fourth trimester
                  is not an afterthought. It is a critical window of recovery, adaptation, and transformation. And every mother deserves to
                  be nourished through it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action - Modern gradient design */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-sage-green via-sage-600 to-sage-700" />

          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
            <div className="mb-8">
              <div className="inline-block p-4 rounded-full bg-white/20 backdrop-blur-xl mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-5xl font-bold mb-6 font-cedarville">
                Join Our Community
              </h2>
              <p className="text-2xl text-white/90 leading-relaxed">
                Let us nourish you through your postpartum journey, just as Monika wished she had been nourished through hers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/meals"
                className="group bg-white text-sage-green px-10 py-5 rounded-full font-semibold text-lg hover:bg-white/95 hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl flex items-center justify-center gap-2"
              >
                Explore Our Meals
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="backdrop-blur-xl bg-white/20 border-2 border-white text-white px-10 py-5 rounded-full font-semibold text-lg hover:bg-white hover:text-sage-green hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}

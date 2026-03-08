import Image from 'next/image';
import Link from 'next/link';
import { BrandLogo } from '@/components/BrandLogo';
import { LeadForm } from '@/components/LeadForm';

const trustItems = [
  { title: 'Étude confidentielle', icon: 'shield' },
  { title: 'Réponse rapide', icon: 'flash' },
  { title: 'Interlocuteur direct', icon: 'user' },
  { title: 'Dossier complétable en plusieurs temps', icon: 'stack' }
];

const steps = [
  'Vous renseignez les informations essentielles du bien',
  'Nous analysons votre dossier',
  'Vous pouvez compléter les documents maintenant ou plus tard'
];

const advantages = [
  'Dépôt rapide en quelques minutes',
  'Étude ciblée Paris & première couronne',
  'Analyse de biens libres ou occupés',
  'Transmission des documents possible à tout moment'
];

function Icon({ name }: { name: 'shield' | 'flash' | 'user' | 'stack' }) {
  const base = 'h-5 w-5 text-[#0B1F3A]';

  if (name === 'shield') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={base}>
        <path d="M12 3 5 6v6c0 4.8 2.9 7.9 7 9 4.1-1.1 7-4.2 7-9V6l-7-3Z" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (name === 'flash') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={base}>
        <path d="M13 2 6 13h5l-1 9 8-12h-5l0-8Z" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (name === 'user') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={base}>
        <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M5.5 19c1.8-3 4-4.5 6.5-4.5S16.7 16 18.5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={base}>
      <rect x="4" y="5" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <rect x="4" y="10" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <rect x="4" y="15" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="bg-white text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <BrandLogo compact />
          <a
            href="#formulaire"
            className="rounded-xl bg-[#0B1F3A] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#112b4f]"
          >
            Déposer mon bien
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#0B1F3A] via-[#112b4f] to-[#0B1F3A] p-8 text-white shadow-[0_30px_80px_-45px_rgba(11,31,58,0.95)] md:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#F4C542]">VMM – VendreMesMurs.fr</p>
              <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
                Vendez vos murs commerciaux simplement
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-200 md:text-lg">
                Déposez les informations essentielles de votre bien en quelques instants. Les documents et éléments
                complémentaires peuvent être transmis dès maintenant ou dans un second temps.
              </p>
              <p className="mt-5 text-sm text-slate-300">Un projet développé par Vendremesmurs@gmail.com</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#formulaire"
                  className="rounded-xl bg-[#F4C542] px-6 py-3 text-center text-sm font-bold text-[#0B1F3A] transition hover:bg-[#f8d46f]"
                >
                  Déposer mon bien
                </a>
                <a
                  href="#comment-ca-marche"
                  className="rounded-xl border border-white/30 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  En savoir plus
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                <BrandLogo />
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/20">
                <Image
                  src="/images/hero-building.svg"
                  alt="Illustration de murs commerciaux premium"
                  width={900}
                  height={600}
                  className="h-auto w-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-center font-serif text-3xl text-[#0B1F3A]">Un accompagnement premium et confidentiel</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="inline-flex rounded-lg bg-[#F4C542]/25 p-2">
                  <Icon name={item.icon} />
                </div>
                <p className="mt-4 text-sm font-semibold text-[#0B1F3A]">{item.title}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="comment-ca-marche" className="mt-14 rounded-3xl border border-slate-200 bg-[#f7f8fb] p-8 md:p-10">
          <h2 className="font-serif text-3xl text-[#0B1F3A]">Comment ça marche</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Étape {index + 1}</p>
                <p className="mt-3 text-sm font-medium text-[#0B1F3A]">{step}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-3xl border border-slate-200 bg-white p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div>
              <h2 className="font-serif text-3xl text-[#0B1F3A]">Pourquoi choisir VMM</h2>
              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {advantages.map((advantage) => (
                  <article key={advantage} className="rounded-2xl border border-slate-200 bg-[#f7f8fb] p-6 shadow-sm">
                    <p className="text-sm font-semibold text-[#0B1F3A]">{advantage}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <Image
                src="/images/investment-report.svg"
                alt="Illustration d'analyse d'investissement immobilier"
                width={900}
                height={560}
                className="h-auto w-full"
              />
            </div>
          </div>
        </section>

        <section id="formulaire" className="mt-14">
          <LeadForm />
        </section>

        <section className="mt-14 rounded-3xl border border-slate-200 bg-[#f7f8fb] p-8 text-center md:p-12">
          <h2 className="font-serif text-3xl text-[#0B1F3A]">Vous souhaitez céder vos murs commerciaux ?</h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
            Transmettez-nous les informations essentielles de votre bien pour une première étude rapide et confidentielle.
          </p>
          <a
            href="#formulaire"
            className="mt-7 inline-block rounded-xl bg-[#0B1F3A] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#112b4f]"
          >
            Déposer mon bien
          </a>
        </section>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <BrandLogo compact />
            <p className="mt-3 text-sm text-slate-600">VMM – VendreMesMurs.fr</p>
            <p className="text-sm text-slate-600">Vendremesmurs@gmail.com</p>
            <p className="text-sm text-slate-600">Paris & Première couronne</p>
          </div>
          <div className="flex items-end gap-6 text-sm font-medium text-[#0B1F3A] md:justify-end">
            <Link href="/mentions-legales" className="hover:underline">
              Mentions légales
            </Link>
            <Link href="/politique-de-confidentialite" className="hover:underline">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

import Link from 'next/link';
import { BrandLogo } from '@/components/BrandLogo';

export default function MerciPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-12 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl bg-gradient-to-br from-[#0B1F3A] via-[#112b4f] to-[#0B1F3A] p-8 text-white shadow-[0_30px_80px_-45px_rgba(11,31,58,0.95)] md:p-10">
          <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
            <BrandLogo />
          </div>

          <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#F4C542]">Confirmation</p>
            <h1 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">
              Votre demande a bien été envoyée. Nous reviendrons vers vous rapidement.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-200 md:text-base">
              Vous pourrez transmettre les documents complémentaires dans un second temps.
            </p>

            <Link
              href="/"
              className="mt-7 inline-flex rounded-xl bg-[#F4C542] px-6 py-3 text-sm font-bold text-[#0B1F3A] transition hover:bg-[#f8d46f]"
            >
              Retour à l’accueil
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

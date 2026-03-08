import Link from 'next/link';

type BrandLogoProps = {
  compact?: boolean;
};

export function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <Link href="/" className="inline-flex items-center gap-3" aria-label="VMM - VendreMesMurs.fr">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#0B1F3A] text-sm font-extrabold tracking-[0.08em] text-[#F4C542] shadow-md">
        VMM
      </span>
      <span className="flex flex-col">
        <span className="text-sm font-bold tracking-[0.08em] text-[#0B1F3A]">VendreMesMurs.fr</span>
        {!compact ? <span className="text-xs text-slate-500">Un projet développé par Vendremesmurs@gmail.com</span> : null}
      </span>
    </Link>
  );
}

'use client';

import { FormEvent, useState } from 'react';
import { trackGoogleAdsConversion } from '@/lib/gtag';

type YesNo = 'oui' | 'non';
type Sector = 'paris' | 'premiere-couronne';
type Occupancy = 'libre' | 'occupé';

export function LeadForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const [sector, setSector] = useState<Sector>('paris');
  const [hasBasement, setHasBasement] = useState<YesNo>('non');
  const [hasUpperFloor, setHasUpperFloor] = useState<YesNo>('non');
  const [hasApartment, setHasApartment] = useState<YesNo>('non');
  const [occupancyStatus, setOccupancyStatus] = useState<Occupancy>('libre');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setIsError(false);

    try {
      const formElement = event.currentTarget;
      const payload = new FormData(formElement);

      const response = await fetch('/api/leads', {
        method: 'POST',
        body: payload
      });

      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'envoi.");
      }

      formElement.reset();
      setSector('paris');
      setHasBasement('non');
      setHasUpperFloor('non');
      setHasApartment('non');
      setOccupancyStatus('libre');
      setMessage(
        data.message ||
          'Votre demande a bien été envoyée. Si vous le souhaitez, vous pourrez nous transmettre les documents ou informations complémentaires dans un second temps.'
      );
      trackGoogleAdsConversion();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Une erreur est survenue.');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0B1F3A] focus:ring-4 focus:ring-[#0B1F3A]/10';
  const labelClass = 'text-sm font-semibold text-[#0B1F3A]';
  const sectionClass = 'mt-6 rounded-2xl border border-slate-200 bg-[#f7f8fb] p-4 md:p-6';
  const fileClass = `${inputClass} file:mr-4 file:rounded-md file:border-0 file:bg-[#0B1F3A] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-[#112b4f]`;

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_50px_-30px_rgba(11,31,58,0.45)] md:p-8">
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Formulaire propriétaire</p>
        <h2 className="font-serif text-2xl text-[#0B1F3A] md:text-3xl">Déposer mon bien</h2>
        <p className="text-sm text-slate-600">Seules les informations essentielles sont requises. Vous pourrez compléter votre dossier ensuite.</p>
      </div>

      <fieldset className={sectionClass}>
        <legend className="px-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Section 1 — Localisation du bien</legend>
        <div className="mt-2 grid gap-5 md:grid-cols-2">
          <label className={`${labelClass} md:col-span-2`}>
            Adresse complète *
            <input required name="fullAddress" className={inputClass} placeholder="12 rue de la République, 75002 Paris" />
          </label>

          <label className={labelClass}>
            Secteur *
            <select name="sector" value={sector} onChange={(e) => setSector(e.target.value as Sector)} className={inputClass}>
              <option value="paris">Paris</option>
              <option value="premiere-couronne">Banlieue</option>
            </select>
          </label>

          {sector === 'premiere-couronne' ? (
            <label className={labelClass}>
              Ville *
              <input required name="city" className={inputClass} placeholder="Boulogne-Billancourt" />
            </label>
          ) : null}
        </div>
      </fieldset>

      <fieldset className={sectionClass}>
        <legend className="px-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Section 2 — Surfaces</legend>
        <div className="mt-2 grid gap-5 md:grid-cols-2">
          <label className={labelClass}>
            Surface du RDC (m²) *
            <input required min={1} step="0.01" type="number" name="groundFloorArea" className={inputClass} placeholder="120" />
          </label>

          <label className={labelClass}>
            Sous-sol présent ?
            <select name="hasBasement" value={hasBasement} onChange={(e) => setHasBasement(e.target.value as YesNo)} className={inputClass}>
              <option value="oui">Oui</option>
              <option value="non">Non</option>
            </select>
          </label>

          {hasBasement === 'oui' ? (
            <label className={labelClass}>
              Surface du sous-sol (m²)
              <input min={0} step="0.01" type="number" name="basementArea" className={inputClass} placeholder="80" />
            </label>
          ) : null}

          <label className={labelClass}>
            Étage présent ?
            <select name="hasUpperFloor" value={hasUpperFloor} onChange={(e) => setHasUpperFloor(e.target.value as YesNo)} className={inputClass}>
              <option value="oui">Oui</option>
              <option value="non">Non</option>
            </select>
          </label>

          {hasUpperFloor === 'oui' ? (
            <label className={labelClass}>
              Surface de l&apos;étage (m²)
              <input min={0} step="0.01" type="number" name="upperFloorArea" className={inputClass} placeholder="60" />
            </label>
          ) : null}

          <label className={labelClass}>
            Appartement inclus ?
            <select name="hasApartment" value={hasApartment} onChange={(e) => setHasApartment(e.target.value as YesNo)} className={inputClass}>
              <option value="oui">Oui</option>
              <option value="non">Non</option>
            </select>
          </label>

          {hasApartment === 'oui' ? (
            <label className={labelClass}>
              Surface de l&apos;appartement (m²)
              <input min={0} step="0.01" type="number" name="apartmentArea" className={inputClass} placeholder="45" />
            </label>
          ) : null}
        </div>
      </fieldset>

      <fieldset className={sectionClass}>
        <legend className="px-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Section 3 — Situation locative</legend>
        <div className="mt-2 grid gap-5 md:grid-cols-2">
          <label className={labelClass}>
            Le bien est-il libre ou occupé ? *
            <select
              name="occupancyStatus"
              value={occupancyStatus}
              onChange={(e) => setOccupancyStatus(e.target.value as Occupancy)}
              className={inputClass}
            >
              <option value="libre">Libre</option>
              <option value="occupé">Occupé</option>
            </select>
          </label>

          <div className={`${labelClass} md:col-span-2`}>
            <p>Le fonds de commerce est-il également à vendre ?</p>
            <div className="mt-3 flex gap-6">
              <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                <input type="radio" name="isBusinessAlsoForSale" value="oui" className="h-4 w-4" /> Oui
              </label>
              <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                <input type="radio" name="isBusinessAlsoForSale" value="non" className="h-4 w-4" /> Non
              </label>
            </div>
          </div>

          {occupancyStatus === 'occupé' ? (
            <label className={labelClass}>
              Loyer annuel hors charges *
              <input required min={0} step="0.01" type="number" name="annualRentExclCharges" className={inputClass} placeholder="98000" />
            </label>
          ) : null}

          {occupancyStatus === 'occupé' ? (
            <label className={labelClass}>
              Activité du locataire
              <input name="tenantActivity" className={inputClass} placeholder="Restauration, équipement, etc." />
            </label>
          ) : null}

          {occupancyStatus === 'occupé' ? (
            <label className={labelClass}>
              Date de fin de bail
              <input type="date" name="leaseEndDate" className={inputClass} />
            </label>
          ) : null}

          <label className={labelClass}>
            Charges annuelles
            <input min={0} step="0.01" type="number" name="annualCharges" className={inputClass} placeholder="5400" />
          </label>

          <label className={labelClass}>
            Taxe foncière
            <input min={0} step="0.01" type="number" name="propertyTax" className={inputClass} placeholder="7100" />
          </label>

          <p className="md:col-span-2 rounded-xl border border-[#F4C542]/30 bg-[#F4C542]/10 px-4 py-3 text-xs text-slate-700">
            Si vous ne disposez pas immédiatement de ces informations, vous pourrez nous les transmettre ultérieurement.
          </p>
        </div>
      </fieldset>

      <fieldset className={sectionClass}>
        <legend className="px-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Section 4 — Documents</legend>
        <p className="mb-4 text-xs text-slate-600">
          Vous pouvez transmettre ces documents dès maintenant ou dans un second temps. Leur absence n’empêche pas l’envoi de votre demande.
        </p>
        <div className="mt-2 grid gap-5 md:grid-cols-2">
          <label className={labelClass}>
            Bail commercial
            <input type="file" name="commercialLeaseFile" className={fileClass} />
          </label>

          <label className={labelClass}>
            Taxe foncière
            <input type="file" name="propertyTaxFile" className={fileClass} />
          </label>

          <label className={labelClass}>
            Plans
            <input type="file" name="plansFile" className={fileClass} />
          </label>

          <label className={labelClass}>
            Photos
            <input type="file" name="photosFile" className={fileClass} />
          </label>

          <label className={`${labelClass} md:col-span-2`}>
            Autres documents
            <input type="file" name="otherDocumentsFile" className={fileClass} />
          </label>
        </div>
      </fieldset>

      <fieldset className={sectionClass}>
        <legend className="px-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Section 5 — Informations complémentaires</legend>
        <label className={labelClass}>
          Informations complémentaires sur le bien
          <textarea
            name="additionalInfo"
            rows={5}
            className={inputClass}
            placeholder="Merci de préciser toute information utile concernant le bien : état du local, travaux à prévoir, situation du locataire, extraction, copropriété, etc."
          />
        </label>
      </fieldset>

      <fieldset className={sectionClass}>
        <legend className="px-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Section 6 — Coordonnées du propriétaire</legend>
        <div className="mt-2 grid gap-5 md:grid-cols-2">
          <label className={labelClass}>
            Nom *
            <input required name="ownerName" className={inputClass} placeholder="Jean Dupont" />
          </label>

          <label className={labelClass}>
            Téléphone *
            <input required name="ownerPhone" className={inputClass} placeholder="06 12 34 56 78" />
          </label>

          <label className={`${labelClass} md:col-span-2`}>
            Email *
            <input required type="email" name="ownerEmail" className={inputClass} placeholder="jean@email.com" />
          </label>
        </div>
      </fieldset>

      <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-slate-600">En soumettant, vous acceptez d’être recontacté par notre équipe VMM.</p>
        <div className="flex flex-col items-start md:items-end">
          <p className="mt-[10px] text-[#dc2626] font-medium text-sm">
            Si le formulaire ne s’envoie pas, veuillez retirer les documents ajoutés et envoyer la demande sans fichiers.
            Nous vous les demanderons lorsque nous vous recontacterons.
          </p>
          <button
            type="submit"
            disabled={loading}
            className="mt-3 rounded-xl bg-[#0B1F3A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#112b4f] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Envoi en cours...' : 'Envoyer ma demande'}
          </button>
        </div>
      </div>

      {message ? (
        <p className={`mt-5 rounded-xl px-4 py-3 text-sm ${isError ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}

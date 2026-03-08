import nodemailer from 'nodemailer';
import { LeadInput } from '@/lib/lead-schema';

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Variable d'environnement manquante: ${name}`);
  }
  return value;
}

export async function sendLeadNotification(lead: LeadInput): Promise<void> {
  const host = requiredEnv('SMTP_HOST');
  const port = Number(requiredEnv('SMTP_PORT'));
  const user = requiredEnv('SMTP_USER');
  const pass = requiredEnv('SMTP_PASS');
  const from = requiredEnv('EMAIL_FROM');
  const to = requiredEnv('EMAIL_TO');

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });

  await transporter.sendMail({
    from,
    to,
    subject: 'Nouveau lead - VMM VendreMesMurs.fr',
    text: `
Nouveau dossier propriétaire (VMM)

SECTION 1 — Localisation du bien
Adresse complète: ${lead.fullAddress}
Secteur: ${lead.sector === 'premiere-couronne' ? 'Première couronne' : 'Paris'}
Ville: ${lead.city ?? 'N/A'}

SECTION 2 — Surfaces
Surface du RDC: ${lead.groundFloorArea} m²
Sous-sol présent: ${lead.hasBasement}
Surface du sous-sol: ${lead.basementArea ?? 'N/A'} m²
Étage présent: ${lead.hasUpperFloor}
Surface de l'étage: ${lead.upperFloorArea ?? 'N/A'} m²
Appartement inclus: ${lead.hasApartment}
Surface de l'appartement: ${lead.apartmentArea ?? 'N/A'} m²

SECTION 3 — Situation locative
Statut: ${lead.occupancyStatus}
Loyer annuel hors charges: ${lead.annualRentExclCharges ?? 'N/A'}
Activité du locataire: ${lead.tenantActivity ?? 'N/A'}
Date de fin de bail: ${lead.leaseEndDate ?? 'N/A'}
Charges annuelles: ${lead.annualCharges ?? 'N/A'}
Taxe foncière: ${lead.propertyTax ?? 'N/A'}

SECTION 4 — Documents
Bail commercial: ${lead.commercialLeaseFile ?? 'Non transmis'}
Taxe foncière: ${lead.propertyTaxFile ?? 'Non transmise'}
Plans: ${lead.plansFile ?? 'Non transmis'}
Photos: ${lead.photosFile ?? 'Non transmises'}
Autres documents: ${lead.otherDocumentsFile ?? 'Non transmis'}

SECTION 5 — Informations complémentaires
${lead.additionalInfo ?? 'Aucune information complémentaire'}

SECTION 6 — Coordonnées du propriétaire
Nom: ${lead.ownerName}
Téléphone: ${lead.ownerPhone}
Email: ${lead.ownerEmail}
    `.trim()
  });
}

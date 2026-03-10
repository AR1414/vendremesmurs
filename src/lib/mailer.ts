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
  const to = requiredEnv('NOTIFICATION_EMAIL');

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });

  await transporter.sendMail({
    from: user,
    to,
    subject: 'Nouvelle demande VMM - Murs commerciaux',
    text: `
Nouvelle demande reçue :

Nom : ${lead.ownerName}
Téléphone : ${lead.ownerPhone}
Email : ${lead.ownerEmail}

Adresse complète : ${lead.fullAddress}
Secteur : ${lead.sector}
Ville : ${lead.city || 'Non renseignée'}
Surface du RDC : ${lead.groundFloorArea}
Statut d'occupation : ${lead.occupancyStatus}
Fonds de commerce également à vendre : ${lead.isBusinessAlsoForSale || 'Non renseigné'}
Loyer annuel hors charges : ${lead.annualRentExclCharges ?? 'Non renseigné'}
Activité du locataire : ${lead.tenantActivity || 'Non renseignée'}
Date de fin de bail : ${lead.leaseEndDate || 'Non renseignée'}
Charges annuelles : ${lead.annualCharges ?? 'Non renseigné'}
Taxe foncière : ${lead.propertyTax ?? 'Non renseigné'}

Informations complémentaires :
${lead.additionalInfo || 'Aucune'}

Documents (liens si disponibles) :
- Bail commercial : ${lead.commercialLeaseFile || 'Non transmis'}
- Taxe foncière : ${lead.propertyTaxFile || 'Non transmis'}
- Plans : ${lead.plansFile || 'Non transmis'}
- Photos : ${lead.photosFile || 'Non transmises'}
- Autres documents : ${lead.otherDocumentsFile || 'Non transmis'}
    `.trim()
  });
}

import { z } from 'zod';

const optionalNumber = z.preprocess(
  (value) => {
    if (value === '' || value === null || value === undefined) {
      return undefined;
    }
    return value;
  },
  z.coerce.number().nonnegative('Valeur invalide.').optional()
);

const optionalDate = z
  .string()
  .optional()
  .refine((value) => !value || !Number.isNaN(new Date(value).getTime()), {
    message: 'Date invalide.'
  });

export const leadSchema = z
  .object({
    fullAddress: z.string().min(5, 'Adresse complète requise.'),
    sector: z.enum(['paris', 'premiere-couronne']),
    city: z.string().optional(),

    groundFloorArea: z.coerce.number().positive('La surface du RDC est requise.'),
    hasBasement: z.enum(['oui', 'non']),
    basementArea: optionalNumber,
    hasUpperFloor: z.enum(['oui', 'non']),
    upperFloorArea: optionalNumber,
    hasApartment: z.enum(['oui', 'non']),
    apartmentArea: optionalNumber,

    occupancyStatus: z.enum(['libre', 'occupé']),
    isBusinessAlsoForSale: z.enum(['oui', 'non']).optional(),
    annualRentExclCharges: optionalNumber,
    tenantActivity: z.string().optional(),
    leaseEndDate: optionalDate,
    annualCharges: optionalNumber,
    propertyTax: optionalNumber,

    commercialLeaseFile: z.string().optional(),
    propertyTaxFile: z.string().optional(),
    plansFile: z.string().optional(),
    photosFile: z.string().optional(),
    otherDocumentsFile: z.string().optional(),

    additionalInfo: z.string().optional(),

    ownerName: z.string().min(2, 'Le nom est requis.'),
    ownerPhone: z.string().min(8, 'Téléphone invalide.'),
    ownerEmail: z.string().email('Email invalide.')
  })
  .superRefine((data, ctx) => {
    if (data.sector === 'premiere-couronne' && !data.city?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['city'],
        message: 'La ville est requise pour la première couronne.'
      });
    }

    if (data.occupancyStatus === 'occupé' && (data.annualRentExclCharges === undefined || data.annualRentExclCharges < 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['annualRentExclCharges'],
        message: 'Le loyer annuel hors charges est requis pour un bien occupé.'
      });
    }
  });

export type LeadInput = z.infer<typeof leadSchema>;

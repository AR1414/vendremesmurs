import { NextResponse } from 'next/server';
import { mkdir, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { put } from '@vercel/blob';
import { leadSchema } from '@/lib/lead-schema';
import { sendLeadNotification } from '@/lib/mailer';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

async function saveUploadedFile(file: File | null): Promise<string | undefined> {
  if (!file || file.size === 0) {
    return undefined;
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const fileName = `${Date.now()}-${randomUUID()}-${safeName}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`leads/${fileName}`, file, {
      access: 'public'
    });

    return blob.url;
  }

  const uploadsDir = path.join('/tmp', 'uploads', 'leads');
  await mkdir(uploadsDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  const targetPath = path.join(uploadsDir, fileName);
  await writeFile(targetPath, buffer);

  return targetPath;
}

function getField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === 'string' ? value : '';
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const commercialLeaseFile = await saveUploadedFile(formData.get('commercialLeaseFile') as File | null);
    const propertyTaxFile = await saveUploadedFile(formData.get('propertyTaxFile') as File | null);
    const plansFile = await saveUploadedFile(formData.get('plansFile') as File | null);
    const photosFile = await saveUploadedFile(formData.get('photosFile') as File | null);
    const otherDocumentsFile = await saveUploadedFile(formData.get('otherDocumentsFile') as File | null);

    const payload = {
      fullAddress: getField(formData, 'fullAddress'),
      sector: getField(formData, 'sector'),
      city: getField(formData, 'city'),

      groundFloorArea: getField(formData, 'groundFloorArea'),
      hasBasement: getField(formData, 'hasBasement') || 'non',
      basementArea: getField(formData, 'basementArea'),
      hasUpperFloor: getField(formData, 'hasUpperFloor') || 'non',
      upperFloorArea: getField(formData, 'upperFloorArea'),
      hasApartment: getField(formData, 'hasApartment') || 'non',
      apartmentArea: getField(formData, 'apartmentArea'),

      occupancyStatus: getField(formData, 'occupancyStatus'),
      isBusinessAlsoForSale: getField(formData, 'isBusinessAlsoForSale') || undefined,
      annualRentExclCharges: getField(formData, 'annualRentExclCharges'),
      tenantActivity: getField(formData, 'tenantActivity'),
      leaseEndDate: getField(formData, 'leaseEndDate'),
      annualCharges: getField(formData, 'annualCharges'),
      propertyTax: getField(formData, 'propertyTax'),

      commercialLeaseFile,
      propertyTaxFile,
      plansFile,
      photosFile,
      otherDocumentsFile,

      additionalInfo: getField(formData, 'additionalInfo'),

      ownerName: getField(formData, 'ownerName'),
      ownerPhone: getField(formData, 'ownerPhone'),
      ownerEmail: getField(formData, 'ownerEmail')
    };

    const parsed = leadSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.issues[0]?.message || 'Données invalides.'
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const normalizedAdditionalInfo = [data.additionalInfo?.trim() || null].filter((line) => line !== null).join('\n').trim();

    await prisma.lead.create({
      data: {
        ownerName: data.ownerName,
        ownerEmail: data.ownerEmail,
        ownerPhone: data.ownerPhone,

        propertyAddress: data.fullAddress,
        propertyCity: data.city || data.sector,
        propertyPostalCode: '',
        propertyType: data.sector,

        areaSqm: Number(data.groundFloorArea),
        hasStorageOrBasement: data.hasBasement === 'oui',
        basementArea: data.basementArea ? Number(data.basementArea) : null,
        upperFloorArea: data.upperFloorArea ? Number(data.upperFloorArea) : null,
        apartmentArea: data.apartmentArea ? Number(data.apartmentArea) : null,

        occupancyStatus: data.occupancyStatus,
        businessSaleStatus: data.isBusinessAlsoForSale ?? null,
        tenantActivity: data.tenantActivity || null,
        annualRent: data.annualRentExclCharges ? Number(data.annualRentExclCharges) : null,
        annualCharges: data.annualCharges ? Number(data.annualCharges) : null,
        propertyTax: data.propertyTax,
        leaseEndDate: data.leaseEndDate ? new Date(data.leaseEndDate) : null,
        askingPrice: null,

        additionalInfo: normalizedAdditionalInfo || null,

        bailCommercialFile: data.commercialLeaseFile,
        propertyTaxFile: data.propertyTaxFile,
        floorPlansFile: data.plansFile,
        propertyPhotosFile: data.photosFile,
        otherDocumentsFile: data.otherDocumentsFile
      }
    });

    try {
      await sendLeadNotification(data);
    } catch (mailError) {
      console.error('Erreur envoi email notification lead:', mailError);
    }

    return NextResponse.json(
      {
        message:
          'Votre demande a bien été envoyée. Si vous le souhaitez, vous pourrez nous transmettre les documents ou informations complémentaires dans un second temps.'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur /api/leads:', error);
    return NextResponse.json(
      {
        error: 'Erreur serveur, veuillez réessayer.'
      },
      { status: 500 }
    );
  }
}

import { getPortalContext } from './portalContext';

export type ReceiptListItem = {
  userId: string;
  receiptId: string;
  customerId?: string;
  createdAt: string;
  isDownloaded: boolean;
  transactionSource?: string;
  transactionAmount?: number;
  transactionCurrency?: string;
  transactionOperationNumber?: string;
  transactionDateTimeUtc?: string;
  blobUrl?: string;
};

export async function fetchReceipts(customerId?: string): Promise<ReceiptListItem[]> {
  const ctx = await getPortalContext();

  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) throw new Error('Missing API_BASE_URL');

  const template = process.env.CLERK_JWT_TEMPLATE;
  const { auth } = await import('@clerk/nextjs/server');
  const session = await auth();
  const token = await session.getToken(template ? { template } : undefined);
  if (!token) throw new Error('Missing auth token');

  const url = new URL('/api/admin/receipts', baseUrl);
  if (ctx.isSuperAdmin && customerId) {
    url.searchParams.set('customerId', customerId);
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    cache: 'no-store'
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('API error:', res.status, errorText);
    throw new Error(errorText || `API error: ${res.status}`);
  }

  return (await res.json()) as ReceiptListItem[];
}

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
};

export async function fetchReceipts(customerId?: string): Promise<ReceiptListItem[]> {
  const ctx = await getPortalContext();

  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) throw new Error('Missing API_BASE_URL');

  const template = process.env.CLERK_JWT_TEMPLATE;
  const token = await (await import('@clerk/nextjs/server')).auth().getToken(template ? { template } : undefined);
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
    throw new Error(await res.text());
  }

  return (await res.json()) as ReceiptListItem[];
}

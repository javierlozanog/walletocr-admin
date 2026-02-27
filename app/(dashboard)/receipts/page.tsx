import { fetchReceipts } from '@/lib/webapi';
import { getPortalContext } from '@/lib/portalContext';

export default async function ReceiptsPage({ searchParams }: { searchParams: { customerId?: string } }) {
  const ctx = await getPortalContext();

  if (!ctx.isSuperAdmin && ctx.role !== 'org:accountant' && ctx.role !== 'org:admin') {
    return <div className="rounded border bg-white p-4">Forbidden.</div>;
  }

  const receipts = await fetchReceipts(searchParams.customerId);

  return (
    <div className="space-y-4">
      <div className="rounded border bg-white p-4">
        <div className="text-lg font-semibold">Receipts</div>
        <div className="text-sm text-slate-600">
          {ctx.isSuperAdmin ? 'Superadmin view' : `Org: ${ctx.orgId}`}
        </div>
      </div>

      <div className="overflow-x-auto rounded border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-600">
            <tr>
              <th className="px-4 py-2">Created</th>
              <th className="px-4 py-2">Source</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Operation</th>
              <th className="px-4 py-2">User</th>
            </tr>
          </thead>
          <tbody>
            {receipts.map(r => (
              <tr key={`${r.userId}:${r.receiptId}`} className="border-t">
                <td className="px-4 py-2">{new Date(r.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2">{r.transactionSource ?? ''}</td>
                <td className="px-4 py-2">{r.transactionCurrency ?? ''} {r.transactionAmount ?? ''}</td>
                <td className="px-4 py-2">{r.transactionOperationNumber ?? ''}</td>
                <td className="px-4 py-2 text-slate-500">{r.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

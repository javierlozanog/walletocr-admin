import { getPortalContext } from '@/lib/portalContext';

export default async function SuperAdminPage() {
  const ctx = await getPortalContext();

  if (!ctx.isSuperAdmin) {
    return <div className="rounded border bg-white p-4">Forbidden.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="rounded border bg-white p-4">
        <div className="text-lg font-semibold">Superadmin</div>
        <div className="text-sm text-slate-600">Impersonation: open receipts with <code className="rounded bg-slate-100 px-1">/receipts?customerId=org_...</code></div>
      </div>

      <div className="rounded border bg-white p-4 text-sm">
        <div className="font-medium">Configured superadmin email</div>
        <div className="text-slate-600">{ctx.email}</div>
      </div>
    </div>
  );
}

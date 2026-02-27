import { getPortalContext } from '@/lib/portalContext';

export default async function AdminPage() {
  const ctx = await getPortalContext();

  if (!ctx.isSuperAdmin && ctx.role !== 'org:admin') {
    return <div className="rounded border bg-white p-4">Forbidden.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="rounded border bg-white p-4">
        <div className="text-lg font-semibold">Admin</div>
        <div className="text-sm text-slate-600">User management / invitations will be implemented using Clerk server-side APIs.</div>
      </div>

      <div className="rounded border bg-white p-4 text-sm text-slate-700">
        <div className="font-medium">Next steps</div>
        <ul className="list-disc pl-5">
          <li>List org users (Clerk organization memberships)</li>
          <li>Invite user by email</li>
          <li>Enforce MaxUsers (X) when inviting</li>
        </ul>
      </div>
    </div>
  );
}

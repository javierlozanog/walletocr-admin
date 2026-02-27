import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { getPortalContext } from '@/lib/portalContext';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const ctx = await getPortalContext();

  const canSeeAdmin = ctx.isSuperAdmin || ctx.role === 'org:admin';
  const canSeeSuper = ctx.isSuperAdmin;

  return (
    <div className="min-h-screen">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
          <div className="font-semibold">WalletOCR Admin</div>
          <nav className="flex gap-3 text-sm">
            <Link className="text-slate-700 hover:text-slate-900" href="/receipts">Receipts</Link>
            {canSeeAdmin && (
              <Link className="text-slate-700 hover:text-slate-900" href="/admin">Admin</Link>
            )}
            {canSeeSuper && (
              <Link className="text-slate-700 hover:text-slate-900" href="/superadmin">Superadmin</Link>
            )}
          </nav>
          <div className="ml-auto">
            <UserButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {children}
      </main>
    </div>
  );
}

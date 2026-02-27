import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  const session = await auth();
  if (isProtectedRoute(req) && !session.userId) {
    return Response.redirect('/sign-in');
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|.*\\..*).*)'
  ]
};

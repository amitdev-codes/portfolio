import { Badge } from '@/components/ui/badge';

// ✅ FIXED - TypeScript safe
export const renderRolesBadges = (roles: string | null | undefined) => (
  <div className="flex flex-wrap gap-1">
    {roles ? (
      roles.split(',').map((r) => (
        <Badge key={r.trim()} variant="secondary" className="px-1.5 py-0 text-[11px] capitalize">
          {r.trim()}
        </Badge>
      ))
    ) : (
      <Badge variant="outline" className="px-1.5 py-0 text-[11px] text-muted-foreground">
        No role
      </Badge>
    )}
  </div>
);

// ✅ FIXED - Explicit null check
export const renderVerifiedBadge = (verifiedAt: string | null | undefined) => {
  // TypeScript safe null check
  if (!verifiedAt) {
    return (
      <Badge
        variant="outline"
        className="border-amber-300 bg-amber-50 px-1.5 py-0 text-[11px] text-amber-600 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
      >
        No
      </Badge>
    );
  }

  return (
    <Badge className="bg-emerald-600 px-1.5 py-0 text-[11px] hover:bg-emerald-600 dark:bg-emerald-700">
      ✓ Yes
    </Badge>
  );
};
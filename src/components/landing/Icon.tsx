import * as Icons from "lucide-react";

/** Resolves a Lucide icon name from the data files, with a safe fallback. */
export function Icon({ name, className }: { name: string; className?: string }) {
  const Resolved = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name];
  const Component = Resolved ?? Icons.Compass;
  return <Component className={className} />;
}

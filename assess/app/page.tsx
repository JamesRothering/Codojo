import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-subtle px-4">
      <p className="text-sm text-ink-muted">CoDojo · codojo.me</p>
      <Link
        href="/assessment"
        className="mt-6 text-sm font-medium text-accent underline-offset-4 hover:underline"
      >
        Open technical risk assessment
      </Link>
    </div>
  );
}

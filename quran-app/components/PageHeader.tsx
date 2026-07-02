import Link from "next/link";

export default function PageHeader({
  title,
  subtitle,
  backHref,
}: {
  title: string;
  subtitle?: string;
  backHref?: string;
}) {
  return (
    <div className="gradient-green px-5 pb-6 pt-safe-top pt-10 md:rounded-3xl md:shadow-card">
      {backHref && (
        <Link
          href={backHref}
          className="mb-3 inline-flex items-center gap-1 text-sm text-emerald-300 hover:text-gold"
        >
          ← Kembali
        </Link>
      )}
      <h1 className="font-poppins text-2xl font-bold text-white">{title}</h1>
      {subtitle && (
        <p className="mt-1 text-sm text-emerald-300">{subtitle}</p>
      )}
      <div className="mt-4 divider-gold" />
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
}

export function StatsCard({ title, value, change }: StatsCardProps) {
  const isPositive = change.startsWith("+");

  return (
    <div className="rounded-xl border bg-background p-6 shadow-sm">
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <div className="mt-2">
        <p className="text-2xl font-bold">{value}</p>
        <p className={`text-xs mt-1 ${isPositive ? "text-green-600" : "text-red-600"}`}>
          {change} from last month
        </p>
      </div>
    </div>
  );
}

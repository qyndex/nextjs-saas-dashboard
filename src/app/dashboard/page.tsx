import { StatsCard } from "@/components/dashboard/StatsCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";

const stats = [
  { title: "Total Revenue", value: "$45,231.89", change: "+20.1%" },
  { title: "Subscriptions", value: "2,350", change: "+180.1%" },
  { title: "Active Users", value: "12,234", change: "+19%" },
  { title: "Churn Rate", value: "2.4%", change: "-4.5%" },
];

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatsCard key={s.title} title={s.title} value={s.value} change={s.change} />
        ))}
      </div>
      <RevenueChart />
    </div>
  );
}

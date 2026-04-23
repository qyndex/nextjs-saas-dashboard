import { StatsCard } from "@/components/dashboard/StatsCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { createClient } from "@/lib/supabase/server";

interface DashboardStat {
  title: string;
  value: string;
  change: string;
}

const DEMO_STATS: DashboardStat[] = [
  { title: "Total Revenue", value: "$45,231.89", change: "+20.1%" },
  { title: "Subscriptions", value: "2,350", change: "+180.1%" },
  { title: "Active Users", value: "12,234", change: "+19%" },
  { title: "Churn Rate", value: "2.4%", change: "-4.5%" },
];

async function getDashboardStats(): Promise<DashboardStat[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (
    !supabaseUrl ||
    !supabaseKey ||
    supabaseUrl === "https://your-project.supabase.co"
  ) {
    return DEMO_STATS;
  }

  try {
    const supabase = await createClient();

    const [subscriptionsResult, usersResult, revenueResult] = await Promise.all(
      [
        supabase
          .from("subscriptions")
          .select("id, amount_cents, status")
          .eq("status", "active"),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase
          .from("revenue_events")
          .select("amount_cents, event_type")
          .eq("event_type", "charge"),
      ]
    );

    const activeSubscriptions = subscriptionsResult.data ?? [];
    const totalUsers = usersResult.count ?? 0;
    const revenueEvents = revenueResult.data ?? [];

    const totalRevenueCents = revenueEvents.reduce(
      (sum, e) => sum + (e.amount_cents ?? 0),
      0
    );
    const totalRevenue = (totalRevenueCents / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    return [
      {
        title: "Total Revenue",
        value: totalRevenue,
        change: "+20.1%",
      },
      {
        title: "Subscriptions",
        value: activeSubscriptions.length.toLocaleString(),
        change: "+180.1%",
      },
      {
        title: "Active Users",
        value: totalUsers.toLocaleString(),
        change: "+19%",
      },
      {
        title: "Churn Rate",
        value: "2.4%",
        change: "-4.5%",
      },
    ];
  } catch {
    return DEMO_STATS;
  }
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();

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

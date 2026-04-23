-- SaaS metrics tables: subscriptions and revenue events
-- Additive migration — safe to apply on top of 20240101000000_initial_schema.sql

-- Subscriptions table for SaaS metrics
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan                  TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  status                TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due')),
  amount_cents          INTEGER NOT NULL DEFAULT 0,
  current_period_start  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  current_period_end    TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '30 days',
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscriptions"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Revenue events for analytics
CREATE TABLE IF NOT EXISTS public.revenue_events (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id  UUID REFERENCES public.subscriptions(id),
  amount_cents     INTEGER NOT NULL,
  event_type       TEXT NOT NULL CHECK (event_type IN ('charge', 'refund', 'credit')),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.revenue_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view revenue"
  ON public.revenue_events FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_revenue_events_subscription_id ON public.revenue_events(subscription_id);
CREATE INDEX IF NOT EXISTS idx_revenue_events_created_at ON public.revenue_events(created_at DESC);

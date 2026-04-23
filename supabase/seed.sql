-- Seed data for development
-- Run after migrations: supabase db seed
-- Seed is idempotent — safe to run multiple times.

-- NOTE: Auth users must exist before seeding profiles.
-- Create test users via Supabase Studio > Authentication first:
--   admin@example.com / password123
--   member@example.com / password123
-- Then run this seed to populate demo data.

-- ----------------------------------------------------------------
-- Demo profiles (replace UUIDs with real auth.users UUIDs)
-- ----------------------------------------------------------------
-- INSERT INTO public.profiles (id, email, full_name, role) VALUES
--   ('00000000-0000-0000-0000-000000000001', 'admin@example.com', 'Admin User', 'admin'),
--   ('00000000-0000-0000-0000-000000000002', 'member@example.com', 'Demo Member', 'member')
-- ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------------
-- Demo subscriptions
-- ----------------------------------------------------------------
-- INSERT INTO public.subscriptions (id, user_id, plan, status, amount_cents) VALUES
--   ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'enterprise', 'active', 49900),
--   ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'pro',        'active', 2900)
-- ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------------
-- Demo revenue events
-- ----------------------------------------------------------------
-- INSERT INTO public.revenue_events (subscription_id, amount_cents, event_type, created_at) VALUES
--   ('10000000-0000-0000-0000-000000000001', 49900, 'charge', NOW() - INTERVAL '30 days'),
--   ('10000000-0000-0000-0000-000000000001', 49900, 'charge', NOW()),
--   ('10000000-0000-0000-0000-000000000002', 2900,  'charge', NOW() - INTERVAL '30 days'),
--   ('10000000-0000-0000-0000-000000000002', 2900,  'charge', NOW());

-- ----------------------------------------------------------------
-- Demo projects
-- ----------------------------------------------------------------
-- INSERT INTO public.projects (name, description, status, owner_id) VALUES
--   ('Website Redesign', 'Complete overhaul of the marketing site', 'active',   '00000000-0000-0000-0000-000000000001'),
--   ('Mobile App',       'iOS and Android app launch',              'active',   '00000000-0000-0000-0000-000000000001'),
--   ('API v2',           'Next generation REST API',                'inactive', '00000000-0000-0000-0000-000000000002');

SELECT 'Seed file loaded. Uncomment the INSERT blocks after creating auth users via Supabase Studio.' AS notice;

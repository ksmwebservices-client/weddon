/*
# Create enquiries table for public wedding enquiries

1. New Tables
- `enquiries`
  - `id` (uuid, primary key)
  - `name` (text, not null) — full name of the person enquiring
  - `email` (text, not null) — contact email
  - `phone` (text) — optional phone number
  - `wedding_date` (date) — optional target wedding date
  - `city` (text) — optional preferred city
  - `service` (text) — which service/package they're interested in
  - `budget` (text) — optional budget range
  - `guests` (integer) — optional estimated guest count
  - `message` (text) — the enquiry body
  - `source` (text, default 'website') — where the enquiry came from
  - `status` (text, default 'new') — lead status: new / contacted / qualified / won / lost
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `enquiries`.
- This is a public submission form (no sign-in required to enquire), so
  INSERT is open to anon + authenticated.
- SELECT / UPDATE / DELETE are restricted to authenticated users only
  (staff reviewing enquiries in the admin portal). Public visitors
  cannot read or modify other people's enquiries.

3. Notes
- Idempotent: uses IF NOT EXISTS for the table and drops policies
  before recreating them so the migration is safe to re-run.
- An index on created_at supports the admin dashboard's recent-enquiries feed.
*/

CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  wedding_date date,
  city text,
  service text,
  budget text,
  guests integer,
  message text,
  source text NOT NULL DEFAULT 'website',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS enquiries_status_idx ON enquiries (status);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Public can submit enquiries (no sign-in needed to enquire).
DROP POLICY IF EXISTS "anon_insert_enquiries" ON enquiries;
CREATE POLICY "anon_insert_enquiries"
ON enquiries FOR INSERT
TO anon, authenticated WITH CHECK (true);

-- Only authenticated staff can read enquiries (admin portal review).
DROP POLICY IF EXISTS "auth_select_enquiries" ON enquiries;
CREATE POLICY "auth_select_enquiries"
ON enquiries FOR SELECT
TO authenticated USING (true);

-- Only authenticated staff can update enquiry status (admin pipeline).
DROP POLICY IF EXISTS "auth_update_enquiries" ON enquiries;
CREATE POLICY "auth_update_enquiries"
ON enquiries FOR UPDATE
TO authenticated USING (true) WITH CHECK (true);

-- Only authenticated staff can delete enquiries.
DROP POLICY IF EXISTS "auth_delete_enquiries" ON enquiries;
CREATE POLICY "auth_delete_enquiries"
ON enquiries FOR DELETE
TO authenticated USING (true);

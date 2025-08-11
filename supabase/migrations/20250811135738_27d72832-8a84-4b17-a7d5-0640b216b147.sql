-- 1) Create roles enum if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'app_role'
  ) THEN
    CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
  END IF;
END
$$;

-- 2) Create user_roles table (no FK to auth.users per project guidelines)
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own roles (avoid recursion; no has_role usage here)
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 3) Security definer function to check roles (used in other table policies)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

-- 4) Tighten RLS on contact_submissions: only admins can SELECT
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Remove overly permissive policy
DROP POLICY IF EXISTS "Authenticated users can view submissions" ON public.contact_submissions;

-- Create admin-only select policy
DROP POLICY IF EXISTS "Admins can view all contact submissions" ON public.contact_submissions;
CREATE POLICY "Admins can view all contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Keep existing INSERT policy in place (allows anyone to submit) -- not altered here;
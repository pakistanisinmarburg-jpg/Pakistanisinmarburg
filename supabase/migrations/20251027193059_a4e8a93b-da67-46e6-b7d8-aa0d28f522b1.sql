-- Add RLS policies for user_roles table
-- Only admins can view all roles
CREATE POLICY "Admins can view all user roles"
ON public.user_roles
FOR SELECT
USING (public.is_admin());

-- Users can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Only admins can insert roles
CREATE POLICY "Admins can insert user roles"
ON public.user_roles
FOR INSERT
WITH CHECK (public.is_admin());

-- Only admins can update roles
CREATE POLICY "Admins can update user roles"
ON public.user_roles
FOR UPDATE
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Only admins can delete roles
CREATE POLICY "Admins can delete user roles"
ON public.user_roles
FOR DELETE
USING (public.is_admin());
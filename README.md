#  Modified version of the official Next.js and Supabase template with additional features

This is a modified version of the official Next.js and Supabase template with additional features. Most of the credit goes to the original creator of the template which can be obtained with this command:
```bash
npx create-next-app --example with-supabase with-supabase-app
```


## What's Different

This template builds upon the official Next.js and Supabase template with several key improvements:

### Authentication & Authorization
- Added a custom unauthorized page with a clean, user-friendly design
- Added `user-context.tsx` to help with supabase session management
- Added `useUser` hook to simplify user session management
- Added first name and last name fields to sign up form, updated actions accordingly


### Developer Experience
- Streamlined project structure(moved code into `src` folder, restructuring folders)


## SQL to use sign up form
```sql
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  first_name text,
  last_name text,
  email text,
  created_at timestamp with time zone default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
insert into public.profiles (user_id, email, first_name, last_name)
values (
         new.id,
         new.email,
         (new.raw_user_meta_data->>'first_name'),
         (new.raw_user_meta_data->>'last_name')
       );
return new;
end;
$$;


create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user();
```

## Features

- Based on the official [Next.js](https://nextjs.org) and Supabase template
- Works across the entire Next.js stack
  - App Router
  - Pages Router
  - Middleware
  - Client
  - Server
  - It just works!
- supabase-ssr for cookie-based authentication
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Components with [shadcn/ui](https://ui.shadcn.com/)


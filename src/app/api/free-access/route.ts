import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(req: Request) {
  const formData = await req.formData()
  const code = formData.get('code')?.toString().toUpperCase()

  if (code === 'LI4') {
    // Create user or let them sign up with paid_until = null (never expires)
    return Response.redirect(new URL('/signup?free=true', req.url))
  } else {
    return Response.redirect(new URL('/?error=invalid', req.url))
  }
}

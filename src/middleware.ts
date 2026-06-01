import { NextRequest, NextResponse } from 'next/server'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'invitely2025'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/admin')) {
    const auth = req.cookies.get('admin_auth')?.value
    if (auth !== ADMIN_PASSWORD) {
      // Check basic auth header
      const authHeader = req.headers.get('authorization')
      if (authHeader) {
        const [type, credentials] = authHeader.split(' ')
        if (type === 'Basic') {
          const decoded = Buffer.from(credentials, 'base64').toString()
          const [, password] = decoded.split(':')
          if (password === ADMIN_PASSWORD) {
            const res = NextResponse.next()
            res.cookies.set('admin_auth', ADMIN_PASSWORD, { httpOnly: true, maxAge: 86400 })
            return res
          }
        }
      }
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Invitely Admin"' },
      })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

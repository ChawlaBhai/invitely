import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { rateLimit } from '@/lib/rateLimit'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')

export async function POST(req: NextRequest) {
  if (!rateLimit(req, 20, 60 * 1000)) {
    return NextResponse.json({ error: 'Too many uploads' }, { status: 429 })
  }
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true })

    const formData = await req.formData()
    const files = formData.getAll('files') as File[]

    if (!files.length) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    // 5MB per file limit
    const MAX_SIZE = 5 * 1024 * 1024
    for (const file of files) {
      if (file.size > MAX_SIZE) {
        return NextResponse.json({ error: `File ${file.name} exceeds 5MB limit` }, { status: 400 })
      }
    }

    const urls: string[] = []

    for (const file of files) {
      if (!file.type.startsWith('image/')) continue

      const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
      const filepath = path.join(UPLOAD_DIR, filename)

      const buffer = Buffer.from(await file.arrayBuffer())
      await fs.writeFile(filepath, buffer)
      urls.push(`/uploads/${filename}`)
    }

    return NextResponse.json({ urls })
  } catch {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

export const config = {
  api: { bodyParser: false },
}

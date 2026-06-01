import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const STORE_FILE = path.join(process.cwd(), '.data', 'invites.json')

export async function GET() {
  try {
    const raw = await fs.readFile(STORE_FILE, 'utf-8')
    const store = JSON.parse(raw)
    const count = Object.keys(store).length
    return NextResponse.json({ count }, { headers: { 'Cache-Control': 'public, s-maxage=60' } })
  } catch {
    return NextResponse.json({ count: 0 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), '.data')
const LEADS_FILE = path.join(DATA_DIR, 'leads.json')

interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  createdAt: string
}

async function saveLead(lead: Omit<Lead, 'id' | 'createdAt'>): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  let leads: Lead[] = []
  try {
    const raw = await fs.readFile(LEADS_FILE, 'utf-8')
    leads = JSON.parse(raw)
  } catch {}
  leads.push({ ...lead, id: Math.random().toString(36).slice(2, 10), createdAt: new Date().toISOString() })
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2))
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, company, message } = body
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email and message are required' }, { status: 400 })
    }
    await saveLead({ name, email, phone, company, message })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}

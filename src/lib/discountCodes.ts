import { promises as fs } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), '.data')
const CODES_FILE = path.join(DATA_DIR, 'discount-codes.json')

export interface DiscountCode {
  code: string
  discountPercent: number
  maxUses: number
  usedCount: number
  validUntil?: string
  createdAt: string
  description?: string
}

async function readCodes(): Promise<Record<string, DiscountCode>> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    const raw = await fs.readFile(CODES_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch {
    // Seed with default codes
    const defaults: Record<string, DiscountCode> = {
      'INVITELY20': {
        code: 'INVITELY20',
        discountPercent: 20,
        maxUses: 1000,
        usedCount: 0,
        createdAt: new Date().toISOString(),
        description: 'Launch discount — 20% off',
      },
      'PLANNER30': {
        code: 'PLANNER30',
        discountPercent: 30,
        maxUses: 100,
        usedCount: 0,
        createdAt: new Date().toISOString(),
        description: 'Wedding planner discount',
      },
    }
    await fs.writeFile(CODES_FILE, JSON.stringify(defaults, null, 2))
    return defaults
  }
}

async function writeCodes(codes: Record<string, DiscountCode>): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(CODES_FILE, JSON.stringify(codes, null, 2))
}

export async function validateCode(code: string): Promise<{ valid: boolean; discountPercent?: number; reason?: string }> {
  const codes = await readCodes()
  const entry = codes[code.toUpperCase()]

  if (!entry) return { valid: false, reason: 'Invalid code' }
  if (entry.usedCount >= entry.maxUses) return { valid: false, reason: 'Code has expired' }
  if (entry.validUntil && new Date(entry.validUntil) < new Date()) return { valid: false, reason: 'Code has expired' }

  return { valid: true, discountPercent: entry.discountPercent }
}

export async function useCode(code: string): Promise<void> {
  const codes = await readCodes()
  const entry = codes[code.toUpperCase()]
  if (entry) {
    entry.usedCount++
    await writeCodes(codes)
  }
}

export async function getAllCodes(): Promise<DiscountCode[]> {
  const codes = await readCodes()
  return Object.values(codes).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function createCode(code: DiscountCode): Promise<void> {
  const codes = await readCodes()
  codes[code.code.toUpperCase()] = { ...code, code: code.code.toUpperCase() }
  await writeCodes(codes)
}

'use client'

import { useState, useRef, useCallback } from 'react'

interface Props {
  photos: string[]
  onChange: (photos: string[]) => void
  accentColor?: string
}

export default function PhotoUploader({ photos, onChange, accentColor = '#A16207' }: Props) {
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function uploadFiles(files: FileList | File[]) {
    const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'))
    if (!imageFiles.length) return

    setUploading(true)
    try {
      const form = new FormData()
      imageFiles.forEach(f => form.append('files', f))
      const res = await fetch('/api/upload', { method: 'POST', body: form })
      const json = await res.json()
      if (json.urls) onChange([...photos, ...json.urls])
    } finally {
      setUploading(false)
    }
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    if (e.dataTransfer.files.length) uploadFiles(e.dataTransfer.files)
  }, [photos])

  function addUrl() {
    const url = urlInput.trim()
    if (!url) return
    onChange([...photos, url])
    setUrlInput('')
  }

  function remove(idx: number) {
    onChange(photos.filter((_, i) => i !== idx))
  }

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className="relative border-2 border-dashed rounded-sm p-8 text-center cursor-pointer transition-all duration-300"
        style={{
          borderColor: dragging ? accentColor : 'rgba(255,255,255,0.1)',
          background: dragging ? `${accentColor}08` : 'transparent',
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={e => e.target.files && uploadFiles(e.target.files)}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: accentColor }} />
            <p className="text-[#FAFAF9] opacity-40 text-sm">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-8 h-8 opacity-30" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-[#FAFAF9] opacity-40 text-sm">Drop photos here or click to upload</p>
            <p className="text-[#FAFAF9] opacity-20 text-xs">JPG, PNG, WebP · Multiple files OK</p>
          </div>
        )}
      </div>

      {/* URL input */}
      <div className="flex gap-2">
        <input
          value={urlInput}
          onChange={e => setUrlInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addUrl()}
          placeholder="Or paste a photo URL..."
          className="flex-1 bg-[#111009] border border-white/10 text-[#FAFAF9] px-4 py-2.5 text-sm focus:outline-none focus:border-[#A16207] transition-colors placeholder:opacity-20"
        />
        <button
          onClick={addUrl}
          disabled={!urlInput.trim()}
          className="px-4 py-2.5 text-xs tracking-widest uppercase font-semibold transition-all disabled:opacity-30"
          style={{ background: accentColor, color: '#0C0A09' }}
        >
          Add
        </button>
      </div>

      {/* Photo grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {photos.map((url, i) => (
            <div key={i} className="relative group aspect-square overflow-hidden border border-white/5">
              <img src={url} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
              <button
                onClick={() => remove(i)}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {photos.length > 0 && (
        <p className="text-[#FAFAF9] opacity-30 text-xs">{photos.length} photo{photos.length !== 1 ? 's' : ''} added</p>
      )}
    </div>
  )
}

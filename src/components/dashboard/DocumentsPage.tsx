'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FolderOpen, Upload, FileCheck, FileClock, FileX, File, Loader2, X, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { formatDate, getStatusColor } from '@/lib/utils'

interface Document {
  id: string
  type: string
  status: string
  fileName: string
  fileUrl: string
  fileSize: number | null
  createdAt: Date
}

const DOC_TYPES = [
  { value: 'ID_DOCUMENT',         label: 'SA ID Document' },
  { value: 'PROOF_OF_RESIDENCE',  label: 'Proof of Residence' },
  { value: 'BANK_STATEMENT',      label: 'Bank Statement' },
  { value: 'DEATH_CERTIFICATE',   label: 'Death Certificate' },
  { value: 'BIRTH_CERTIFICATE',   label: 'Birth Certificate' },
  { value: 'MARRIAGE_CERTIFICATE',label: 'Marriage Certificate' },
  { value: 'OTHER',               label: 'Other Document' },
]

const STATUS_ICONS = {
  APPROVED: FileCheck,
  PENDING:  FileClock,
  REJECTED: FileX,
}

const STATUS_COLORS = {
  APPROVED: { bg: 'bg-green-50',  text: 'text-green-700',  icon: 'text-green-600' },
  PENDING:  { bg: 'bg-amber-50',  text: 'text-amber-700',  icon: 'text-amber-500' },
  REJECTED: { bg: 'bg-red-50',    text: 'text-red-700',    icon: 'text-red-500' },
}

function formatFileSize(bytes: number | null): string {
  if (!bytes) return '–'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function getFileExt(name: string): string {
  return name.split('.').pop()?.toUpperCase() ?? 'FILE'
}

export default function DocumentsPage({ documents }: { documents: unknown[] }) {
  const typedDocs = documents as Document[]
  const [uploading, setUploading] = useState(false)
  const [docType, setDocType] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile || !docType) return
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('type', docType)

      const res = await fetch('/api/documents', { method: 'POST', body: formData })
      if (res.ok) {
        setUploadSuccess(true)
        setTimeout(() => window.location.reload(), 1200)
      }
    } catch {
      //
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) setSelectedFile(file)
  }

  const approved = typedDocs.filter((d) => d.status === 'APPROVED').length
  const pending  = typedDocs.filter((d) => d.status === 'PENDING').length

  return (
    <div className="space-y-6 max-w-5xl">

      {/* Summary row */}
      {typedDocs.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Total', value: typedDocs.length, color: 'text-[#014D4E]', bg: 'bg-[#014D4E]/8' },
            { label: 'Approved', value: approved, color: 'text-green-700', bg: 'bg-green-50' },
            { label: 'Pending review', value: pending, color: 'text-amber-700', bg: 'bg-amber-50' },
          ].map((s) => (
            <div key={s.label} className={`flex items-center gap-2 ${s.bg} rounded-xl px-4 py-2.5`}>
              <span className={`text-xl font-bold tabular-nums ${s.color}`}>{s.value}</span>
              <span className={`text-xs font-medium ${s.color} opacity-80`}>{s.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Upload card */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#014D4E] flex items-center justify-center shrink-0">
              <Upload className="w-4 h-4 text-[#C89B3C]" />
            </div>
            <div>
              <CardTitle className="text-base">Upload Document</CardTitle>
              <p className="text-xs text-[#9a9a9a] mt-0.5">PDF, JPG or PNG · Max 10 MB</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-5">
            {/* Document type */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Document Type</Label>
              <Select onValueChange={setDocType} required>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select document type…" />
                </SelectTrigger>
                <SelectContent>
                  {DOC_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Drop zone */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">File</Label>
              <div
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
                  dragOver
                    ? 'border-[#C89B3C] bg-[#C89B3C]/5 scale-[1.01]'
                    : selectedFile
                    ? 'border-[#014D4E]/40 bg-[#014D4E]/5'
                    : 'border-[#E5E7EB] hover:border-[#C89B3C]/50 hover:bg-[#F9FAFB]'
                }`}
                onClick={() => document.getElementById('file-input')?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
              >
                <input
                  id="file-input"
                  type="file"
                  className="sr-only"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
                />

                <AnimatePresence mode="wait">
                  {selectedFile ? (
                    <motion.div
                      key="file-selected"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-4 max-w-xs mx-auto"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#014D4E] flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold text-[#C89B3C]">{getFileExt(selectedFile.name)}</span>
                      </div>
                      <div className="text-left min-w-0">
                        <p className="font-semibold text-[#014D4E] text-sm truncate">{selectedFile.name}</p>
                        <p className="text-xs text-[#9a9a9a] mt-0.5">{formatFileSize(selectedFile.size)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={(ev) => { ev.stopPropagation(); setSelectedFile(null) }}
                        className="ml-auto p-1 rounded-lg text-[#9a9a9a] hover:text-[#1C1C1C] hover:bg-black/5 transition-colors shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="drop-prompt" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <FolderOpen className="w-10 h-10 text-[#C89B3C] mx-auto mb-3" />
                      <p className="text-sm font-semibold text-[#1C1C1C]">
                        {dragOver ? 'Drop your file here' : 'Click to browse or drag & drop'}
                      </p>
                      <p className="text-xs text-[#9a9a9a] mt-1">PDF, JPG, PNG up to 10 MB</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="submit"
                variant="default"
                disabled={uploading || !selectedFile || !docType}
                className="min-w-[140px]"
              >
                {uploading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Uploading…</>
                ) : (
                  <><Upload className="w-4 h-4" /> Upload Document</>
                )}
              </Button>
              <AnimatePresence>
                {uploadSuccess && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5 text-green-700 text-sm font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Uploaded!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Document list */}
      {typedDocs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E5E7EB]">
          <div className="w-16 h-16 rounded-2xl bg-[#F9FAFB] flex items-center justify-center mx-auto mb-4">
            <FolderOpen className="w-8 h-8 text-[#d0c9bc]" />
          </div>
          <h3 className="text-lg font-bold text-[#014D4E] mb-2 font-serif">No Documents Yet</h3>
          <p className="text-[#9a9a9a] text-sm max-w-xs mx-auto">
            Upload your ID document and proof of residence to activate your policy.
          </p>
        </div>
      ) : (
        <div>
          <h3 className="text-xs font-semibold text-[#9a9a9a] uppercase tracking-widest mb-3">
            Your Documents
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {typedDocs.map((doc, i) => {
              const StatusIcon = STATUS_ICONS[doc.status as keyof typeof STATUS_ICONS] ?? File
              const colors = STATUS_COLORS[doc.status as keyof typeof STATUS_COLORS]
              const docTypeLabel = DOC_TYPES.find((t) => t.value === doc.type)?.label ?? doc.type
              return (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                >
                  <Card className="hover:shadow-[0_4px_16px_rgba(1,77,78,0.10)] transition-all duration-200 h-full">
                    <CardContent className="p-5">
                      {/* Header row */}
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#014D4E] flex items-center justify-center shrink-0">
                          <span className="text-[9px] font-bold text-[#C89B3C]">{getFileExt(doc.fileName)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-[#1C1C1C] text-sm leading-snug truncate">{doc.fileName}</p>
                          <p className="text-xs text-[#9a9a9a] mt-0.5">{docTypeLabel}</p>
                        </div>
                      </div>

                      {/* Status badge */}
                      <div className={`flex items-center gap-1.5 px-3 py-2 rounded-xl ${colors?.bg ?? 'bg-[#F9FAFB]'}`}>
                        <StatusIcon className={`w-3.5 h-3.5 shrink-0 ${colors?.icon ?? 'text-[#9a9a9a]'}`} />
                        <span className={`text-xs font-semibold ${colors?.text ?? 'text-[#6b6b6b]'}`}>{doc.status}</span>
                        <span className="ml-auto text-[10px] text-[#9a9a9a]">{formatDate(doc.createdAt)}</span>
                      </div>

                      {doc.fileSize && (
                        <p className="text-[10px] text-[#9a9a9a] mt-2 text-right">{formatFileSize(doc.fileSize)}</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

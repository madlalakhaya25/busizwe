'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FolderOpen, Upload, FileCheck, FileClock, FileX, File, Loader2 } from 'lucide-react'
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
  { value: 'ID_DOCUMENT', label: 'ID Document' },
  { value: 'PROOF_OF_RESIDENCE', label: 'Proof of Residence' },
  { value: 'BANK_STATEMENT', label: 'Bank Statement' },
  { value: 'DEATH_CERTIFICATE', label: 'Death Certificate' },
  { value: 'BIRTH_CERTIFICATE', label: 'Birth Certificate' },
  { value: 'MARRIAGE_CERTIFICATE', label: 'Marriage Certificate' },
  { value: 'OTHER', label: 'Other' },
]

const STATUS_ICONS = {
  APPROVED: FileCheck,
  PENDING: FileClock,
  REJECTED: FileX,
}

function formatFileSize(bytes: number | null): string {
  if (!bytes) return '–'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function DocumentsPage({ documents }: { documents: unknown[] }) {
  const typedDocs = documents as Document[]
  const [uploading, setUploading] = useState(false)
  const [docType, setDocType] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

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
        window.location.reload()
      }
    } catch {
      //
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-[#6b6b6b] text-sm">{typedDocs.length} document{typedDocs.length !== 1 ? 's' : ''} uploaded</p>

      {/* Upload card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Upload className="w-4 h-4 text-[#C89B3C]" /> Upload Document
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="space-y-1.5">
              <Label>Document Type</Label>
              <Select onValueChange={setDocType} required>
                <SelectTrigger><SelectValue placeholder="Select document type" /></SelectTrigger>
                <SelectContent>
                  {DOC_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Select File</Label>
              <div
                className="border-2 border-dashed border-[#e0d9cc] rounded-xl p-8 text-center cursor-pointer hover:border-[#C89B3C]/50 hover:bg-[#F7F3EA] transition-all duration-200"
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <input
                  id="file-input"
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
                />
                <FolderOpen className="w-10 h-10 text-[#C89B3C] mx-auto mb-3" />
                {selectedFile ? (
                  <div>
                    <p className="font-semibold text-[#014D4E]">{selectedFile.name}</p>
                    <p className="text-xs text-[#6b6b6b] mt-1">{formatFileSize(selectedFile.size)}</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-medium text-[#1C1C1C]">Click to browse files</p>
                    <p className="text-xs text-[#6b6b6b] mt-1">PDF, JPG, PNG up to 10MB</p>
                  </div>
                )}
              </div>
            </div>
            <Button type="submit" variant="default" disabled={uploading || !selectedFile || !docType}>
              {uploading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</>
              ) : (
                <><Upload className="w-4 h-4" /> Upload Document</>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Documents list */}
      {typedDocs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-[#e0d9cc]">
          <FolderOpen className="w-16 h-16 text-[#e0d9cc] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#014D4E] mb-2 font-serif">No Documents Uploaded</h3>
          <p className="text-[#6b6b6b] text-sm">Upload your ID document and proof of residence to activate your policy.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {typedDocs.map((doc, i) => {
            const StatusIcon = STATUS_ICONS[doc.status as keyof typeof STATUS_ICONS] ?? File
            const docTypeLabel = DOC_TYPES.find((t) => t.value === doc.type)?.label ?? doc.type
            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Card className="hover:shadow-[0_4px_16px_rgba(1,77,78,0.1)] transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#014D4E]/10 flex items-center justify-center shrink-0">
                        <File className="w-5 h-5 text-[#014D4E]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#1C1C1C] text-sm truncate">{doc.fileName}</p>
                        <p className="text-xs text-[#6b6b6b]">{docTypeLabel}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(doc.status)}`}>
                        <StatusIcon className="w-3 h-3" />
                        {doc.status}
                      </span>
                      <span className="text-xs text-[#6b6b6b]">{formatDate(doc.createdAt)}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}

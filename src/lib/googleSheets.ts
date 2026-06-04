import { google } from 'googleapis'

const SHEET_ID = process.env.GOOGLE_SHEET_ID
const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
const PRIVATE_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n')

function getClient() {
  if (!SHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) return null
  const auth = new google.auth.JWT({
    email: CLIENT_EMAIL,
    key: PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  return google.sheets({ version: 'v4', auth })
}

export type PolicySheetRow = {
  timestamp: string
  policyNumber: string
  status: string
  memberName: string
  email: string
  phone: string
  idNumber: string
  product: string
  ageGroup: string
  coverAmount: string
  monthlyPremium: string
  applicationDate: string
}

const HEADERS = [
  'Timestamp', 'Policy Number', 'Status', 'Member Name', 'Email',
  'Phone', 'ID Number', 'Product', 'Age Group', 'Cover Amount (R)',
  'Monthly Premium (R)', 'Application Date',
]

const AGE_LABELS: Record<string, string> = {
  AGE_16_64: '16 – 64 yrs',
  AGE_65_75: '65 – 75 yrs',
  AGE_75_84: '75 – 84 yrs',
}

export async function appendPolicyRow(row: PolicySheetRow): Promise<void> {
  const sheets = getClient()
  if (!sheets) {
    console.log('[googleSheets] Not configured — skipping sheet append')
    return
  }

  const TAB = 'Applications'

  try {
    // Ensure header row exists on first run
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID!,
      range: `${TAB}!A1:A1`,
    })

    if (!existing.data.values?.length) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID!,
        range: `${TAB}!A1`,
        valueInputOption: 'RAW',
        requestBody: { values: [HEADERS] },
      })
    }

    // Append the data row
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID!,
      range: `${TAB}!A:L`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [[
          row.timestamp,
          row.policyNumber,
          row.status,
          row.memberName,
          row.email,
          row.phone,
          row.idNumber,
          row.product,
          AGE_LABELS[row.ageGroup] ?? row.ageGroup,
          row.coverAmount,
          row.monthlyPremium,
          row.applicationDate,
        ]],
      },
    })
  } catch (error) {
    // Best-effort — never block policy creation
    console.error('[googleSheets] Failed to append row:', error)
  }
}

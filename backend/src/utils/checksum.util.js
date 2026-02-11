import crypto from 'crypto'

export function generateChecksum(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex')
}

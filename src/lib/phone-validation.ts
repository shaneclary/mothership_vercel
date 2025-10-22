import { PhoneValidation } from '@/types'

/**
 * Phone Validation Service
 *
 * This service handles phone number validation and rewards.
 * - Generates verification codes
 * - Validates phone numbers
 * - Ensures one-time $10 reward claim per account/phone
 * - Tracks validation status
 */

// Store for phone validations (in production, use database)
const phoneValidations = new Map<string, PhoneValidation>()
const validatedPhones = new Set<string>() // Track phones that already claimed rewards

/**
 * Generate a 6-digit verification code
 */
function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

/**
 * Normalize phone number to E.164 format (simplified)
 */
function normalizePhoneNumber(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '')

  // Add +1 for US numbers if not present
  if (cleaned.length === 10) {
    return `+1${cleaned}`
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+${cleaned}`
  }

  return `+${cleaned}`
}

/**
 * Check if a phone number has already claimed rewards
 */
export function hasPhoneClaimedReward(phoneNumber: string): boolean {
  const normalized = normalizePhoneNumber(phoneNumber)
  return validatedPhones.has(normalized)
}

/**
 * Send verification code to phone number
 * In production, integrate with Twilio, AWS SNS, or similar service
 */
export async function sendVerificationCode(
  userId: string,
  phoneNumber: string
): Promise<{ success: boolean; validationId: string; error?: string }> {
  try {
    const normalized = normalizePhoneNumber(phoneNumber)
    const code = generateVerificationCode()
    const validationId = `val_${Date.now()}_${userId}`

    const validation: PhoneValidation = {
      id: validationId,
      userId,
      phoneNumber: normalized,
      verificationCode: code,
      isValidated: false,
      rewardClaimed: false,
      rewardAmount: 10.00, // $10 reward
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes
    }

    phoneValidations.set(validationId, validation)

    // In production, send SMS via Twilio/AWS SNS
    console.log(`[PHONE VALIDATION] Sending code ${code} to ${normalized}`)
    // await twilioClient.messages.create({
    //   body: `Your Mothership verification code is: ${code}. Valid for 15 minutes.`,
    //   to: normalized,
    //   from: process.env.TWILIO_PHONE_NUMBER
    // })

    return { success: true, validationId }
  } catch (error) {
    console.error('Error sending verification code:', error)
    return {
      success: false,
      validationId: '',
      error: 'Failed to send verification code'
    }
  }
}

/**
 * Verify the code and validate phone number
 */
export async function verifyPhoneCode(
  validationId: string,
  code: string
): Promise<{
  success: boolean
  canClaimReward: boolean
  rewardAmount?: number
  error?: string
}> {
  const validation = phoneValidations.get(validationId)

  if (!validation) {
    return {
      success: false,
      canClaimReward: false,
      error: 'Validation request not found'
    }
  }

  // Check if expired
  if (new Date() > new Date(validation.expiresAt)) {
    return {
      success: false,
      canClaimReward: false,
      error: 'Verification code expired'
    }
  }

  // Check if already validated
  if (validation.isValidated) {
    return {
      success: false,
      canClaimReward: false,
      error: 'Phone already validated'
    }
  }

  // Verify code
  if (validation.verificationCode !== code) {
    return {
      success: false,
      canClaimReward: false,
      error: 'Invalid verification code'
    }
  }

  // Mark as validated
  validation.isValidated = true
  validation.validatedAt = new Date().toISOString()

  // Check if phone already claimed reward
  const canClaimReward = !hasPhoneClaimedReward(validation.phoneNumber)

  return {
    success: true,
    canClaimReward,
    rewardAmount: canClaimReward ? validation.rewardAmount : undefined
  }
}

/**
 * Claim the validation reward
 * Can only be claimed once per phone number
 */
export async function claimValidationReward(
  validationId: string
): Promise<{
  success: boolean
  rewardAmount?: number
  error?: string
}> {
  const validation = phoneValidations.get(validationId)

  if (!validation) {
    return {
      success: false,
      error: 'Validation request not found'
    }
  }

  if (!validation.isValidated) {
    return {
      success: false,
      error: 'Phone not validated yet'
    }
  }

  if (validation.rewardClaimed) {
    return {
      success: false,
      error: 'Reward already claimed'
    }
  }

  // Check if this phone already claimed reward (double check)
  if (hasPhoneClaimedReward(validation.phoneNumber)) {
    return {
      success: false,
      error: 'This phone number has already claimed the validation reward'
    }
  }

  // Mark reward as claimed
  validation.rewardClaimed = true
  validation.rewardClaimedAt = new Date().toISOString()

  // Add to set of phones that claimed rewards
  validatedPhones.add(validation.phoneNumber)

  // In production, add reward to user's account
  console.log(`[PHONE VALIDATION] Awarding $${validation.rewardAmount} to user ${validation.userId}`)

  return {
    success: true,
    rewardAmount: validation.rewardAmount
  }
}

/**
 * Get validation status
 */
export function getValidationStatus(
  validationId: string
): PhoneValidation | null {
  return phoneValidations.get(validationId) || null
}

/**
 * Check if user's phone is validated
 */
export function isPhoneValidated(userId: string): boolean {
  for (const validation of phoneValidations.values()) {
    if (validation.userId === userId && validation.isValidated) {
      return true
    }
  }
  return false
}

/**
 * Get user's phone validation
 */
export function getUserPhoneValidation(userId: string): PhoneValidation | null {
  for (const validation of phoneValidations.values()) {
    if (validation.userId === userId) {
      return validation
    }
  }
  return null
}

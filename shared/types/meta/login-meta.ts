export type TLoginMeta = {
    failedLoginAttempts?: number
    lastFailedLogin?: Date | null
    isLocked?: boolean 
    lockedUntil?: Date | null
    otpSent?: boolean
    otpExpiresAt?: Date
    nextStep?: string
    hasNextStep? : boolean
}
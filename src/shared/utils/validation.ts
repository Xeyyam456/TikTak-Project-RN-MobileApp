import i18n from '@shared/i18n/i18n';

export function validateName(value: string): string | undefined {
  if (!value.trim()) return i18n.t('validation.nameRequired');
  return undefined;
}

const AZ_PHONE_PREFIX = '+994';

export function applyAzPhonePrefix(text: string): string {
  let digits = text.replace(/\D/g, '');
  if (digits.startsWith('994')) {
    digits = digits.slice(3);
  }
  return AZ_PHONE_PREFIX + digits;
}

export function validatePhone(value: string): string | undefined {
  if (!value.trim() || value.trim() === AZ_PHONE_PREFIX) {
    return i18n.t('validation.phoneRequired');
  }
  if (!/^\+?\d{9,15}$/.test(value.trim())) {
    return i18n.t('validation.phoneInvalid');
  }
  return undefined;
}

export function validatePassword(value: string): string | undefined {
  if (!value) return i18n.t('validation.passwordRequired');
  if (value.length < 6) return i18n.t('validation.passwordTooShort');
  return undefined;
}

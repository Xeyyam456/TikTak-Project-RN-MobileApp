export function validateName(value: string): string | undefined {
  if (!value.trim()) return 'Ad, soyad daxil edin';
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
    return 'Telefon nömrəsi daxil edin';
  }
  if (!/^\+?\d{9,15}$/.test(value.trim())) {
    return 'Düzgün telefon nömrəsi daxil edin';
  }
  return undefined;
}

export function validatePassword(value: string): string | undefined {
  if (!value) return 'Parol daxil edin';
  if (value.length < 6) return 'Parol ən azı 6 simvol olmalıdır';
  return undefined;
}

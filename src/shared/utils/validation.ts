export function validateName(value: string): string | undefined {
  if (!value.trim()) return 'Ad, soyad daxil edin';
  return undefined;
}

export function validatePhone(value: string): string | undefined {
  if (!value.trim()) return 'Telefon nömrəsi daxil edin';
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

import {
  validateName,
  validatePassword,
  validatePhone,
} from './validation';

describe('validateName', () => {
  it('returns an error for an empty value', () => {
    expect(validateName('')).toBe('Ad, soyad daxil edin');
  });

  it('returns an error for a whitespace-only value', () => {
    expect(validateName('   ')).toBe('Ad, soyad daxil edin');
  });

  it('returns undefined for a non-empty value', () => {
    expect(validateName('Elvin Aliyev')).toBeUndefined();
  });
});

describe('validatePhone', () => {
  it('returns an error for an empty value', () => {
    expect(validatePhone('')).toBe('Telefon nömrəsi daxil edin');
  });

  it('returns an error for a value with too few digits', () => {
    expect(validatePhone('12345')).toBe('Düzgün telefon nömrəsi daxil edin');
  });

  it('returns an error for a value with non-digit characters', () => {
    expect(validatePhone('994-50-123-45-67')).toBe(
      'Düzgün telefon nömrəsi daxil edin',
    );
  });

  it('accepts a plain digit string within range', () => {
    expect(validatePhone('994501234567')).toBeUndefined();
  });

  it('accepts a value with a leading +', () => {
    expect(validatePhone('+994501234567')).toBeUndefined();
  });
});

describe('validatePassword', () => {
  it('returns an error for an empty value', () => {
    expect(validatePassword('')).toBe('Parol daxil edin');
  });

  it('returns an error for a value shorter than 6 characters', () => {
    expect(validatePassword('12345')).toBe(
      'Parol ən azı 6 simvol olmalıdır',
    );
  });

  it('accepts a value with 6 or more characters', () => {
    expect(validatePassword('123456')).toBeUndefined();
  });
});

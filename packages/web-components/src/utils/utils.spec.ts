import { createValidId } from './utils';

describe('createValidId', () => {
  it('should convert strings to lowercase and replace spaces with hyphens', () => {
    expect(createValidId('Hello World')).toBe('hello-world');
    expect(createValidId('CBP Listbox Item 1')).toBe('cbp-listbox-item-1');
  });

  it('should normalize accented characters and remove diacritical marks', () => {
    expect(createValidId('café')).toBe('cafe');
    expect(createValidId('Rôle & Résumé')).toBe('role-resume');
    expect(createValidId('Crème brûlée')).toBe('creme-brulee');
    expect(createValidId('Niño Señor')).toBe('nino-senor');
  });

  it('should remove special non-alphanumeric characters except spaces and hyphens', () => {
    expect(createValidId('Hello, World!')).toBe('hello-world');
    expect(createValidId('item_1 (subitem) @#$')).toBe('item1-subitem');
  });

  it('should collapse multiple spaces and hyphens into a single hyphen', () => {
    expect(createValidId('multiple   spaces   here')).toBe('multiple-spaces-here');
    expect(createValidId('too---many---hyphens')).toBe('too-many-hyphens');
    expect(createValidId('mixed ---  spaces  -- and -- hyphens')).toBe('mixed-spaces-and-hyphens');
  });

  it('should trim leading and trailing spaces and hyphens', () => {
    expect(createValidId('  --leading and trailing--  ')).toBe('leading-and-trailing');
    expect(createValidId('-start-end-')).toBe('start-end');
  });

  it('should return an empty string for empty input or input with only special characters', () => {
    expect(createValidId('')).toBe('');
    expect(createValidId('   ')).toBe('');
    expect(createValidId('!@#$%')).toBe('');
    expect(createValidId('---')).toBe('');
  });

  it('should correctly handle alphanumeric mixed strings with numbers', () => {
    expect(createValidId('Item 123 - Test 456')).toBe('item-123-test-456');
  });
});

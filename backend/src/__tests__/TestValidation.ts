import { isNullUndefinedOrEmpty } from '../utils/validation'

test('validating non-empty', () => {
    expect(isNullUndefinedOrEmpty('this is a valid string')).toBe(false);
})

test('empty string returns false', () => {
    expect(isNullUndefinedOrEmpty('')).toBe(true)
})

test('null returns false', () => {
    expect(isNullUndefinedOrEmpty(null)).toBe(true)
})

test('undefined returns false', () => {
    expect(isNullUndefinedOrEmpty(undefined)).toBe(true)
})
import { describe, expect, test } from 'vitest';
import { parse } from '../src/index.js';

describe('parse validation', () => {
	test('rejects a negative index that is not a sentinel', () => {
		expect(() => parse('[{"a":-8}]')).toThrow('Invalid input');
		expect(() => parse('[{"a":-99}]')).toThrow('Invalid input');
	});

	test('rejects a negative index inside a nested value', () => {
		expect(() => parse('[[-8]]')).toThrow('Invalid input');
	});

	test('still accepts the negative sentinels', () => {
		expect(parse('[{"a":-1}]').a).toBe(undefined);
		expect(Number.isNaN(parse('[{"a":-3}]').a)).toBe(true);
		expect(parse('[{"a":-4}]').a).toBe(Infinity);
		expect(parse('[{"a":-5}]').a).toBe(-Infinity);
		expect(Object.is(parse('[{"a":-6}]').a, -0)).toBe(true);
	});

	test('rejects an out-of-range positive index', () => {
		expect(() => parse('[{"a":9}]')).toThrow('Invalid input');
	});
});

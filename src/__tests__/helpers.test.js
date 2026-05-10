import { describe, it, expect, vi } from 'vitest';
import { formatNumber, formatDate, generateMapPositions, trackEvent } from '../utils/helpers';

describe('Utility Functions', () => {
  describe('formatNumber', () => {
    it('formats numbers in Indian locale', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(100000)).toBe('1,00,000');
    });
  });

  describe('formatDate', () => {
    it('formats dates correctly', () => {
      const date = new Date('2025-01-15');
      const formatted = formatDate(date);
      expect(formatted).toContain('Jan');
      expect(formatted).toContain('2025');
    });
  });

  describe('generateMapPositions', () => {
    it('generates correct number of positions', () => {
      const positions = generateMapPositions(10);
      expect(positions).toHaveLength(10);
    });

    it('generates positions with required properties', () => {
      const positions = generateMapPositions(5);
      positions.forEach(pos => {
        expect(pos).toHaveProperty('top');
        expect(pos).toHaveProperty('left');
        expect(pos).toHaveProperty('delay');
      });
    });
  });

  describe('trackEvent', () => {
    it('logs events to console', () => {
      const consoleSpy = vi.spyOn(console, 'log');
      trackEvent('Test', 'Action', 'Label');
      expect(consoleSpy).toHaveBeenCalled();
    });
  });
});

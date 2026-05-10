// Vitest setup file
// This file is configured in vitest.config.js as the setupFiles

import { beforeAll, afterAll, vi } from 'vitest';

// Set up global test utilities
// vi is automatically available when using vitest

// Mock console methods for cleaner test output
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

beforeAll(() => {
  vi.fn = (fn) => {
    const mockFn = (...args) => {
      mockFn.mock.calls.push(args);
      return fn ? fn(...args) : undefined;
    };
    mockFn.mock = { calls: [] };
    return mockFn;
  };
  
  console.log = vi.fn();
  console.error = vi.fn();
});

afterAll(() => {
  console.log = originalConsoleLog;
  console.error = originalConsoleError;
});

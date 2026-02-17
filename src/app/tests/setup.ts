import { vi } from "vitest";

const localStorageMock = (function () {
  let ls: Record<string, string> = {};
  return {
    /* wrapping in vi.fn(), so we can verify the behavior 
      of the functions (getItem(), setItem(), etc.) */
    /* e.g: expect(localStorage.setItem).toHaveBeenCalledWith('isLoggedIn', 'true') */
    getItem: vi.fn((key: string) => ls[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      ls[key] = value.toString();
    }),
    clear: vi.fn(() => {
      ls = {};
    }),
    removeItem: vi.fn((key: string) => {
      delete ls[key];
    }),
  };
})();

/* stubs the global object */
vi.stubGlobal("localStorage", localStorageMock);

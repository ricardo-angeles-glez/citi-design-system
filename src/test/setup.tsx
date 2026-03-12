import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
    cleanup();
});

// ── Mock framer-motion ──────────────────────
vi.mock('framer-motion', () => ({
    motion: new Proxy(
        {},
        {
            get: (_target, prop: string) => {
                // Return a forwardRef component that renders the HTML element
                return ({
                    children,
                    initial: _i,
                    animate: _a,
                    exit: _e,
                    transition: _t,
                    variants: _v,
                    whileHover: _wh,
                    whileTap: _wt,
                    onMouseEnter,
                    onMouseLeave,
                    ...rest
                }: any) => {
                    const Element = prop as any;
                    return (
                        <Element
              onMouseEnter= { onMouseEnter }
                    onMouseLeave = { onMouseLeave }
                    {...rest
        }
        >
        { children }
        </Element>
    );
};
      },
    }
  ),
AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{ children } </>
),
    useAnimation: () => ({
        start: vi.fn(),
        set: vi.fn(),
    }),
}));

// ── Mock i18next ────────────────────────────
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
        i18n: {
            language: 'es',
            changeLanguage: vi.fn(),
        },
    }),
    Trans: ({ children }: { children: React.ReactNode }) => <>{ children } </>,
}));

// ── Mock IntersectionObserver ────────────────
class MockIntersectionObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
}
vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

// ── Mock matchMedia ─────────────────────────
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});
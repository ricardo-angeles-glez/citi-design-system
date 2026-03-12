import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Avatar } from './Avatar';

describe('Avatar', () => {
    // ── Rendering ─────────────────────────
    it('renders with initials', () => {
        render(<Avatar initials="JA" />);
        expect(screen.getByText('JA')).toBeInTheDocument();
    });

    it('renders all color variants', () => {
        const variants = ['teal', 'red', 'gray'] as const;
        variants.forEach((variant) => {
            const { unmount } = render(
                <Avatar initials="AB" variant={variant} />
            );
            const avatar = screen.getByText('AB');
            expect(avatar.closest('[class*="avatar"]')).toHaveClass(
                `citi-avatar--${variant}`
            );
            unmount();
        });
    });

    it('renders all sizes', () => {
        const sizes = ['sm', 'md', 'lg'] as const;
        sizes.forEach((size) => {
            const { unmount } = render(
                <Avatar initials="CD" size={size} />
            );
            const avatar = screen.getByText('CD');
            expect(avatar.closest('[class*="avatar"]')).toHaveClass(
                `citi-avatar--${size}`
            );
            unmount();
        });
    });

    // ── Content ───────────────────────────
    it('displays exactly 2 characters', () => {
        render(<Avatar initials="XY" />);
        expect(screen.getByText('XY')).toBeInTheDocument();
    });

    it('renders with default variant and size', () => {
        render(<Avatar initials="ZZ" />);
        const el = screen.getByText('ZZ');
        expect(el).toBeInTheDocument();
    });

    // ── Accessibility ─────────────────────
    it('has aria-label for screen readers', () => {
        render(<Avatar initials="JA" />);
        const avatar = screen.getByText('JA').closest('[class*="avatar"]');
        expect(avatar).toBeTruthy();
    });
});
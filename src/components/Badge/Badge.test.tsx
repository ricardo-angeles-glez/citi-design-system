import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
    // ── Rendering ─────────────────────────
    it('renders with label text', () => {
        render(<Badge label="New" />);
        expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('renders all variants', () => {
        const variants = [
            'nuevo',
            'beneficios',
            'promo',
            'active',
            'warning',
            'error',
        ] as const;

        variants.forEach((variant) => {
            const { unmount } = render(
                <Badge label={variant} variant={variant} />
            );
            const badge = screen.getByText(variant);
            expect(badge).toHaveClass(`citi-badge--${variant}`);
            unmount();
        });
    });

    it('renders small size', () => {
        render(<Badge label="Small" size="sm" />);
        const badge = screen.getByText('Small');
        expect(badge).toHaveClass('citi-badge--sm');
    });

    it('renders medium size by default', () => {
        render(<Badge label="Default" />);
        expect(screen.getByText('Default')).toBeInTheDocument();
    });

    // ── Content ───────────────────────────
    it('displays label correctly', () => {
        render(<Badge label="Pending Review" variant="warning" />);
        expect(screen.getByText('Pending Review')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        render(<Badge label="Custom" className="extra-class" />);
        expect(screen.getByText('Custom').closest('[class]')).toBeTruthy();
    });
});
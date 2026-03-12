import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
    // ── Rendering ─────────────────────────
    it('renders with children text', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('renders all variants', () => {
        const variants = ['primary', 'secondary', 'ghost', 'danger'] as const;
        variants.forEach((variant) => {
            const { unmount } = render(<Button variant={variant}>{variant}</Button>);
            const btn = screen.getByRole('button', { name: variant });
            expect(btn).toHaveClass(`citi-button--${variant}`);
            unmount();
        });
    });

    it('renders all sizes', () => {
        const sizes = ['sm', 'md', 'lg'] as const;
        sizes.forEach((size) => {
            const { unmount } = render(<Button size={size}>{size}</Button>);
            const btn = screen.getByRole('button', { name: size });
            expect(btn).toHaveClass(`citi-button--${size}`);
            unmount();
        });
    });

    // ── Interaction ───────────────────────
    it('calls onClick when clicked', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click</Button>);
        fireEvent.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick} disabled>Disabled</Button>);
        fireEvent.click(screen.getByRole('button'));
        expect(handleClick).not.toHaveBeenCalled();
    });

    // ── States ────────────────────────────
    it('renders disabled state', () => {
        render(<Button disabled>Disabled</Button>);
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('renders loading state', () => {
        render(<Button isLoading>Loading</Button>);
        const btn = screen.getByRole('button');
        expect(btn).toHaveClass('citi-button--loading');
        expect(btn).toBeDisabled();
    });

    it('renders fullWidth', () => {
        render(<Button fullWidth>Full</Button>);
        expect(screen.getByRole('button')).toHaveClass('citi-button--full-width');
    });

    // ── Accessibility ─────────────────────
    it('is focusable', () => {
        render(<Button>Focus me</Button>);
        const btn = screen.getByRole('button');
        btn.focus();
        expect(btn).toHaveFocus();
    });

    it('is not focusable when disabled', () => {
        render(<Button disabled>No focus</Button>);
        const btn = screen.getByRole('button');
        expect(btn).toBeDisabled();
    });
});
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Toast } from './Toast';

describe('Toast', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    const defaultProps = {
        id: '1',
        message: 'Test notification',
        variant: 'success' as const,
        onClose: vi.fn(),
    };

    // ── Rendering ─────────────────────────
    it('renders message', () => {
        render(<Toast {...defaultProps} />);
        expect(screen.getByText('Test notification')).toBeInTheDocument();
    });

    it('renders all variants', () => {
        const variants = ['success', 'error', 'warning', 'info'] as const;
        variants.forEach((variant) => {
            const { unmount } = render(
                <Toast {...defaultProps} variant={variant} message={variant} />
            );
            expect(screen.getByText(variant)).toBeInTheDocument();
            unmount();
        });
    });

    // ── Close Behavior ────────────────────
    it('calls onClose when close button is clicked', () => {
        const onClose = vi.fn();
        render(<Toast {...defaultProps} onClose={onClose} />);
        const closeBtn = screen.getByLabelText('Cerrar notificación');
        fireEvent.click(closeBtn);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('auto-dismisses after duration', () => {
        const onClose = vi.fn();
        render(<Toast {...defaultProps} onClose={onClose} duration={3000} />);

        act(() => {
            vi.advanceTimersByTime(3000);
        });

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not auto-dismiss when duration is 0', () => {
        const onClose = vi.fn();
        render(<Toast {...defaultProps} onClose={onClose} duration={0} />);

        act(() => {
            vi.advanceTimersByTime(10000);
        });

        expect(onClose).not.toHaveBeenCalled();
    });

    // ── Accessibility ─────────────────────
    it('has role="alert"', () => {
        render(<Toast {...defaultProps} />);
        expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('has aria-live="assertive" for errors', () => {
        render(<Toast {...defaultProps} variant="error" />);
        const alert = screen.getByRole('alert');
        expect(alert).toHaveAttribute('aria-live', 'assertive');
    });

    it('has aria-live="polite" for non-errors', () => {
        render(<Toast {...defaultProps} variant="success" />);
        const alert = screen.getByRole('alert');
        expect(alert).toHaveAttribute('aria-live', 'polite');
    });

    it('close button has accessible label', () => {
        render(<Toast {...defaultProps} />);
        expect(screen.getByLabelText('Cerrar notificación')).toBeInTheDocument();
    });
});
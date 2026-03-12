import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from './Modal';

describe('Modal', () => {
    const defaultProps = {
        isOpen: true,
        onClose: vi.fn(),
        title: 'Test Modal',
    };

    // ── Rendering ─────────────────────────
    it('renders when isOpen is true', () => {
        render(<Modal {...defaultProps} />);
        expect(screen.getByText('Test Modal')).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
        render(<Modal {...defaultProps} isOpen={false} />);
        expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    });

    it('renders description', () => {
        render(
            <Modal {...defaultProps} description="Are you sure?" />
        );
        expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    });

    it('renders children', () => {
        render(
            <Modal {...defaultProps}>
                <p>Custom content</p>
            </Modal>
        );
        expect(screen.getByText('Custom content')).toBeInTheDocument();
    });

    // ── Actions ───────────────────────────
    it('renders primary action button', () => {
        const onAction = vi.fn();
        render(
            <Modal
                {...defaultProps}
                primaryAction={{ label: 'Confirm', onClick: onAction }}
            />
        );
        const btn = screen.getByRole('button', { name: 'Confirm' });
        fireEvent.click(btn);
        expect(onAction).toHaveBeenCalledTimes(1);
    });

    it('renders secondary action button', () => {
        const onSecondary = vi.fn();
        render(
            <Modal
                {...defaultProps}
                secondaryAction={{ label: 'Cancel', onClick: onSecondary }}
            />
        );
        const btn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(btn);
        expect(onSecondary).toHaveBeenCalledTimes(1);
    });

    // ── Close Behavior ────────────────────
    it('calls onClose when close button is clicked', () => {
        const onClose = vi.fn();
        render(<Modal {...defaultProps} onClose={onClose} />);
        const closeBtn = screen.getByLabelText('Cerrar');
        fireEvent.click(closeBtn);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose on Escape key', () => {
        const onClose = vi.fn();
        render(<Modal {...defaultProps} onClose={onClose} />);
        fireEvent.keyDown(document, { key: 'Escape' });
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when clicking overlay', () => {
        const onClose = vi.fn();
        render(<Modal {...defaultProps} onClose={onClose} />);
        const overlay = screen.getByRole('presentation');
        fireEvent.click(overlay);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not close when clicking modal content', () => {
        const onClose = vi.fn();
        render(<Modal {...defaultProps} onClose={onClose} />);
        const dialog = screen.getByRole('dialog');
        fireEvent.click(dialog);
        expect(onClose).not.toHaveBeenCalled();
    });

    // ── Variants ──────────────────────────
    it('renders danger variant with icon', () => {
        render(<Modal {...defaultProps} variant="danger" />);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renders success variant with icon', () => {
        render(<Modal {...defaultProps} variant="success" />);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // ── Accessibility ─────────────────────
    it('has role="dialog" and aria-modal', () => {
        render(<Modal {...defaultProps} />);
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    it('has aria-labelledby pointing to title', () => {
        render(<Modal {...defaultProps} />);
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
    });

    it('has aria-describedby when description is provided', () => {
        render(<Modal {...defaultProps} description="Description text" />);
        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAttribute('aria-describedby', 'modal-description');
    });
});
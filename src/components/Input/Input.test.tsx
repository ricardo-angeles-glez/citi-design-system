import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
    // ── Rendering ─────────────────────────
    it('renders with placeholder', () => {
        render(<Input placeholder="Enter text" />);
        expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders with label', () => {
        render(<Input label="Email" placeholder="test" />);
        expect(screen.getByText('Email')).toBeInTheDocument();
    });

    // ── Interaction ───────────────────────
    it('handles text input', async () => {
        const user = userEvent.setup();
        render(<Input placeholder="Type here" />);
        const input = screen.getByPlaceholderText('Type here');
        await user.type(input, 'Hello World');
        expect(input).toHaveValue('Hello World');
    });

    it('calls onChange', () => {
        const handleChange = vi.fn();
        render(<Input placeholder="test" onChange={handleChange} />);
        fireEvent.change(screen.getByPlaceholderText('test'), {
            target: { value: 'new value' },
        });
        expect(handleChange).toHaveBeenCalled();
    });

    // ── States ────────────────────────────
    it('renders disabled state', () => {
        render(<Input placeholder="disabled" disabled />);
        expect(screen.getByPlaceholderText('disabled')).toBeDisabled();
    });

    it('renders error state with message', () => {
        render(<Input placeholder="error" error="Required field" />);
        expect(screen.getByText('Required field')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('error')).toHaveAttribute(
            'aria-invalid',
            'true'
        );
    });

    it('renders password type', () => {
        render(<Input placeholder="password" type="password" />);
        expect(screen.getByPlaceholderText('password')).toHaveAttribute(
            'type',
            'password'
        );
    });

    // ── Accessibility ─────────────────────
    it('associates label with input', () => {
        render(<Input label="Username" placeholder="user" />);
        const input = screen.getByPlaceholderText('user');
        expect(input).toBeInTheDocument();
    });

    it('marks invalid input with aria-invalid', () => {
        render(<Input placeholder="err" error="Error" />);
        expect(screen.getByPlaceholderText('err')).toHaveAttribute(
            'aria-invalid',
            'true'
        );
    });
});
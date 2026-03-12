import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
    it('renders with label', () => {
        render(<Checkbox label="Accept terms" />);
        expect(screen.getByText('Accept terms')).toBeInTheDocument();
    });

    it('renders unchecked by default', () => {
        render(<Checkbox label="Test" />);
        expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'false');
    });

    it('renders checked state', () => {
        render(<Checkbox label="Test" checked />);
        expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true');
    });

    it('renders indeterminate state', () => {
        render(<Checkbox label="Test" indeterminate />);
        expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'mixed');
    });

    it('calls onChange on click', () => {
        const onChange = vi.fn();
        render(<Checkbox label="Click me" onChange={onChange} />);
        fireEvent.click(screen.getByRole('checkbox'));
        expect(onChange).toHaveBeenCalledWith(true);
    });

    it('calls onChange with false when checked', () => {
        const onChange = vi.fn();
        render(<Checkbox label="Uncheck" checked onChange={onChange} />);
        fireEvent.click(screen.getByRole('checkbox'));
        expect(onChange).toHaveBeenCalledWith(false);
    });

    it('does not call onChange when disabled', () => {
        const onChange = vi.fn();
        render(<Checkbox label="Disabled" disabled onChange={onChange} />);
        fireEvent.click(screen.getByRole('checkbox'));
        expect(onChange).not.toHaveBeenCalled();
    });

    it('handles keyboard activation', () => {
        const onChange = vi.fn();
        render(<Checkbox label="Key" onChange={onChange} />);
        fireEvent.keyDown(screen.getByRole('checkbox'), { key: ' ' });
        expect(onChange).toHaveBeenCalledWith(true);
    });

    it('renders error state', () => {
        render(<Checkbox label="Required" error="This field is required" />);
        expect(screen.getByText('This field is required')).toBeInTheDocument();
        expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
    });
});
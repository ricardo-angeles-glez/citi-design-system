import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RadioGroup } from './Radio';

const options = [
    { value: 'mxn', label: 'MXN - Peso Mexicano' },
    { value: 'usd', label: 'USD - US Dollar' },
    { value: 'eur', label: 'EUR - Euro' },
];

describe('RadioGroup', () => {
    it('renders all options', () => {
        render(<RadioGroup name="currency" options={options} />);
        expect(screen.getByText('MXN - Peso Mexicano')).toBeInTheDocument();
        expect(screen.getByText('USD - US Dollar')).toBeInTheDocument();
        expect(screen.getByText('EUR - Euro')).toBeInTheDocument();
    });

    it('renders with label', () => {
        render(<RadioGroup name="currency" options={options} label="Currency" />);
        expect(screen.getByText('Currency')).toBeInTheDocument();
    });

    it('shows selected value', () => {
        render(<RadioGroup name="currency" options={options} value="usd" />);
        const radios = screen.getAllByRole('radio');
        expect(radios[1]).toHaveAttribute('aria-checked', 'true');
    });

    it('calls onChange on click', () => {
        const onChange = vi.fn();
        render(<RadioGroup name="currency" options={options} onChange={onChange} />);
        fireEvent.click(screen.getByText('EUR - Euro'));
        expect(onChange).toHaveBeenCalledWith('eur');
    });

    it('does not call onChange when disabled', () => {
        const onChange = vi.fn();
        render(<RadioGroup name="currency" options={options} disabled onChange={onChange} />);
        fireEvent.click(screen.getByText('MXN - Peso Mexicano'));
        expect(onChange).not.toHaveBeenCalled();
    });

    it('renders error state', () => {
        render(<RadioGroup name="currency" options={options} error="Please select" />);
        expect(screen.getByText('Please select')).toBeInTheDocument();
    });

    it('has radiogroup role', () => {
        render(<RadioGroup name="currency" options={options} label="Currency" />);
        expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });

    it('renders horizontal direction', () => {
        render(<RadioGroup name="currency" options={options} direction="horizontal" />);
        const group = screen.getByRole('radiogroup');
        expect(group).toHaveClass('citi-radio-group--horizontal');
    });
});
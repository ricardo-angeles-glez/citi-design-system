import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Select } from './Select';

const options = [
    { value: 'mx', label: 'México' },
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'disabled', label: 'Disabled Option', disabled: true },
];

describe('Select', () => {
    it('renders with placeholder', () => {
        render(<Select options={options} placeholder="Choose country" />);
        expect(screen.getByText('Choose country')).toBeInTheDocument();
    });

    it('renders with label', () => {
        render(<Select options={options} label="Country" />);
        expect(screen.getByText('Country')).toBeInTheDocument();
    });

    it('shows selected value', () => {
        render(<Select options={options} value="mx" />);
        expect(screen.getByText('México')).toBeInTheDocument();
    });

    it('opens dropdown on click', () => {
        render(<Select options={options} />);
        fireEvent.click(screen.getByRole('combobox'));
        expect(screen.getByRole('listbox')).toBeInTheDocument();
        expect(screen.getAllByRole('option')).toHaveLength(4);
    });

    it('selects option on click', () => {
        const onChange = vi.fn();
        render(<Select options={options} onChange={onChange} />);
        fireEvent.click(screen.getByRole('combobox'));
        fireEvent.click(screen.getByText('United States'));
        expect(onChange).toHaveBeenCalledWith('us');
    });

    it('does not select disabled option', () => {
        const onChange = vi.fn();
        render(<Select options={options} onChange={onChange} />);
        fireEvent.click(screen.getByRole('combobox'));
        fireEvent.click(screen.getByText('Disabled Option'));
        expect(onChange).not.toHaveBeenCalled();
    });

    it('renders error state', () => {
        render(<Select options={options} error="Required field" />);
        expect(screen.getByText('Required field')).toBeInTheDocument();
    });

    it('does not open when disabled', () => {
        render(<Select options={options} disabled />);
        fireEvent.click(screen.getByRole('combobox'));
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('closes on Escape', () => {
        render(<Select options={options} />);
        fireEvent.click(screen.getByRole('combobox'));
        expect(screen.getByRole('listbox')).toBeInTheDocument();
        fireEvent.keyDown(document, { key: 'Escape' });
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('has proper aria attributes', () => {
        render(<Select options={options} />);
        const combobox = screen.getByRole('combobox');
        expect(combobox).toHaveAttribute('aria-expanded', 'false');
        expect(combobox).toHaveAttribute('aria-haspopup', 'listbox');
    });
});
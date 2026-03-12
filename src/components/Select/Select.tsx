import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import './Select.css';

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface SelectProps {
    options: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    label?: string;
    error?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    className?: string;
}

export const Select: React.FC<SelectProps> = ({
    options,
    value,
    onChange,
    placeholder = 'Select an option',
    label,
    error,
    disabled = false,
    fullWidth = false,
    className = '',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    const close = useCallback(() => {
        setIsOpen(false);
        setFocusedIndex(-1);
    }, []);

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                close();
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [close]);

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                close();
            }
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [isOpen, close]);

    // Scroll focused item into view
    useEffect(() => {
        if (isOpen && focusedIndex >= 0 && listRef.current) {
            const items = listRef.current.querySelectorAll('[role="option"]');
            try {
                items[focusedIndex]?.scrollIntoView({ block: 'nearest' });
            } catch {
                // scrollIntoView not available in test environment
            }
        }
    }, [focusedIndex, isOpen]);

    const handleToggle = () => {
        if (disabled) return;
        setIsOpen(!isOpen);
        if (!isOpen) {
            const idx = options.findIndex((opt) => opt.value === value);
            setFocusedIndex(idx >= 0 ? idx : 0);
        }
    };

    const handleSelect = (optValue: string) => {
        onChange?.(optValue);
        close();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;

        switch (e.key) {
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (isOpen && focusedIndex >= 0) {
                    const opt = options[focusedIndex];
                    if (opt && !opt.disabled) {
                        handleSelect(opt.value);
                    }
                } else {
                    handleToggle();
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (!isOpen) {
                    setIsOpen(true);
                    setFocusedIndex(0);
                } else {
                    setFocusedIndex((prev) => {
                        let next = prev + 1;
                        while (next < options.length && options[next].disabled) next++;
                        return next < options.length ? next : prev;
                    });
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (isOpen) {
                    setFocusedIndex((prev) => {
                        let next = prev - 1;
                        while (next >= 0 && options[next].disabled) next--;
                        return next >= 0 ? next : prev;
                    });
                }
                break;
            case 'Home':
                e.preventDefault();
                setFocusedIndex(0);
                break;
            case 'End':
                e.preventDefault();
                setFocusedIndex(options.length - 1);
                break;
        }
    };

    const selectClasses = [
        'citi-select',
        error && 'citi-select--error',
        disabled && 'citi-select--disabled',
        isOpen && 'citi-select--open',
        fullWidth && 'citi-select--full-width',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={selectClasses} ref={containerRef}>
            {label && <label className="citi-select__label">{label}</label>}

            <div
                className="citi-select__trigger"
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-invalid={!!error}
                aria-disabled={disabled}
                tabIndex={disabled ? -1 : 0}
                onClick={handleToggle}
                onKeyDown={handleKeyDown}
            >
                <span
                    className={`citi-select__value ${!selectedOption ? 'citi-select__value--placeholder' : ''}`}
                >
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown
                    size={16}
                    className={`citi-select__chevron ${isOpen ? 'citi-select__chevron--open' : ''}`}
                />
            </div>

            {isOpen && (
                <ul
                    ref={listRef}
                    className="citi-select__dropdown"
                    role="listbox"
                    aria-label={label || placeholder}
                >
                    {options.map((option, index) => (
                        <li
                            key={option.value}
                            role="option"
                            aria-selected={option.value === value}
                            aria-disabled={option.disabled}
                            className={[
                                'citi-select__option',
                                option.value === value && 'citi-select__option--selected',
                                option.disabled && 'citi-select__option--disabled',
                                focusedIndex === index && 'citi-select__option--focused',
                            ]
                                .filter(Boolean)
                                .join(' ')}
                            onClick={() => {
                                if (!option.disabled) handleSelect(option.value);
                            }}
                            onMouseEnter={() => {
                                if (!option.disabled) setFocusedIndex(index);
                            }}
                        >
                            {option.label}
                            {option.value === value && (
                                <span className="citi-select__check">✓</span>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {error && (
                <p className="citi-select__error" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};
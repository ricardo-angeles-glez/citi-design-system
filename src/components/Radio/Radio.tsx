import React from 'react';
import './Radio.css';

export interface RadioOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface RadioGroupProps {
    name: string;
    options: RadioOption[];
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
    error?: string;
    disabled?: boolean;
    direction?: 'vertical' | 'horizontal';
    className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
    name,
    options,
    value,
    onChange,
    label,
    error,
    disabled = false,
    direction = 'vertical',
    className = '',
}) => {
    const handleSelect = (optValue: string) => {
        if (disabled) return;
        onChange?.(optValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent, optValue: string, index: number) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            handleSelect(optValue);
        }
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            const next = (index + 1) % options.length;
            const nextEl = document.querySelector(
                `[data-radio-name="${name}"][data-radio-index="${next}"]`
            ) as HTMLElement;
            nextEl?.focus();
            if (!options[next].disabled) handleSelect(options[next].value);
        }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            const prev = (index - 1 + options.length) % options.length;
            const prevEl = document.querySelector(
                `[data-radio-name="${name}"][data-radio-index="${prev}"]`
            ) as HTMLElement;
            prevEl?.focus();
            if (!options[prev].disabled) handleSelect(options[prev].value);
        }
    };

    const groupClasses = [
        'citi-radio-group',
        `citi-radio-group--${direction}`,
        disabled && 'citi-radio-group--disabled',
        error && 'citi-radio-group--error',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={groupClasses} role="radiogroup" aria-label={label}>
            {label && <p className="citi-radio-group__label">{label}</p>}

            <div className="citi-radio-group__options">
                {options.map((option, index) => {
                    const isSelected = option.value === value;
                    const isDisabled = disabled || option.disabled;

                    return (
                        <div
                            key={option.value}
                            className={[
                                'citi-radio',
                                isSelected && 'citi-radio--selected',
                                isDisabled && 'citi-radio--disabled',
                            ]
                                .filter(Boolean)
                                .join(' ')}
                            role="radio"
                            aria-checked={isSelected}
                            aria-disabled={isDisabled}
                            tabIndex={isSelected ? 0 : isDisabled ? -1 : -1}
                            data-radio-name={name}
                            data-radio-index={index}
                            onClick={() => !isDisabled && handleSelect(option.value)}
                            onKeyDown={(e) => !isDisabled && handleKeyDown(e, option.value, index)}
                        >
                            <div className="citi-radio__circle">
                                {isSelected && <div className="citi-radio__dot" />}
                            </div>
                            <span className="citi-radio__label">{option.label}</span>
                        </div>
                    );
                })}
            </div>

            {error && (
                <p className="citi-radio-group__error" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};
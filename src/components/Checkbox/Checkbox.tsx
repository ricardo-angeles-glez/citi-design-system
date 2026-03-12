import React from 'react';
import { Check, Minus } from 'lucide-react';
import './Checkbox.css';

export interface CheckboxProps {
    checked?: boolean;
    indeterminate?: boolean;
    onChange?: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    error?: string;
    className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
    checked = false,
    indeterminate = false,
    onChange,
    label,
    disabled = false,
    error,
    className = '',
}) => {
    const handleClick = () => {
        if (disabled) return;
        onChange?.(!checked);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            handleClick();
        }
    };

    const wrapperClasses = [
        'citi-checkbox',
        disabled && 'citi-checkbox--disabled',
        error && 'citi-checkbox--error',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const boxClasses = [
        'citi-checkbox__box',
        (checked || indeterminate) && 'citi-checkbox__box--checked',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={wrapperClasses}>
            <div
                className="citi-checkbox__control"
                role="checkbox"
                aria-checked={indeterminate ? 'mixed' : checked}
                aria-disabled={disabled}
                aria-invalid={!!error}
                tabIndex={disabled ? -1 : 0}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
            >
                <div className={boxClasses}>
                    {checked && !indeterminate && <Check size={14} strokeWidth={3} />}
                    {indeterminate && <Minus size={14} strokeWidth={3} />}
                </div>
                {label && <span className="citi-checkbox__label">{label}</span>}
            </div>
            {error && (
                <p className="citi-checkbox__error" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};
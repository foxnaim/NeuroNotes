'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { IconType } from 'react-icons';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  fullWidth?: boolean;
  leftIcon?: IconType;
  rightIcon?: IconType;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'hover:opacity-90 shadow-lg hover:shadow-xl',
  secondary:
    'border-2 hover:opacity-90',
  outline:
    'bg-transparent border-2 hover:opacity-90',
  ghost:
    'bg-transparent hover:opacity-90'
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
};

function ButtonComponent({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  ...props
}: ButtonProps) {
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Стили для разных вариантов с использованием CSS-переменных
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-primary) 100%)`,
          color: 'var(--color-text-primary)',
        };
      case 'secondary':
        return {
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
          color: 'var(--color-text-primary)',
        };
      case 'outline':
        return {
          borderColor: 'var(--color-primary)',
          color: 'var(--color-primary)',
        };
      case 'ghost':
        return {
          color: 'var(--color-text-primary)',
        };
      default:
        return {};
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <button
      className={`font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      style={{
        fontFamily: 'var(--font-inter), Inter, sans-serif',
        fontSize: '16px',
        ...variantStyles
      }}
      {...props}
    >
      {LeftIcon && <LeftIcon style={{ color: variantStyles.color || 'var(--color-text-primary)' }} />}
      {children}
      {RightIcon && <RightIcon style={{ color: variantStyles.color || 'var(--color-text-primary)' }} />}
    </button>
  );
}

export const Button = ButtonComponent;
export default ButtonComponent;
export type { ButtonProps };

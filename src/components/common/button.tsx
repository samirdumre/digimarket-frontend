"use client"

import {cva} from 'class-variance-authority';
import { cn } from '@/lib/utills';

const buttonVarients = cva(
    "hover:opacity-75 cursor-pointer",
    {
        variants: {
            variant: {
                primary: 'bg-blue-600 text-white hover:bg-blue-700',
                secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
                outline: 'border-2 border-gray-300 bg-transparent text-gray-900 hover:bg-gray-100 hover:text-gray-900',
                destructive: 'bg-red-600 text-white hover:bg-red-700',
            },
            size: {
                xs: 'h-7 px-2 text-xs font-medium rounded-md',
                sm: 'h-8 px-3 text-sm font-medium rounded-md',
                md: 'h-10 px-4 text-sm font-medium rounded-md',
                lg: 'h-11 px-6 text-base font-medium rounded-lg',
                xl: 'h-12 px-8 text-lg font-semibold rounded-lg',
                icon: 'h-10 w-10 p-0 rounded-md',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        }
    }
)

interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'outline' | 'destructive';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon';
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

function Button({variant, size, children, className, ...props}: ButtonProps) {
    return (
        <button className={cn(buttonVarients({variant, size}), className)} {...props}>{children}</button>
    );
}

export default Button;
import React from 'react';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Link({ href, children, onClick, className = '' }: LinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`block text-gray-600 hover:text-blue-600 transition-colors font-medium ${className}`}
    >
      {children}
    </a>
  );
}
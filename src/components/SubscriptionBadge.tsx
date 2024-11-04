import React from 'react';
import { Crown } from 'lucide-react';
import type { SubscriptionType } from '../types';
import { cn } from '../utils/cn';

interface SubscriptionBadgeProps {
  type: SubscriptionType;
  className?: string;
}

const BADGE_STYLES = {
  free: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    label: 'Gratuit'
  },
  basic: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    label: 'Basic'
  },
  premium: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    label: 'Premium'
  },
  professional: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    label: 'Pro'
  }
} as const;

export default function SubscriptionBadge({ type, className }: SubscriptionBadgeProps) {
  const style = BADGE_STYLES[type] || BADGE_STYLES.free;
  
  return (
    <span 
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        style.bg,
        style.text,
        className
      )}
    >
      {(type === 'premium' || type === 'professional') && (
        <Crown size={12} className="mr-1" />
      )}
      {style.label}
    </span>
  );
}
import React from 'react';
import { cn } from '@/lib/utils';

export type StatusType = 'online' | 'away' | 'busy' | 'offline';

interface StatusIndicatorProps {
  status: StatusType;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const statusConfig = {
  online: 'status-online',
  away: 'status-away',
  busy: 'status-busy',
  offline: 'status-offline',
};

const sizeConfig = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
};

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = 'md',
  className,
}) => {
  return (
    <div
      className={cn(
        'status-dot',
        statusConfig[status],
        sizeConfig[size],
        className
      )}
    />
  );
};
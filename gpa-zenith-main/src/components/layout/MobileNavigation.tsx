import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Search, BookOpen, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export const MobileNavigation: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const navItems = [
    {
      to: '/',
      icon: Home,
      label: t('home'),
    },
    {
      to: '/search',
      icon: Search,
      label: t('search'),
    },
    {
      to: '/tips',
      icon: BookOpen,
      label: t('tips'),
    },
    {
      to: '/account',
      icon: User,
      label: t('account'),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-custom-lg z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive: active }) =>
                cn(
                  'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200',
                  active || isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                )
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
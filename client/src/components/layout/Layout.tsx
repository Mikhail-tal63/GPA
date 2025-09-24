import React from 'react';
import { useTranslation } from 'node_modules/react-i18next';
import { Outlet } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileNavigation } from './MobileNavigation';
import { DesktopSidebar } from './DesktopSidebar';
import { Header } from './Header';

export const Layout: React.FC = () => {
  const { i18n } = useTranslation();
  const isMobile = useIsMobile();
  const isRTL = i18n.language === 'ar';

  React.useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [isRTL, i18n.language]);

  return (
    <div className="min-h-screen bg-background w-full">
      {/* Desktop Layout */}
      {!isMobile && (
        <div className="flex min-h-screen">
          <DesktopSidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-6">
              <div className="max-w-4xl mx-auto">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      )}

      {/* Mobile Layout */}
      {isMobile && (
        <div className="flex flex-col min-h-screen pb-16">
          <Header />
          <main className="flex-1 p-4">
            <Outlet />
          </main>
          <MobileNavigation />
        </div>
      )}
    </div>
  );
};
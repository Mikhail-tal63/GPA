import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Search, BookOpen, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "@/Aouth/UserAtom"; // عدّل المسار حسب مشروعك
import { cn } from "@/lib/utils";

export const DesktopSidebar: React.FC = () => {
  const { t } = useTranslation();
  const user = useRecoilValue(userAtom); // ✅ بدل useAuth
  const setUser = useSetRecoilState(userAtom); // لاستخدام logout
  const location = useLocation();

  const navItems = [
    { to: "/", icon: Home, label: t("home") },
    { to: "/search", icon: Search, label: t("search") },
    { to: "/tips", icon: BookOpen, label: t("tips") },
    { to: "/account", icon: User, label: t("account") },
  ];

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userData");
    localStorage.removeItem("authToken");
  };
  return (
    <aside className="w-64 bg-card border-r shadow-custom-sm h-screen sticky top-0">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className=""></div>
            <div>
              <h1 className="text-lg font-bold text-foreground">GPA Manager</h1>
              <p className="text-xs text-muted-foreground">
                Academic Excellence
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive: active }) =>
                    cn(
                      "nav-item w-full justify-start",
                      active || isActive ? "active" : ""
                    )
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* User Section */}
        {user && (
          <div className="p-4 border-t">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
            </div>
            <Separator className="mb-3" />
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t("logout")}
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
};

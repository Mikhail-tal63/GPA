import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, Globe, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRecoilValue } from "recoil";
import userAtom from "@/Aouth/UserAtom";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="border-b bg-card shadow-custom-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">GPA</span>
          </div>
          <h1 className="text-lg font-semibold text-foreground">
            {t("welcome")}
          </h1>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <form onSubmit={handleSearch} className="flex w-full gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder={t("searchUsers")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          {/* 🌍 Language toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-2"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm">{i18n.language.toUpperCase()}</span>
          </Button>

          {user && (
            <div className="flex items-center gap-2">
              <div className="relative">
                {/* 🟢 Priority: iconUrl > avatarUrl > default */}
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt="icon"
                    className="w-8 h-8 rounded-full object-cover border border-muted-foreground"
                  />
                ) : user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}

                <StatusIndicator
                  status="online"
                  size="sm"
                  className="absolute -bottom-0.5 -right-0.5 border-2 border-background"
                />
              </div>

              {/* 👤 Name + privacy badge */}
              <div className="hidden sm:block">
                <p className="text-sm font-medium flex items-center gap-1">
                  {user.name}
                  {user.iconUrl && (
                    <img
                      src={user.iconUrl}
                      alt="icon"
                      className="w-4 h-4 rounded-full object-cover border border-muted-foreground"
                    />
                  )}
                </p>
                <Badge
                  variant={user.privacy ? "secondary" : "default"}
                  className="text-xs"
                >
                  {user.privacy ? t("private") : t("public")}
                </Badge>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder={t("searchUsers")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </form>
      </div>
    </header>
  );
};

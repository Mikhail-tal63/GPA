import { LogOut } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import {
  User,
  Camera,
  Lock,
  Unlock,
  Save,
  GraduationCap,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { supabase } from "../config/supabase.config.js";

import axios from "axios";
import { useToast } from "@/hooks/use-toast";

// 🟢 استيراد Recoil
import { useRecoilState } from "recoil";
import userAtom from "../Aouth/UserAtom.js";

export const Profile: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // 🟢 بدل useState(user) → Recoil
  const [user, setUser] = useRecoilState(userAtom);

  const [formData, setFormData] = useState({
    name: "",
    status: "Excited to learn!",
    privacy: false,
    newPassword: "",
  });

  const avatarRef = useRef<HTMLInputElement | null>(null);
  const iconRef = useRef<HTMLInputElement | null>(null);

  // 🟢 جلب اليوزر وحفظه في Recoil
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/users/me", {
          withCredentials: true,
        });
        setUser(res.data); // ✅ خزّن البيانات في الـ atom
        setFormData({
          name: res.data.name,
          status: res.data.status || "",
          privacy: res.data.privacy,
          newPassword: "",
        });
      } catch (err) {
        toast({ title: "Failed to load profile", variant: "destructive" });
      }
    };
    fetchUser();
  }, [setUser, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.put(
        "http://localhost:4000/api/users/update",
        formData,
        { withCredentials: true }
      );
      setUser(res.data); // ✅ تحديث اليوزر في Recoil
      toast({ title: "Profile updated!" });
      setFormData({ ...formData, newPassword: "" });
    } catch (err: any) {
      toast({
        title: err.response?.data?.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await axios.post(
        "http://localhost:4000/api/users/logout",
        {},
        { withCredentials: true }
      );
      setUser(null); // إزالة اليوزر من Recoil
      toast({ title: "Logged out successfully!" });
      window.location.href = "/login"; // تحويل المستخدم لصفحة تسجيل الدخول
    } catch (err: any) {
      console.error(err);
      toast({
        title: err.response?.data?.message || "Failed to logout",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePrivacyToggle = (checked: boolean) => {
    setFormData({ ...formData, privacy: checked });
  };

  // 🟢 إعادة استعمال uploadImage
  const uploadImage = async (file: File, pathToDelete?: string) => {
    try {
      if (pathToDelete) {
        await supabase.storage.from("Threads-clone").remove([pathToDelete]);
      }
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("Threads-clone")
        .upload(`public/${fileName}`, file);

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from("Threads-clone")
        .getPublicUrl(`public/${fileName}`);

      return { url: urlData.publicUrl, path: `public/${fileName}` };
    } catch (err: any) {
      console.error("Upload error:", err.message);
      return null;
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const uploaded = await uploadImage(file, user.avatarPath);
    if (!uploaded) {
      toast({ title: "Failed to upload avatar", variant: "destructive" });
      return;
    }

    const updatedUser = {
      ...user,
      avatarUrl: uploaded.url,
      avatarPath: uploaded.path,
    };
    setUser(updatedUser);

    await axios.put("http://localhost:4000/api/users/update", updatedUser, {
      withCredentials: true,
    });

    toast({ title: "Avatar updated!" });
  };

  const handleIconChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      setIsLoading(true);

      // 🟢 رفع الأيقونة إلى Supabase وحذف القديمة أولاً
      const uploaded = await uploadImage(file, user.iconPath);
      if (!uploaded) {
        toast({ title: "فشل رفع الأيقونة", variant: "destructive" });
        return;
      }

      // 🟢 تحديث بيانات المستخدم محلياً
      const updatedUser = {
        ...user,
        iconUrl: uploaded.url,
        iconPath: uploaded.path,
      };
      setUser(updatedUser);

      // 🟢 تحديث البيانات في السيرفر
      await axios.put(
        "http://localhost:4000/api/users/update",
        { iconUrl: uploaded.url, iconPath: uploaded.path },
        { withCredentials: true }
      );

      toast({ title: "تم تحديث الأيقونة بنجاح!" });
    } catch (err: any) {
      console.error("Icon update error:", err);
      toast({
        title: err.response?.data?.message || "حدث خطأ أثناء تحديث الأيقونة",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="flex justify-end">
        <Button
          variant="destructive"
          size="sm"
          className="flex items-center gap-2"
          onClick={handleLogout}
          disabled={isLoading}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Profile Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <div className="relative">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name || "User"}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">{formData.name}</h2>
                {user?.iconUrl ? (
                  <img
                    src={user.iconUrl}
                    alt="icon"
                    className="w-6 h-6 rounded-full object-cover border border-muted-foreground"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">
                    🧩
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={iconRef}
                  style={{ display: "none" }}
                  onChange={handleIconChange}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={() => iconRef.current?.click()}
                >
                  Change Icon
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={formData.privacy ? "secondary" : "default"}>
                  {formData.privacy ? "Private" : "Public"}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <GraduationCap className="w-3 h-3" />
                  Student
                </Badge>
              </div>
            </div>

            {/* زر تغيير الصورة */}
            <div>
              <input
                type="file"
                accept="image/*"
                ref={avatarRef}
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => avatarRef.current?.click()}
              >
                <Camera className="w-4 h-4" />
                Change Photo
              </Button>
            </div>
          </div>

          <Separator />

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="status"
                    name="status"
                    type="text"
                    placeholder="Short status..."
                    value={formData.status}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="pl-10"
                    maxLength={50}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password (Optional)</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="Leave blank to keep current password"
                value={formData.newPassword}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            {/* Privacy Settings */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Privacy Settings</Label>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {formData.privacy ? (
                    <Lock className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Unlock className="w-5 h-5 text-muted-foreground" />
                  )}
                  <div>
                    <p className="font-medium">
                      {formData.privacy ? "Private" : "Public"} Profile
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formData.privacy
                        ? "Only you can see your GPA and semesters"
                        : "Other users can view your academic progress"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={formData.privacy}
                  onCheckedChange={handlePrivacyToggle}
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Updating...
                </div>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  User, 
  Camera, 
  Lock, 
  Unlock, 
  Save,
  GraduationCap,
  MessageCircle 
  ,LogOut 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { StatusIndicator } from '@/components/ui/status-indicator';
import { useEffect } from 'react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';


export const Profile: React.FC = () => {


const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [formData, setFormData] = useState({
  name: '',
  status: 'Excited to learn!',
  privacy: false,
  newPassword: '',
});



useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/users/me", { withCredentials: true });
      setUser(res.data);
      setFormData({
        name: res.data.name,
        status: res.data.status || '',
        privacy: res.data.privacy,
        newPassword: '',
      });
      
    } catch (err) {
      toast({ title: "Failed to load profile", variant: "destructive" });
    }
  };
  fetchUser();
}, []);

const handleLogout = async () => {
  try {
    await axios.post("http://localhost:4000/api/users/logout", {}, { withCredentials: true });
    toast({ title: "Logged out successfully" });

  
    setUser(null);

    
    window.location.href = "/login"; 
  } catch (err) {
    toast({ title: "Failed to logout", variant: "destructive" });
  }
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    const res = await axios.put(
      "http://localhost:4000/api/users/update",
      formData,
      { withCredentials: true }
    );
    setUser(res.data); 
    toast({ title: "Profile updated!" });
    setFormData({ ...formData, newPassword: "" });
  } catch (err) {
    toast({ title: err.response?.data?.message || "Failed to update profile", variant: "destructive" });
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


  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Profile Header */}
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
                  alt={user.name || 'User' }
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
              )}
              <StatusIndicator
                status="online"
                size="lg"
                className="absolute -bottom-1 -right-1 border-2 border-background"
              />
            </div>
           <div className="flex-1">
  <div className="flex items-center gap-2">
    <h2 className="text-xl font-semibold">{formData.name}</h2>
    {/* الأيقونة الصغيرة يمين الاسم */}
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
    <Button
      variant="ghost"
      size="sm"
      className="h-6 px-2 text-xs"
      onClick={() => document.getElementById("iconUpload")?.click()}
    >
      Change
    </Button>
    <input
      id="iconUpload"
      type="file"
      accept="image/*"
      className="hidden"
      onChange={async (e) => {
        if (!e.target.files?.[0]) return;
        const formDataFile = new FormData();
        formDataFile.append("icon", e.target.files[0]);

        try {
          const res = await axios.post(
            "http://localhost:4000/api/users/upload-icon",
            formDataFile,
            {
              withCredentials: true,
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          setUser((prev) => prev ? { ...prev, iconUrl: res.data.iconUrl } : prev);
          toast({ title: "Icon updated!" });
        } catch {
          toast({ title: "Failed to upload icon", variant: "destructive" });
        }
      }}
    />
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

            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Change Photo
            </Button>
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
                      {formData.privacy ? 'Private' : 'Public'} Profile
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formData.privacy
                        ? 'Only you can see your GPA and semesters'
                        : 'Other users can view your academic progress'}
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

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >

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
                          <Button
  variant="destructive"
  className="w-full flex items-center gap-2"
  onClick={handleLogout}
>
  <LogOut className="w-4 h-4" />
  Logout
</Button>
          </form>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="card-hover text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary mb-2">3.42</div>
            <p className="text-sm text-muted-foreground">Current GPA</p>
          </CardContent>
        </Card>
        <Card className="card-hover text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-accent mb-2">6</div>
            <p className="text-sm text-muted-foreground">Total Semesters</p>
          </CardContent>
        </Card>
        <Card className="card-hover text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-success mb-2">98</div>
            <p className="text-sm text-muted-foreground">Credit Hours</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


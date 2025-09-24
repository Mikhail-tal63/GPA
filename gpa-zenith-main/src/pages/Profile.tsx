import React, { useState } from 'react';
import { 
  User, 
  Camera, 
  Lock, 
  Unlock, 
  Save,
  GraduationCap,
  MessageCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { StatusIndicator } from '@/components/ui/status-indicator';

export const Profile: React.FC = () => {
  // بيانات وهمية للـ user
  const user = {
    name: 'John Doe',
    email: 'student@university.edu',
    avatarUrl: '',
    privacy: false,
  };

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    status: 'Excited to learn!',
    privacy: user.privacy,
    newPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // محاكاة تحديث
    setTimeout(() => {
      alert('Profile updated successfully!');
      setIsLoading(false);
      setFormData({ ...formData, newPassword: '' });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePrivacyToggle = (checked: boolean) => {
    setFormData({
      ...formData,
      privacy: checked,
    });
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
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
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
              <h2 className="text-xl font-semibold">{formData.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={formData.privacy ? 'secondary' : 'default'}>
                  {formData.privacy ? 'Private' : 'Public'}
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
``

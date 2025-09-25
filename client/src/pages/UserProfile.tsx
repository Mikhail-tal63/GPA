import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { User, Lock, GraduationCap, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatusIndicator } from '@/components/ui/status-indicator';

interface Course {
  name: string;
  code: string;
  grade: number;
}

interface Semester {
  id: string;
  name: string;
  gpa: number;
  courses: Course[];
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  privacy: boolean;
  status: string;
  gpa?: number;
  semesters?: Semester[];
}

export const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      loadUserProfile(userId);
    }
  }, [userId]);

 const loadUserProfile = async (id: string) => {
  try {
    setIsLoading(true);
    const res = await fetch(`http://localhost:4000/api/users/${id}`, {
      method: "GET",
      credentials: "include", // لو عندك JWT cookies
      headers: { "Content-Type": "application/json" }
    });

    if (!res.ok) {
      throw new Error("Failed to fetch profile");
    }

    const data = await res.json();
    setProfile(data.user);
  } catch (err) {
    console.error("Error loading profile:", err);
    setProfile(null);
  } finally {
    setIsLoading(false);
  }
};


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">Profile not found</h3>
        <p className="text-muted-foreground">
          The user profile you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <Card className="card-hover">
        <CardContent className="pt-6 flex items-center gap-6">
          <div className="relative">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt={profile.name} className="w-20 h-20 rounded-full object-cover" />
            ) : (
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
            )}
            <StatusIndicator status="online" size="lg" className="absolute -bottom-1 -right-1 border-2 border-background" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <Badge variant={profile.privacy ? 'secondary' : 'default'}>
                {profile.privacy ? 'Private' : 'Public'}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-2">{profile.email}</p>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{profile.status}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Info */}
      {profile.privacy ? (
        <Card className="text-center py-12">
          <CardContent>
            <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Private Account</h3>
            <p className="text-muted-foreground">This user has chosen to keep their academic info private.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="card-hover text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">{profile.gpa?.toFixed(2)}</div>
                <p className="text-sm text-muted-foreground">Cumulative GPA</p>
              </CardContent>
            </Card>
            <Card className="card-hover text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-accent mb-2">{profile.semesters?.length || 0}</div>
                <p className="text-sm text-muted-foreground">Semesters</p>
              </CardContent>
            </Card>
            <Card className="card-hover text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-success mb-2">
                  {profile.semesters?.reduce((acc, sem) => acc + sem.courses.length, 0) || 0}
                </div>
                <p className="text-sm text-muted-foreground">Courses</p>
              </CardContent>
            </Card>
          </div>

          {/* Semesters */}
          {profile.semesters?.map(sem => (
            <Card key={sem.id} className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{sem.name}</h3>
                      <p className="text-sm text-muted-foreground">{sem.courses.length} courses</p>
                    </div>
                  </div>
                  <Badge>{sem.gpa.toFixed(2)}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {sem.courses.map((course, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                      <div>
                        <span className="font-medium">{course.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">({course.code})</span>
                      </div>
                      <Badge variant="outline">{course.grade.toFixed(1)}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

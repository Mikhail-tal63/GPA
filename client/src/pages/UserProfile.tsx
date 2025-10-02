import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { User, Lock, GraduationCap, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusIndicator } from "@/components/ui/status-indicator";

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
    if (userId) loadUserProfile(userId);
  }, [userId]);

  const loadUserProfile = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:4000/api/users/${id}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();
      setProfile(data.user);
    } catch (err) {
      console.error("Error loading profile:", err);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">Loading profile...</p>
        </div>
      </div>
    );

  if (!profile)
    return (
      <div className="text-center py-16">
        <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Profile not found</h3>
        <p className="text-muted-foreground">
          The user profile you're looking for doesn't exist.
        </p>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto space-y-8 px-4">
      {/* Header */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="pt-6 flex flex-col md:flex-row items-center gap-6">
          <div className="relative flex-shrink-0">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-white shadow-md"
              />
            ) : (
              <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-md">
                <User className="w-12 h-12 text-white" />
              </div>
            )}
            <StatusIndicator
              status="online"
              size="lg"
              className="absolute -bottom-1 -right-1 border-2 border-white"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-2">
              <h1 className="text-3xl font-bold">{profile.name}</h1>
              <Badge variant={profile.privacy ? "secondary" : "default"} className="mt-2 md:mt-0">
                {profile.privacy ? "Private" : "Public"}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-2">{profile.email}</p>
            <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground">
              <MessageCircle className="w-4 h-4" />
              <span>{profile.status || "No status available"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Stats */}
      {!profile.privacy && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="card-hover text-center shadow hover:shadow-lg transition-shadow duration-300">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-primary mb-2">{profile.gpa?.toFixed(2) || 0}</div>
              <p className="text-sm text-muted-foreground">Cumulative GPA</p>
            </CardContent>
          </Card>

          <Card className="card-hover text-center shadow hover:shadow-lg transition-shadow duration-300">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-accent mb-2">{profile.semesters?.length || 0}</div>
              <p className="text-sm text-muted-foreground">Semesters</p>
            </CardContent>
          </Card>

          <Card className="card-hover text-center shadow hover:shadow-lg transition-shadow duration-300">
            <CardContent className="pt-6">
              <div className="text-4xl font-bold text-success mb-2">
                {profile.semesters?.reduce((acc, sem) => acc + (sem.courses?.length || 0), 0) || 0}
              </div>
              <p className="text-sm text-muted-foreground">Courses</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Semesters List */}
      {profile.privacy ? (
        <Card className="text-center py-12 shadow hover:shadow-lg transition-shadow duration-300">
          <CardContent>
            <Lock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Private Account</h3>
            <p className="text-muted-foreground">
              This user has chosen to keep their academic info private.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {profile.semesters?.map((sem) => (
            <Card
              key={sem.id}
              className="card-hover shadow hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{sem.name}</h3>
                      <p className="text-sm text-muted-foreground">{sem.courses?.length} courses</p>
                    </div>
                  </div>
                  <Badge variant="outline">{sem.gpa?.toFixed(2)}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {sem.courses?.map((course, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 bg-muted/30 rounded hover:bg-muted/50 transition-colors"
                    >
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
        </div>
      )}
    </div>
  );
};

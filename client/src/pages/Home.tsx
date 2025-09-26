import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, GraduationCap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SemesterCard } from "@/components/semester/SemesterCard";
import { CreateSemesterForm } from "@/components/semester/CreateSemesterForm";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

import { calculateCumulativeGPA, Course } from "@/utils/gpa";

interface Semester {
  id: string;
  name: string;
  gpa: number;
  courses: Course[];
}

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { toast } = useToast();

  const [semesters, setSemesters] = useState<Semester[]>([]);

  useEffect(() => {
    const fetchsemester = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/semesters/getSemesters",
          { withCredentials: true }
        );
        setSemesters(res.data.semesters || []);
        // تقدر تخزن cumulativeGPA في state منفصل لو تبي تعرضه
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load semesters",
        });
      }
    };
    fetchsemester();
  }, []);

  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateSemester = async (semesterData: {
    name: string;
    courses: Course[];
  }) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/semesters/create",
        semesterData,
        { withCredentials: true }
      );

      setSemesters((prev) => [...prev, res.data]);

      toast({
        title: t("semesterCreated"),
        description: `${semesterData.name} has been added successfully.`,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to create semester",
      });
    }
  };

  const handleDeleteSemester = async (semesterId: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/semesters/${semesterId}`, {
        withCredentials: true,
      });

      setSemesters(semesters.filter((s) => s.id !== semesterId));

      toast({
        title: "Semester deleted",
        description: "The semester has been removed successfully.",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to delete semester",
      });
    }
  };

  //  const cumulativeGPA = calculateCumulativeGPA(semesters);

  return (
    <div className="space-y-6">
      {/* Welcome & Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-primary" />
              {t("cumulativeGPA")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">test</div>
            <p className="text-xs text-muted-foreground">
              Based on {semesters?.length} semesters
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              Total Semesters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {semesters?.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Academic progress tracked
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge
              variant={user?.privacy ? "secondary" : "default"}
              className="mb-2"
            >
              {user?.privacy ? t("private") : t("public")}
            </Badge>
            <p className="text-xs text-muted-foreground">Profile visibility</p>
          </CardContent>
        </Card>
      </div>

      {/* Semester Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Semesters</h2>
          <Button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {t("createNewSemester")}
          </Button>
        </div>

        {showCreateForm && (
          <div className="fade-in">
            <CreateSemesterForm
              onSubmit={handleCreateSemester}
              onCancel={() => setShowCreateForm(false)}
            />
          </div>
        )}

        {semesters?.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">{t("noSemesters")}</h3>
              <p className="text-muted-foreground mb-4">
                Start tracking your academic progress by creating your first
                semester.
              </p>
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create First Semester
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {semesters?.map((semester, key) => (
              <SemesterCard
                key={key}
                semester={semester}
                onDelete={() => handleDeleteSemester(semester.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

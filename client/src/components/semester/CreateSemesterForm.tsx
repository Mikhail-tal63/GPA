import React, { useState } from 'react';
import { useTranslation } from 'node_modules/react-i18next';
import { Plus, Trash2, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { calculateGPA } from '@/utils/gpa';

interface Course {
  name: string;
  code: string;
  grade: number;
  credits?: number;
}

interface CreateSemesterFormProps {
  onSubmit: (data: { name: string; courses: Course[] }) => void;
  onCancel: () => void;
}

export const CreateSemesterForm: React.FC<CreateSemesterFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const { t } = useTranslation();
  const [semesterName, setSemesterName] = useState('');
  const [courses, setCourses] = useState<Course[]>([
    { name: '', code: '', grade: 0, credits: undefined },
  ]);

  const addCourse = () => {
    setCourses([...courses, { name: '', code: '', grade: 0, credits: undefined }]);
  };

  const removeCourse = (index: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter((_, i) => i !== index));
    }
  };

  const updateCourse = (index: number, field: keyof Course, value: string | number) => {
    const updatedCourses = courses.map((course, i) => {
      if (i === index) {
        return { 
          ...course, 
          [field]: field === 'credits' && value === '' ? undefined : value 
        };
      }
      return course;
    });
    setCourses(updatedCourses);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!semesterName.trim()) {
      alert('Please enter a semester name');
      return;
    }

    const validCourses = courses.filter(
      course => course.name.trim() && course.code.trim() && course.grade > 0
    );

    if (validCourses.length === 0) {
      alert('Please add at least one valid course');
      return;
    }

    onSubmit({
      name: semesterName.trim(),
      courses: validCourses,
    });
  };

  const previewGPA = calculateGPA(courses.filter(c => c.name && c.code && c.grade > 0));

  return (
    <Card className="semester-card border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5 text-primary" />
          {t('createNewSemester')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Semester Name */}
          <div className="space-y-2">
            <Label htmlFor="semesterName">{t('semester')} Name</Label>
            <Input
              id="semesterName"
              type="text"
              placeholder={t('enterSemesterName')}
              value={semesterName}
              onChange={(e) => setSemesterName(e.target.value)}
              className="text-lg font-medium"
            />
          </div>

          <Separator />

          {/* Courses Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Courses</h3>
              {previewGPA > 0 && (
                <Badge variant="outline" className="flex items-center gap-2">
                  <Calculator className="w-3 h-3" />
                  Preview GPA: {previewGPA.toFixed(2)}
                </Badge>
              )}
            </div>

            <div className="space-y-3">
              {courses.map((course, index) => (
                <div key={index} className="p-4 border rounded-lg bg-muted/30">
                  <div className="grid gap-3 md:grid-cols-4">
                    <div className="md:col-span-2">
                      <Label htmlFor={`courseName-${index}`}>
                        {t('courseName')}
                      </Label>
                      <Input
                        id={`courseName-${index}`}
                        type="text"
                        placeholder="e.g., Computer Science 101"
                        value={course.name}
                        onChange={(e) => updateCourse(index, 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`courseCode-${index}`}>
                        {t('courseCode')}
                      </Label>
                      <Input
                        id={`courseCode-${index}`}
                        type="text"
                        placeholder="e.g., CS101"
                        value={course.code}
                        onChange={(e) => updateCourse(index, 'code', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`grade-${index}`}>
                        {t('grade')} (0-4)
                      </Label>
                      <Input
                        id={`grade-${index}`}
                        type="number"
                        min="0"
                        max="4"
                        step="0.1"
                        placeholder="4.0"
                        value={course.grade || ''}
                        onChange={(e) => updateCourse(index, 'grade', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex-1 max-w-32">
                      <Label htmlFor={`credits-${index}`}>
                        {t('creditHours')} (Optional)
                      </Label>
                      <Input
                        id={`credits-${index}`}
                        type="number"
                        min="1"
                        max="6"
                        placeholder="3"
                        value={course.credits || ''}
                        onChange={(e) => updateCourse(index, 'credits', parseInt(e.target.value) || undefined)}
                      />
                    </div>
                    
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeCourse(index)}
                      disabled={courses.length === 1}
                      className="ml-3 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={addCourse}
              className="w-full flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              {t('addCourse')}
            </Button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4">
            <Button type="submit" className="flex-1">
              <Calculator className="w-4 h-4 mr-2" />
              {t('calculateGPA')} & Save
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              {t('cancel')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
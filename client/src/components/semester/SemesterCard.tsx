import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ChevronDown, 
  ChevronUp, 
  Edit2, 
  Trash2, 
  Share, 
  Lock, 
  Unlock,
  BookOpen 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getGradeColor } from '@/utils/gpa';
import { cn } from '@/lib/utils';

interface Course {
  name: string;
  code: string;
  grade: number;
  credits?: number;
}

interface Semester {
  id: string;
  name: string;
  gpa: number;
  courses: Course[];
}

interface SemesterCardProps {
  semester: Semester;
  onDelete: () => void;
  onEdit?: () => void;
  onShare?: () => void;
  onTogglePrivacy?: () => void;
  isPrivate?: boolean;
}

export const SemesterCard: React.FC<SemesterCardProps> = ({
  semester,
  onDelete,
  onEdit,
  onShare,
  onTogglePrivacy,
  isPrivate = false,
}) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const gradeColorClass = getGradeColor(semester.gpa);

  return (
    <Card className={cn(
      'semester-card transition-all duration-300',
      isExpanded ? 'expanded' : ''
    )}>
      {/* Compact Header */}
      <CardHeader 
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{semester.name}</h3>
              <p className="text-sm text-muted-foreground">
                {semester.courses.length} courses
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge className={cn('text-sm font-medium', gradeColorClass)}>
              GPA: {semester.gpa.toFixed(2)}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="p-1"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Expanded Content */}
      {isExpanded && (
        <CardContent className="pt-0 expand-animation">
          <Separator className="mb-4" />
          
          {/* Course List */}
          <div className="space-y-3 mb-4">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
              Courses
            </h4>
            <div className="grid gap-2">
              {semester.courses.map((course, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium">{course.name}</h5>
                      <Badge variant="outline" className="text-xs">
                        {course.code}
                      </Badge>
                    </div>
                    {course.credits && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {course.credits} credit hours
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <Badge className={cn('text-sm', getGradeColor(course.grade))}>
                      {course.grade.toFixed(1)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onEdit}
                className="flex items-center gap-2"
              >
                <Edit2 className="w-3 h-3" />
                {t('edit')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onShare}
                className="flex items-center gap-2"
              >
                <Share className="w-3 h-3" />
                {t('share')}
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onTogglePrivacy}
                className="flex items-center gap-2"
              >
                {isPrivate ? (
                  <>
                    <Lock className="w-3 h-3" />
                    {t('private')}
                  </>
                ) : (
                  <>
                    <Unlock className="w-3 h-3" />
                    {t('public')}
                  </>
                )}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={onDelete}
                className="flex items-center gap-2"
              >
                <Trash2 className="w-3 h-3" />
                {t('delete')}
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
export interface Course {
  name: string;
  code: string;
  grade: number; // درجة من 0 إلى 100
  credits?: number;
}

export const calculateGPA = (courses: Course[]): number => {
  if (courses.length === 0) return 0;

  const hasCredits = courses?.some(
    (course) => course.credits && course.credits > 0
  );

  if (hasCredits) {
    // حساب المتوسط المرجح
    let totalGradePoints = 0;
    let totalCredits = 0;

    courses?.forEach((course) => {
      const credits = course.credits || 1; // افتراضي 1 لو ما فيه كريديت
      totalGradePoints += course.grade * credits;
      totalCredits += credits;
    });

    return Math.round((totalGradePoints / totalCredits) * 100) / 100;
  } else {
    // متوسط بسيط
    const sum = courses.reduce((acc, course) => acc + course.grade, 0);
    return Math.round((sum / courses.length) * 100) / 100;
  }
};

export const getGradeColor = (percentage: number): string => {
  if (percentage >= 90) return "grade-excellent";
  if (percentage >= 75) return "grade-good";
  if (percentage >= 60) return "grade-average";
  return "grade-poor";
};

export const getGradeLabel = (percentage: number): string => {
  if (percentage >= 90) return "Excellent";
  if (percentage >= 75) return "Good";
  if (percentage >= 60) return "Average";
  return "Poor";
};

export const calculateCumulativePercentage = (
  semesters: Array<{ percentage: number; courses: Course[] }>
): number => {
  if (semesters.length === 0) return 0;

  let totalGradePoints = 0;
  let totalCredits = 0;

  semesters?.forEach((semester) => {
    semester?.courses?.forEach((course) => {
      const credits = course.credits || 1;
      totalGradePoints += course.grade * credits;
      totalCredits += credits;
    });
  });

  if (totalCredits === 0) return 0;

  return Math.round((totalGradePoints / totalCredits) * 100) / 100;
};

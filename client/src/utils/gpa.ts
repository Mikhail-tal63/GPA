export interface Course {
  name: string;
  code: string;
  grade: number;
  credits?: number;
}

export const calculateGPA = (courses: Course[]): number => {
  if (courses.length === 0) return 0;

  const hasCredits = courses?.some(
    (course) => course.credits && course.credits > 0
  );

  if (hasCredits) {
    // Weighted average calculation
    let totalGradePoints = 0;
    let totalCredits = 0;

    courses?.forEach((course) => {
      const credits = course.credits || 1; // Default to 1 if no credits specified
      totalGradePoints += course.grade * credits;
      totalCredits += credits;
    });

    return Math.round((totalGradePoints / totalCredits) * 100) / 100;
  } else {
    // Simple mean calculation
    const sum = courses.reduce((acc, course) => acc + course.grade, 0);
    return Math.round((sum / courses.length) * 100) / 100;
  }
};

export const getGradeColor = (gpa: number): string => {
  if (gpa >= 3.7) return "grade-excellent";
  if (gpa >= 3.0) return "grade-good";
  if (gpa >= 2.0) return "grade-average";
  return "grade-poor";
};

export const getGradeLabel = (gpa: number): string => {
  if (gpa >= 3.7) return "Excellent";
  if (gpa >= 3.0) return "Good";
  if (gpa >= 2.0) return "Average";
  return "Poor";
};

export const calculateCumulativeGPA = (
  semesters: Array<{ gpa: number; courses: Course[] }>
): number => {
  if (semesters.length === 0) return 0;

  let totalGradePoints = 0;
  let totalCredits = 0;
  let hasCreditHours = false;

  semesters?.forEach((semester) => {
    semester?.courses?.forEach((course) => {
      if (course.credits && course.credits > 0) {
        hasCreditHours = true;
        totalGradePoints += course.grade * course.credits;
        totalCredits += course.credits;
      } else {
        totalGradePoints += course.grade;
        totalCredits += 1;
      }
    });
  });

  if (totalCredits === 0) return 0;

  return Math.round((totalGradePoints / totalCredits) * 100) / 100;
};

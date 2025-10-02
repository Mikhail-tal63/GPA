import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector/cjs';

const resources = {
  en: {
    translation: {

// Navigation / Headers
yourSemesters: "Your Semesters",
profileSettings: "Profile Settings",

// Profile / Account
changeIcon: "Change Icon",
changePhoto: "Change Photo",
privacySettings: "Privacy Settings",
otherUsersCanView: "Other users can view your academic progress",

// Search / Connect
connectWithStudents: "Connect with other students and view their academic progress",
findStudents: "Find Students",
startSearching: "Start searching",
enterStudentNameOrEmail: "Enter a student's name or email to find their profile",


      
      // Navigation
      home: "Home",
      search: "Search",
      tips: "Tips",
      account: "Account",
      
      // Authentication
      login: "Login",
      signup: "Sign Up",
      logout: "Logout",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      name: "Name",
      
      // GPA Management
      semester: "Semester",
      course: "Course",
      courseName: "Course Name",
      courseCode: "Course Code",
      grade: "Grade",
      creditHours: "Credit Hours",
      gpa: "GPA",
      cumulativeGPA: "Cumulative GPA",
      addCourse: "Add Course",
      removeCourse: "Remove Course",
      calculateGPA: "Calculate GPA",
      createNewSemester: "Create New Semester",
      
      // Actions
      edit: "Edit",
      delete: "Delete",
      share: "Share",
      save: "Save",
      cancel: "Cancel",
      submit: "Submit",
      
      // Privacy
      public: "Public",
      private: "Private",
      togglePrivacy: "Toggle Privacy",
      privateAccount: "This account is private",
      
      // Status
      online: "Online",
      away: "Away",
      busy: "Busy",
      offline: "Offline",
      
      // Tips
      gpaCalculationTips: "GPA Calculation Tips",
      coursePlanningTips: "Course Planning Tips",
      
      // Messages
      welcome: "Welcome to Your GPA Manager",
      noSemesters: "No semesters yet. Create your first semester!",
      profileUpdated: "Profile updated successfully",
      semesterCreated: "Semester created successfully",
      
      // Placeholders
      searchUsers: "Search users by name...",
      enterSemesterName: "Enter semester name",
      shortStatus: "What's your status?",
    }
  },
  ar: {
    translation: {



// Navigation / Headers
yourSemesters: "فصولك الدراسية",
profileSettings: "إعدادات الملف الشخصي",

// Profile / Account
changeIcon: "تغيير الأيقونة",
changePhoto: "تغيير الصورة",
privacySettings: "إعدادات الخصوصية",
otherUsersCanView: "يمكن للمستخدمين الآخرين عرض تقدمك الأكاديمي",

// Search / Connect
connectWithStudents: "تواصل مع طلاب آخرين وعرض تقدمهم الأكاديمي",
findStudents: "ابحث عن الطلاب",
startSearching: "ابدأ البحث",
enterStudentNameOrEmail: "أدخل اسم الطالب أو بريده الإلكتروني للعثور على ملفه الشخصي",





      // Navigation
      home: "الرئيسية",
      search: "البحث",
      tips: "نصائح",
      account: "الحساب",
      
      // Authentication
      login: "تسجيل الدخول",
      signup: "إنشاء حساب",
      logout: "تسجيل الخروج",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      name: "الاسم",
      
      // GPA Management
      semester: "الفصل الدراسي",
      course: "المادة",
      courseName: "اسم المادة",
      courseCode: "رمز المادة",
      grade: "الدرجة",
      creditHours: "الساعات المعتمدة",
      gpa: "المعدل",
      cumulativeGPA: "المعدل التراكمي",
      addCourse: "إضافة مادة",
      removeCourse: "حذف المادة",
      calculateGPA: "حساب المعدل",
      createNewSemester: "إنشاء فصل جديد",
      
      // Actions
      edit: "تعديل",
      delete: "حذف",
      share: "مشاركة",
      save: "حفظ",
      cancel: "إلغاء",
      submit: "إرسال",
      
      // Privacy
      public: "عام",
      private: "خاص",
      togglePrivacy: "تبديل الخصوصية",
      privateAccount: "هذا الحساب خاص",
      
      // Status
      online: "متصل",
      away: "غائب",
      busy: "مشغول",
      offline: "غير متصل",
      
      // Tips
      gpaCalculationTips: "نصائح حساب المعدل",
      coursePlanningTips: "نصائح تخطيط المواد",
      
      // Messages
      welcome: "مرحباً بك في إدارة المعدل التراكمي",
      noSemesters: "لا توجد فصول دراسية بعد. أنشئ فصلك الأول!",
      profileUpdated: "تم تحديث الملف الشخصي بنجاح",
      semesterCreated: "تم إنشاء الفصل الدراسي بنجاح",
      
      // Placeholders
      searchUsers: "البحث عن المستخدمين بالاسم...",
      enterSemesterName: "أدخل اسم الفصل الدراسي",
      shortStatus: "ما هي حالتك؟",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en',
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
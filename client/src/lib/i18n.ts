import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector/cjs";

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
      connectWithStudents:
        "Connect with other students and view their academic progress",
      findStudents: "Find Students",
      startSearching: "Start searching",
      enterStudentNameOrEmail:
        "Enter a student's name or email to find their profile",

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

      // Messages
      welcome: "Welcome to Your GPA Manager",
      noSemesters: "No semesters yet. Create your first semester!",
      profileUpdated: "Profile updated successfully",
      semesterCreated: "Semester created successfully",

      // Placeholders
      searchUsers: "Search users by name...",
      enterSemesterName: "Enter semester name",
      shortStatus: "What's your status?",

      // Tips Page
      tipsPage: {
        headerTitle: "Academic Success Tips",
        headerSubtitle:
          "Expert advice to help you excel in your studies and achieve your GPA goals",

        benchmarksTitle: "GPA Benchmarks & Recognition",

        tipsList: [
          {
            title: "Understanding GPA Calculation",
            category: "Calculation",
            points: [
              "GPA is calculated on a 4.0 scale in most universities",
              "A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0",
              "Weighted GPA considers credit hours: sum(grade × credits) ÷ total credits",
              "Simple GPA: sum of all grades ÷ number of courses",
            ],
          },
          {
            title: "Setting Academic Goals",
            category: "Planning",
            points: [
              "Set realistic semester GPA targets based on your current standing",
              "Aim for consistent improvement rather than perfection",
              "Consider your course load difficulty when setting goals",
              "Track progress regularly to stay motivated",
            ],
          },
          {
            title: "Improving Your GPA",
            category: "Improvement",
            points: [
              "Focus on courses with higher credit hours for maximum impact",
              "Identify weak subjects early and seek help",
              "Consider retaking courses if your university allows it",
              "Maintain good study habits and time management",
            ],
          },
          {
            title: "Course Selection Strategy",
            category: "Planning",
            points: [
              "Balance challenging courses with manageable ones each semester",
              "Take prerequisites early to avoid scheduling conflicts",
              "Consider your workload when registering for courses",
              "Choose professors with good ratings when possible",
            ],
          },
          {
            title: "Time Management Tips",
            category: "Study Skills",
            points: [
              "Create a study schedule and stick to it",
              "Use the Pomodoro Technique for focused study sessions",
              "Prioritize assignments based on due dates and importance",
              "Take regular breaks to maintain concentration",
            ],
          },
          {
            title: "Maintaining High Performance",
            category: "Excellence",
            points: [
              "Attend all classes and participate actively",
              "Complete assignments on time and with quality",
              "Form study groups with motivated classmates",
              "Seek feedback from professors to improve",
            ],
          },
        ],

        gpaBenchmarks: [
          {
            range: "3.8 - 4.0",
            label: "Summa Cum Laude",
            description: "Highest honors",
          },
          {
            range: "3.6 - 3.79",
            label: "Magna Cum Laude",
            description: "High honors",
          },
          {
            range: "3.4 - 3.59",
            label: "Cum Laude",
            description: "With honors",
          },
          {
            range: "3.0 - 3.39",
            label: "Good Standing",
            description: "Above average",
          },
          {
            range: "2.0 - 2.99",
            label: "Satisfactory",
            description: "Meeting requirements",
          },
        ],

        additionalResources: "Additional Resources",
        academicSupport: "Academic Support",
        mentalHealth: "Mental Health & Balance",

        academicSupportPoints: [
          "Visit your university's tutoring center",
          "Attend professor office hours regularly",
          "Join study groups and academic clubs",
          "Use online learning resources and tools",
        ],
        mentalHealthPoints: [
          "Maintain a healthy work-life balance",
          "Get adequate sleep and exercise",
          "Seek counseling services when needed",
          "Practice stress management techniques",
        ],
      },
    },
  },
  ar: {
    translation: {
      // نفس المفاتيح ولكن مترجمة
      tipsPage: {
        headerTitle: "نصائح للنجاح الأكاديمي",
        headerSubtitle:
          "نصائح من الخبراء لمساعدتك على التفوق الدراسي وتحقيق أهدافك في المعدل",

        benchmarksTitle: "معايير المعدل والتقديرات",

        tipsList: [
          {
            title: "فهم طريقة حساب المعدل",
            category: "الحساب",
            points: [
              "يُحسب المعدل على مقياس 4.0 في معظم الجامعات",
              "A = 4.0، B = 3.0، C = 2.0، D = 1.0، F = 0.0",
              "المعدل الموزون يعتمد على الساعات المعتمدة: مجموع (الدرجة × الساعات) ÷ مجموع الساعات",
              "المعدل البسيط: مجموع الدرجات ÷ عدد المواد",
            ],
          },
          {
            title: "تحديد الأهداف الأكاديمية",
            category: "التخطيط",
            points: [
              "حدد أهدافًا واقعية للفصل الدراسي بناءً على مستواك الحالي",
              "اسعَ للتحسن المستمر بدلاً من الكمال",
              "ضع في اعتبارك صعوبة المواد عند تحديد الأهداف",
              "تابع تقدمك بانتظام للبقاء متحفزًا",
            ],
          },
          {
            title: "تحسين معدلك الدراسي",
            category: "التحسين",
            points: [
              "ركز على المواد ذات الساعات الأعلى لتحقيق تأثير أكبر",
              "حدد المواد الضعيفة مبكرًا واطلب المساعدة",
              "أعد المواد إذا سمحت الجامعة بذلك",
              "حافظ على عادات دراسية جيدة وتنظيم للوقت",
            ],
          },
          {
            title: "استراتيجية اختيار المواد",
            category: "التخطيط",
            points: [
              "وازن بين المواد الصعبة والسهلة في كل فصل",
              "خذ المتطلبات الأساسية مبكرًا لتجنب التعارض",
              "راعِ حجم عملك الدراسي عند التسجيل",
              "اختر الأساتذة ذوي التقييمات الجيدة إن أمكن",
            ],
          },
          {
            title: "نصائح لإدارة الوقت",
            category: "مهارات الدراسة",
            points: [
              "أنشئ جدولًا دراسيًا والتزم به",
              "استخدم تقنية بومودورو لجلسات تركيز فعالة",
              "حدد أولويات المهام حسب الأهمية والمواعيد النهائية",
              "خذ فترات راحة منتظمة للحفاظ على التركيز",
            ],
          },
          {
            title: "الحفاظ على الأداء العالي",
            category: "التميز",
            points: [
              "احضر جميع المحاضرات وشارك بفعالية",
              "أنجز الواجبات في وقتها وبجودة عالية",
              "كوّن مجموعات دراسة مع طلاب متفوقين",
              "اطلب الملاحظات من الأساتذة لتحسين مستواك",
            ],
          },
        ],

        gpaBenchmarks: [
          {
            range: "3.8 - 4.0",
            label: "مرتبة الشرف العليا",
            description: "أعلى تقدير",
          },
          {
            range: "3.6 - 3.79",
            label: "مرتبة الشرف الكبرى",
            description: "تقدير عالٍ",
          },
          {
            range: "3.4 - 3.59",
            label: "مرتبة الشرف",
            description: "مع مرتبة الشرف",
          },
          {
            range: "3.0 - 3.39",
            label: "أداء جيد",
            description: "فوق المتوسط",
          },
          {
            range: "2.0 - 2.99",
            label: "مقبول",
            description: "يستوفي المتطلبات",
          },
        ],

        additionalResources: "موارد إضافية",
        academicSupport: "الدعم الأكاديمي",
        mentalHealth: "الصحة النفسية والتوازن",

        academicSupportPoints: [
          "قم بزيارة مركز الدعم الأكاديمي في جامعتك",
          "احضر ساعات استقبال الأساتذة بانتظام",
          "انضم إلى مجموعات الدراسة والأندية الأكاديمية",
          "استخدم الموارد التعليمية عبر الإنترنت",
        ],
        mentalHealthPoints: [
          "حافظ على توازن صحي بين العمل والحياة",
          "احصل على قسط كافٍ من النوم ومارس التمارين الرياضية",
          "اطلب استشارة نفسية عند الحاجة",
          "مارس تقنيات إدارة التوتر بانتظام",
        ],
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    lng: "en",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;

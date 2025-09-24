import React from 'react';
import { useTranslation } from 'node_modules/react-i18next';
import { 
  Calculator, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Clock, 
  Star,
  Lightbulb,
  Award
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const tips = [
  {
    id: 1,
    icon: Calculator,
    title: 'Understanding GPA Calculation',
    category: 'Calculation',
    content: [
      'GPA is calculated on a 4.0 scale in most universities',
      'A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0',
      'Weighted GPA considers credit hours: sum(grade × credits) ÷ total credits',
      'Simple GPA: sum of all grades ÷ number of courses',
    ],
    color: 'text-primary',
  },
  {
    id: 2,
    icon: Target,
    title: 'Setting Academic Goals',
    category: 'Planning',
    content: [
      'Set realistic semester GPA targets based on your current standing',
      'Aim for consistent improvement rather than perfection',
      'Consider your course load difficulty when setting goals',
      'Track progress regularly to stay motivated',
    ],
    color: 'text-accent',
  },
  {
    id: 3,
    icon: TrendingUp,
    title: 'Improving Your GPA',
    category: 'Improvement',
    content: [
      'Focus on courses with higher credit hours for maximum impact',
      'Identify weak subjects early and seek help',
      'Consider retaking courses if your university allows it',
      'Maintain good study habits and time management',
    ],
    color: 'text-success',
  },
  {
    id: 4,
    icon: BookOpen,
    title: 'Course Selection Strategy',
    category: 'Planning',
    content: [
      'Balance challenging courses with manageable ones each semester',
      'Take prerequisites early to avoid scheduling conflicts',
      'Consider your workload when registering for courses',
      'Choose professors with good ratings when possible',
    ],
    color: 'text-warning',
  },
  {
    id: 5,
    icon: Clock,
    title: 'Time Management Tips',
    category: 'Study Skills',
    content: [
      'Create a study schedule and stick to it',
      'Use the Pomodoro Technique for focused study sessions',
      'Prioritize assignments based on due dates and importance',
      'Take regular breaks to maintain concentration',
    ],
    color: 'text-primary',
  },
  {
    id: 6,
    icon: Star,
    title: 'Maintaining High Performance',
    category: 'Excellence',
    content: [
      'Attend all classes and participate actively',
      'Complete assignments on time and with quality',
      'Form study groups with motivated classmates',
      'Seek feedback from professors to improve',
    ],
    color: 'text-accent',
  },
];

const gpaBenchmarks = [
  { range: '3.8 - 4.0', label: 'Summa Cum Laude', description: 'Highest honors', color: 'grade-excellent' },
  { range: '3.6 - 3.79', label: 'Magna Cum Laude', description: 'High honors', color: 'grade-excellent' },
  { range: '3.4 - 3.59', label: 'Cum Laude', description: 'With honors', color: 'grade-good' },
  { range: '3.0 - 3.39', label: 'Good Standing', description: 'Above average', color: 'grade-good' },
  { range: '2.0 - 2.99', label: 'Satisfactory', description: 'Meeting requirements', color: 'grade-average' },
];

export const Tips: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto">
          <Lightbulb className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Academic Success Tips</h1>
          <p className="text-muted-foreground">
            Expert advice to help you excel in your studies and achieve your GPA goals
          </p>
        </div>
      </div>

      {/* GPA Benchmarks */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            GPA Benchmarks & Recognition
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {gpaBenchmarks.map((benchmark, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={benchmark.color}>
                    {benchmark.range}
                  </Badge>
                </div>
                <h4 className="font-medium">{benchmark.label}</h4>
                <p className="text-sm text-muted-foreground">{benchmark.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tips Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {tips.map((tip) => {
          const Icon = tip.icon;
          return (
            <Card key={tip.id} className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-muted/50`}>
                    <Icon className={`w-5 h-5 ${tip.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg">{tip.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {tip.category}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tip.content.map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Resources */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Additional Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Academic Support</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Visit your university's tutoring center</li>
                <li>• Attend professor office hours regularly</li>
                <li>• Join study groups and academic clubs</li>
                <li>• Use online learning resources and tools</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Mental Health & Balance</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Maintain a healthy work-life balance</li>
                <li>• Get adequate sleep and exercise</li>
                <li>• Seek counseling services when needed</li>
                <li>• Practice stress management techniques</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
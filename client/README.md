# GPA Manager - University Student Academic Tracker

A modern, responsive React application for university students to track their academic progress, manage semester grades, and share their achievements with peers.

## Features

### 🎓 Academic Management
- **Semester Creation**: Add courses with grades and credit hours
- **GPA Calculation**: Supports both weighted (credit hours) and simple mean calculations
- **Progress Tracking**: Visual semester cards with expandable course details
- **Cumulative GPA**: Automatic calculation across all semesters

### 👥 Social Features
- **User Profiles**: Customizable profiles with status updates (Discord/Telegram style)
- **Privacy Controls**: Toggle between public and private academic information
- **Student Search**: Find other students by name or email
- **Status Indicators**: Online/away/busy status with colored dots

### 🌐 Internationalization
- **Multilingual Support**: Full Arabic (RTL) and English support
- **Responsive Design**: Mobile-first with bottom navigation, desktop sidebar
- **Academic Theme**: Professional blue/teal color scheme with proper contrast

### 🔐 Authentication & Security
- **JWT Authentication**: Secure login/signup system
- **Protected Routes**: Authentication guards for sensitive pages
- **Profile Management**: Update personal info, change passwords, privacy settings

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui component library
- **Routing**: React Router v6 with protected routes
- **State Management**: React Context + hooks
- **API Client**: Axios with interceptors
- **Internationalization**: i18next with RTL support
- **Animations**: Custom CSS animations and transitions

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd gpa-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the project root:
   ```env
   VITE_API_BASE_URL=http://localhost:3001/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:8080`

## API Integration

The frontend is designed to connect to an existing backend API. Update the `VITE_API_BASE_URL` environment variable to point to your backend server.

### Expected API Endpoints

#### Authentication
```
POST /api/auth/register
Body: { "name": "string", "email": "string", "password": "string" }
Response: { "token": "string", "user": UserObject }

POST /api/auth/login  
Body: { "email": "string", "password": "string" }
Response: { "token": "string", "user": UserObject }

GET /api/user/me
Headers: { "Authorization": "Bearer <token>" }
Response: UserObject
```

#### User Management
```
PUT /api/user/me
Body: { "name"?: "string", "password"?: "string", "avatarUrl"?: "string", "privacy"?: boolean, "status"?: "string" }

GET /api/users?search=<query>
Response: UserObject[]

GET /api/users/:id
Response: UserObject (with GPA data if public)
```

#### Semester Management
```
GET /api/semesters
Response: SemesterObject[]

POST /api/semesters
Body: { "name": "string", "courses": CourseObject[] }
Response: SemesterObject

PUT /api/semesters/:id
Body: { "name"?: "string", "courses"?: CourseObject[] }

DELETE /api/semesters/:id
```

### Data Models

#### User Object
```typescript
{
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  privacy: boolean;
  status: string;
}
```

#### Semester Object
```typescript
{
  id: string;
  name: string;
  gpa: number;
  courses: CourseObject[];
}
```

#### Course Object
```typescript
{
  name: string;
  code: string;
  grade: number; // 0.0 - 4.0 scale
  credits?: number; // Optional for weighted GPA
}
```

## Development Mode

The application includes mock data for development when the backend is not available. This allows you to test all features locally.

### Mock Users
- Ahmed Ali (Public profile, 3.85 GPA)
- Sara Mohammed (Private profile)
- Omar Hassan (Public profile, 3.92 GPA)

## GPA Calculation

The application supports two calculation methods:

1. **Weighted Average** (when credit hours provided):
   ```
   GPA = Σ(grade × credits) / Σ(credits)
   ```

2. **Simple Mean** (when no credit hours):
   ```
   GPA = Σ(grades) / number_of_courses
   ```

## Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service.

## Customization

### Theme Configuration
- Colors and gradients: `src/index.css`
- Tailwind tokens: `tailwind.config.ts`
- Component variants: Individual component files

### Adding New Languages
1. Add translations to `src/lib/i18n.ts`
2. Update language detector configuration
3. Add RTL support in CSS if needed

### Custom Components
All UI components are built with the shadcn/ui system and can be customized by modifying files in `src/components/ui/`.

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable  
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For questions or issues, please check the documentation or create an issue in the repository.
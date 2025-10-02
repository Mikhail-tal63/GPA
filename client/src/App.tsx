import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { RecoilRoot, useRecoilValue } from "recoil";
import userAtom from "./Aouth/UserAtom";

import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Profile } from "./pages/Profile";
import { Search } from "./pages/Search";
import { Tips } from "./pages/Tips";
import { UserProfile } from "./pages/UserProfile";
import NotFound from "./pages/NotFound";

import "./lib/i18n";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useRecoilValue(userAtom);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useRecoilValue(userAtom);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
    <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

    {/* Protected Routes */}
    <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
      <Route index element={<Home />} />
      <Route path="search" element={<Search />} />
      <Route path="tips" element={<Tips />} />
      <Route path="account" element={<Profile />} />
      <Route path="users/:userId" element={<UserProfile />} />
    </Route>

    {/* Catch-all */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </RecoilRoot>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Problems from "./pages/Problems";
import ProblemDetail from "./pages/ProblemDetail";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from '@/contexts/AuthContext'
import { ModeProvider } from '@/contexts/ModeContext'
import { useMode } from '@/contexts/ModeContext'
import { useEffect } from 'react'

const queryClient = new QueryClient();

function AppContent() {
  const { resolvedMode } = useMode()

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(resolvedMode)
  }, [resolvedMode])

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/problem/:id" element={<ProblemDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ModeProvider>
        <AppContent />
      </ModeProvider>
    </AuthProvider>
  )
}

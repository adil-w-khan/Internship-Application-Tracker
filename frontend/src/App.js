import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './pages/Dashboard';
import ApplicationList from './components/applications/ApplicationList';
import ApplicationForm from './components/applications/ApplicationForm';
import ApplicationDetail from './components/applications/ApplicationDetail';
import LoadingSpinner from './components/common/LoadingSpinner';
import ResetPassword from './components/auth/ResetPassword';
import UserSettings from './components/settings/UserSettings';

// Component to handle authenticated redirects
const AuthRedirect = () => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  
  return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Root redirect */}
            <Route path="/" element={<AuthRedirect />} />
            
            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Application routes */}
            <Route 
              path="/applications" 
              element={
                <ProtectedRoute>
                  <ApplicationList />
                </ProtectedRoute>
              } 
            />
            {/* Reset password route */}
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <UserSettings />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/applications/new" 
              element={
                <ProtectedRoute>
                  <ApplicationForm />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/applications/:id" 
              element={
                <ProtectedRoute>
                  <ApplicationDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/applications/:id/edit" 
              element={
                <ProtectedRoute>
                  <ApplicationForm isEdit={true} />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
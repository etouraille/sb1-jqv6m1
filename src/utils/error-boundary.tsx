import React, { Component, ErrorInfo } from 'react';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';
import { cn } from './cn';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRetry = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Une erreur inattendue s'est produite
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Nous sommes désolés, mais quelque chose s'est mal passé. Veuillez réessayer.
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={this.handleGoHome}
                className={cn(
                  "flex items-center px-4 py-2 rounded-lg",
                  "text-gray-700 bg-gray-100 hover:bg-gray-200"
                )}
              >
                <Home className="w-4 h-4 mr-2" />
                Accueil
              </button>
              <button
                onClick={this.handleRetry}
                className={cn(
                  "flex items-center px-4 py-2 rounded-lg",
                  "text-white bg-red-600 hover:bg-red-700"
                )}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Réessayer
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
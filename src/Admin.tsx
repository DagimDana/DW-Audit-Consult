import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { Loader2, Trash2, LogOut, Home } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  created_at: string;
}

interface AdminState {
  session: any;
  messages: ContactMessage[];
  loading: boolean;
  error: string | null;
}

export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState<AdminState>({
    session: null,
    messages: [],
    loading: true,
    error: null,
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    // Check for invitation token in URL
    const hashParams = new URLSearchParams(location.hash.substring(1));
    const type = hashParams.get('type');
    const accessToken = hashParams.get('access_token');
    const refreshToken = hashParams.get('refresh_token');

    if (type === 'invite' && accessToken && refreshToken) {
      // If this is an invite link with both tokens, set the session and redirect
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      }).then(() => {
        navigate('/set-password' + location.hash);
      });
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setState(prev => ({ ...prev, session, loading: false }));
      if (session) fetchMessages();
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState(prev => ({ ...prev, session, loading: false }));
      if (session) fetchMessages();
    });

    return () => subscription.unsubscribe();
  }, [navigate, location.hash]);

  const fetchMessages = async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setState(prev => ({
        ...prev,
        messages: data as ContactMessage[],
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Error fetching messages',
        loading: false,
      }));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoggingIn(true);
      const { error } = await supabase.auth.signInWithPassword(loginData);
      
      if (error) throw error;
      
      setLoginData({ email: '', password: '' });
      
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message || 'Error logging in',
      }));
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      await supabase.auth.signOut();
      setState(prev => ({ 
        ...prev, 
        messages: [], 
        session: null,
        loading: false,
        error: null 
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Error logging out',
        loading: false
      }));
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      setState(prev => ({ ...prev, loading: true }));
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setState(prev => ({
        ...prev,
        messages: prev.messages.filter(msg => msg.id !== id),
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Error deleting message',
        loading: false,
      }));
    }
  };

  if (!state.session) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#70275a]">Admin Login</h1>
            <Link
              to="/"
              className="flex items-center px-4 py-2 bg-[#70275a] text-white rounded-md hover:bg-opacity-90 transition-colors"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
          {state.error && (
            <div className="bg-red-50 text-red-800 p-4 rounded-md mb-4">
              {state.error}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={loginData.email}
                onChange={e => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#70275a] focus:ring focus:ring-[#70275a] focus:ring-opacity-50 text-gray-900"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={loginData.password}
                onChange={e => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#70275a] focus:ring focus:ring-[#70275a] focus:ring-opacity-50 text-gray-900"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-[#70275a] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-8 space-y-4 sm:space-y-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#70275a]">
            Contact Messages
          </h1>
          <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-end">
            <Link
              to="/"
              className="flex items-center px-2 sm:px-4 py-1.5 sm:py-2 bg-[#70275a] text-white text-sm rounded-md hover:bg-opacity-90 transition-colors"
            >
              <Home className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center px-2 sm:px-4 py-1.5 sm:py-2 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300 transition-colors"
            >
              <LogOut className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {state.error && (
          <div className="bg-red-50 text-red-800 p-4 rounded-md mb-4">
            {state.error}
          </div>
        )}

        {state.loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-[#70275a]" />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {state.messages.map((message) => (
                    <tr key={message.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(message.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {message.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {message.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {message.phone || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {message.subject}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {message.message}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDeleteMessage(message.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
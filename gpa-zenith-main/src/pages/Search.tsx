import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search as SearchIcon, User, Lock, GraduationCap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatusIndicator } from '@/components/ui/status-indicator';

interface UserResult {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  privacy: boolean;
  status: string;
  gpa?: number;
  semesters?: number;
}

export const Search: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<UserResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const allUsers: UserResult[] = [
    {
      id: '1',
      name: 'Ahmed Ali',
      email: 'ahmed.ali@university.edu',
      privacy: false,
      status: 'Studying for finals',
      gpa: 3.85,
      semesters: 6,
    },
    {
      id: '2',
      name: 'Sara Mohammed',
      email: 'sara.mohammed@university.edu',
      privacy: true,
      status: 'Computer Science major',
    },
    {
      id: '3',
      name: 'Omar Hassan',
      email: 'omar.hassan@university.edu',
      privacy: false,
      status: 'Available for study groups',
      gpa: 3.92,
      semesters: 4,
    },
  ];

  // Get initial search query from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (q) {
      setSearchQuery(q);
      performSearch(q);
    }
  }, [location.search]);

  const performSearch = (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const filtered = allUsers.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsLoading(false);
    }, 600); // delay للتجربة
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      performSearch(searchQuery.trim());
    }
  };

  const handleUserClick = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Search Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto">
          <SearchIcon className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Find Students</h1>
          <p className="text-muted-foreground">
            Connect with other students and view their academic progress
          </p>
        </div>
      </div>

      {/* Search Form */}
      <Card className="card-hover">
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder={t('searchUsers')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <SearchIcon className="w-4 h-4" />
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            Search Results ({results.length})
          </h2>
          <div className="space-y-3">
            {results.map((user) => (
              <Card 
                key={user.id} 
                className="card-hover cursor-pointer"
                onClick={() => handleUserClick(user.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="relative">
                      {user.avatarUrl ? (
                        <img
                          src={user.avatarUrl}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                      <StatusIndicator
                        status="online"
                        size="sm"
                        className="absolute -bottom-0.5 -right-0.5 border-2 border-background"
                      />
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold truncate">{user.name}</h3>
                        <Badge variant={user.privacy ? 'secondary' : 'default'} className="flex items-center gap-1">
                          {user.privacy ? (
                            <>
                              <Lock className="w-3 h-3" />
                              {t('private')}
                            </>
                          ) : (
                            <>
                              <GraduationCap className="w-3 h-3" />
                              {t('public')}
                            </>
                          )}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mb-1">
                        {user.email}
                      </p>
                      {user.status && (
                        <p className="text-sm text-foreground">{user.status}</p>
                      )}
                    </div>

                    {/* Stats (if public) */}
                    {!user.privacy && user.gpa && (
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">
                          {user.gpa.toFixed(2)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          GPA ({user.semesters} sem.)
                        </p>
                      </div>
                    )}

                    {user.privacy && (
                      <div className="text-center p-2">
                        <Lock className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
                        <p className="text-xs text-muted-foreground">Private</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {searchQuery && !isLoading && results.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <SearchIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No students found</h3>
            <p className="text-muted-foreground">
              Try searching with a different name or email address.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!searchQuery && (
        <Card className="text-center py-12">
          <CardContent>
            <SearchIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Start searching</h3>
            <p className="text-muted-foreground">
              Enter a student's name or email to find their profile.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

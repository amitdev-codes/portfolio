// resources/js/components/UserShow.tsx
import { router } from '@inertiajs/react';

import { ArrowLeft, Mail, User, Shield, Calendar, CheckCircle, Edit, Download, Printer } from 'lucide-react';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UserShowProps {
  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    role_names: string;
    roles: string[];
    created_at: string;
    updated_at: string;
  };
  onEdit?: (id: number) => void;
  onBack?: () => void;
  showActions?: boolean;
  className?: string;
}

const UserShow: React.FC<UserShowProps> = ({
  user,
  onEdit,
  onBack,
  showActions = true,
  className = '',
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      {showActions && (
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={onBack || (() => router.back())}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Users
          </Button>
          
          {onEdit && (
            <Button onClick={() => onEdit(user.id)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit User
            </Button>
          )}
        </div>
      )}

      {/* Profile Card */}
      <Card className="border-0 shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 pb-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-3xl font-bold truncate">{user.name}</CardTitle>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <Badge variant="secondary" className="text-sm capitalize">
                  {user.role_names || 'User'}
                </Badge>
                {user.email_verified_at && (
                  <Badge variant="default" className="text-sm flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Email */}
          <div className="flex items-start gap-4 p-6 bg-muted/50 rounded-2xl border">
            <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-muted-foreground mb-1">Email Address</p>
              <p className="text-lg font-semibold break-all">{user.email}</p>
            </div>
          </div>

          {/* Roles */}
          <div className="p-6 bg-muted/50 rounded-2xl border">
            <p className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Roles & Permissions
            </p>
            <div className="flex flex-wrap gap-2">
              {user.roles.map((role, index) => (
                <Badge key={index} variant="outline" className="capitalize px-3 py-1 text-xs">
                  {role}
                </Badge>
              ))}
            </div>
          </div>

          {/* Created At */}
          <div className="flex items-start gap-4 p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100">
            <div className="h-12 w-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Calendar className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-1">Created</p>
              <p className="text-xl font-bold text-foreground">{user.created_at}</p>
            </div>
          </div>

          {/* Updated At */}
          <div className="flex items-start gap-4 p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
            <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-1">Last Updated</p>
              <p className="text-xl font-bold text-foreground">{user.updated_at}</p>
            </div>
          </div>

          {/* User ID */}
          <div className="col-span-1 lg:col-span-2 flex items-center gap-4 p-6 bg-gradient-to-r from-muted to-muted/50 rounded-2xl border">
            <div className="h-12 w-12 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground">User ID</p>
              <p className="text-2xl font-mono font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                #{user.id}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Print Actions (for print page) */}
      {showActions && (
        <div className="flex justify-center gap-4 pt-8 border-t">
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserShow;
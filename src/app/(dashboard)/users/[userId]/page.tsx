import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Separator } from '@/components/ui/separator';
import { UserRole } from '@/constants/enums';
import {
  BriefcaseIcon,
  CalendarIcon,
  CodeIcon,
  MailIcon,
  PencilIcon,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { getUser } from './_api';

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  const res = await getUser(userId);
  const user = res.data;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'destructive';
      case UserRole.MANAGER:
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/users">Users</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbPage>{user.name}</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Profile Header */}
            <Card className="group relative">
              <CardHeader className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-3">
                      <div>
                        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                          {user.name}
                        </h1>
                        <p className="text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={getRoleBadgeVariant(user.role as UserRole)}
                          className="capitalize"
                        >
                          {user.role}
                        </Badge>
                        {user.department && (
                          <Badge variant="outline">{user.department}</Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Edit Button with Hover */}
                  <HoverCard openDelay={200}>
                    <HoverCardTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold">
                          Edit User Profile
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Update user information including name, email, role,
                          department, and skills.
                        </p>
                        <Button className="w-full" size="sm">
                          Edit Profile
                        </Button>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </CardHeader>
            </Card>

            {/* Bio/About Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5" />
                  About
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Experienced {user.role} with a passion for building scalable
                  web applications. Specializing in modern JavaScript frameworks
                  and cloud infrastructure. Strong advocate for clean code and
                  test-driven development.
                </p>
              </CardContent>
            </Card>

            {/* Skills Section */}
            {user.skills && user.skills.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CodeIcon className="h-5 w-5" />
                    Skills & Expertise
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill: string) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="px-3 py-1"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <MailIcon className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">{user.email}</p>
                  </div>
                </div>

                {user.department && (
                  <>
                    <Separator />
                    <div className="flex items-center gap-3">
                      <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground">
                          Department
                        </p>
                        <p className="text-sm font-medium">{user.department}</p>
                      </div>
                    </div>
                  </>
                )}

                <Separator />
                <div className="flex items-center gap-3">
                  <UserIcon className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Role</p>
                    <p className="text-sm font-medium capitalize">
                      {user.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Account Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">
                      Member Since
                    </p>
                    <p className="text-sm font-medium">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <Separator />
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">
                      Last Updated
                    </p>
                    <p className="text-sm font-medium">
                      {new Date(user.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

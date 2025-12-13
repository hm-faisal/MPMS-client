'use client';

import { InputField } from '@/components/form/input';
import { LogoIcon } from '@/components/global/logo';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FieldGroup } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useLogin } from '../hooks';

export default function LoginForm() {
  const { form, onSubmit, isLoading } = useLogin();

  return (
    <form onSubmit={onSubmit}>
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <Link href="/" aria-label="go home" className="mx-auto block w-fit">
            <LogoIcon />
          </Link>
          <CardTitle className="text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <InputField
              name="email"
              label="Email"
              placeholder="jon@example.com"
              control={form.control}
            />
            <InputField
              name="password"
              label="Password"
              placeholder="Password"
              control={form.control}
            />
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
          <Label className="text-accent-foreground text-sm flex">
            <span>Don't have an account ?</span>
            <Button asChild variant={'link'} className="px-2">
              <Link href="/register">Create account</Link>
            </Button>
          </Label>
          <div className="flex gap-2">
            <Label>login as: </Label>
            <Button
              variant={'outline'}
              size={'sm'}
              onClick={() =>
                form.reset({
                  email: 'admin@example.com',
                  password: 'Pass@123',
                })
              }
            >
              Admin
            </Button>
            <Button
              variant={'outline'}
              size={'sm'}
              onClick={() =>
                form.reset({
                  email: 'manager@example.com',
                  password: 'Pass@123',
                })
              }
            >
              Manager
            </Button>
            <Button
              variant={'outline'}
              size={'sm'}
              onClick={() =>
                form.reset({
                  email: 'member@example.com',
                  password: 'Pass@123',
                })
              }
            >
              Member
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}

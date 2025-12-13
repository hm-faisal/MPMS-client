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
import { useRegister } from '../hooks';

export default function LoginForm() {
  const { form, onSubmit, isLoading } = useRegister();

  return (
    <form onSubmit={onSubmit}>
      <Card className="w-full md:min-w-md">
        <CardHeader className="space-y-2 text-center">
          <Link href="/" aria-label="go home" className="mx-auto block w-fit">
            <LogoIcon className="h-8 w-8" />
          </Link>
          <CardTitle className="text-xl">Register</CardTitle>
          <CardDescription className="text-sm">
            Register to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Grid with slightly more space between fields */}
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              name="name"
              label="Name"
              placeholder="John Doe"
              control={form.control}
              labelClassName="text-sm"
              inputClassName="text-sm"
            />
            <InputField
              name="email"
              label="Email"
              placeholder="john@example.com"
              control={form.control}
              labelClassName="text-sm"
              inputClassName="text-sm"
            />
            <InputField
              name="password"
              label="Password"
              placeholder="••••••••"
              control={form.control}
              labelClassName="text-sm"
              inputClassName="text-sm"
            />
            <InputField
              name="department"
              label="Department"
              placeholder="Engineering"
              control={form.control}
              labelClassName="text-sm"
              inputClassName="text-sm"
            />
            <InputField
              name="skills"
              label="Skills"
              placeholder="React, TypeScript"
              control={form.control}
              labelClassName="text-sm"
              inputClassName="text-sm"
              className="md:col-span-2"
            />
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 pt-4">
          <Button
            type="submit"
            className="w-full text-sm py-2"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
          <Label className="text-xs sm:text-sm text-muted-foreground flex items-center justify-center gap-1">
            Already have an account?
            <Button
              asChild
              variant="link"
              className="px-1 h-auto text-sm underline-offset-2"
            >
              <Link href="/login">Login</Link>
            </Button>
          </Label>
        </CardFooter>
      </Card>
    </form>
  );
}

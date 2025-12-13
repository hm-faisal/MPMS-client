'use client';
import { Logo } from '@/components/global/logo';
import { ThemeToggler } from '@/components/global/theme-toggler';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';

// Customer logos with known dimensions (approximated based on common logo ratios)
const customers = [
  {
    src: 'https://html.tailus.io/blocks/customers/nvidia.svg',
    alt: 'Nvidia Logo',
    height: 20,
    id: 'nvidia',
  },
  {
    src: 'https://html.tailus.io/blocks/customers/column.svg',
    alt: 'Column Logo',
    height: 16,
    id: 'column',
  },
  {
    src: 'https://html.tailus.io/blocks/customers/github.svg',
    alt: 'GitHub Logo',
    height: 16,
    id: 'github',
  },
  {
    src: 'https://html.tailus.io/blocks/customers/nike.svg',
    alt: 'Nike Logo',
    height: 20,
    id: 'nike',
  },
  {
    src: 'https://html.tailus.io/blocks/customers/laravel.svg',
    alt: 'Laravel Logo',
    height: 16,
    id: 'laravel',
  },
  {
    src: 'https://html.tailus.io/blocks/customers/lilly.svg',
    alt: 'Lilly Logo',
    height: 28,
    id: 'lilly',
  },
  {
    src: 'https://html.tailus.io/blocks/customers/lemonsqueezy.svg',
    alt: 'Lemon Squeezy Logo',
    height: 20,
    id: 'lemonsqueezy',
  },
  {
    src: 'https://html.tailus.io/blocks/customers/openai.svg',
    alt: 'OpenAI Logo',
    height: 24,
    id: 'openai',
  },
  {
    src: 'https://html.tailus.io/blocks/customers/tailwindcss.svg',
    alt: 'Tailwind CSS Logo',
    height: 16,
    id: 'tailwindcss',
  },
  {
    src: 'https://html.tailus.io/blocks/customers/vercel.svg',
    alt: 'Vercel Logo',
    height: 20,
    id: 'vercel',
  },
  {
    src: 'https://html.tailus.io/blocks/customers/zapier.svg',
    alt: 'Zapier Logo',
    height: 20,
    id: 'zapier',
  },
];

export default function HeroSection({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  return (
    <>
      <header>
        <nav className="fixed z-20 w-full border-b border-dashed bg-white backdrop-blur md:relative dark:bg-zinc-950/50 lg:dark:bg-transparent">
          <div className="m-auto max-w-5xl px-6">
            <div className="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
              <div className="flex w-full justify-between lg:w-auto">
                <Link
                  href="/"
                  aria-label="home"
                  className="flex items-center space-x-2"
                >
                  <Logo />
                </Link>
              </div>

              <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit  lg:pl-6">
                  {isAuthenticated ? (
                    <Button asChild variant="outline" size="sm">
                      <Link href="/home">
                        <span>Dashboard</span>
                      </Link>
                    </Button>
                  ) : (
                    <>
                      <Button asChild size="sm">
                        <Link href="/login">
                          <span>Sign in</span>
                        </Link>
                      </Button>
                      <Button asChild size="sm">
                        <Link href="/register">
                          <span>Get started</span>
                        </Link>
                      </Button>
                    </>
                  )}
                  <ThemeToggler />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main className="overflow-hidden">
        <section>
          <div className="relative pt-24">
            <div className="mx-auto max-w-7xl px-6">
              <div className="max-w-3xl text-center sm:mx-auto lg:mr-auto lg:mt-0 lg:w-4/5">
                <Link
                  href="/"
                  className="rounded-(--radius) mx-auto flex w-fit items-center gap-2 border p-1 pr-3"
                >
                  <span className="bg-muted rounded-[calc(var(--radius)-0.25rem)] px-2 py-1 text-xs">
                    Simple
                  </span>
                  <span className="text-sm">
                    Project management made effortless
                  </span>
                  <span className="bg-(--color-border) block h-4 w-px"></span>
                  <ArrowRight className="size-4" />
                </Link>

                <h1 className="mt-8 text-balance text-4xl font-semibold md:text-5xl xl:text-6xl xl:leading-[1.125]">
                  Organize projects, ship faster
                </h1>
                <p className="mx-auto mt-8 hidden max-w-2xl text-wrap text-lg sm:block">
                  Keep your team aligned with a minimal project management
                  system that gets out of your way. Track tasks, collaborate in
                  real-time, and deliver on time.
                </p>
                <p className="mx-auto mt-6 max-w-2xl text-wrap sm:hidden">
                  A minimal project management system that helps your team stay
                  organized and ship faster.
                </p>

                <div className="mt-8">
                  <Button size="lg" asChild>
                    <Link href="/register">
                      <CheckCircle2 className="relative size-4" />
                      <span className="text-nowrap">Start free</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="mask-b-from-55% relative mx-auto mt-16 max-w-6xl overflow-hidden px-4">
              {/* Local image – ensure it's in public/ */}
              <Image
                src="/dashboard.png"
                alt="Project management dashboard"
                width={2796}
                height={2008}
                className="w-full h-auto rounded-2xl border border-border/25"
                priority
              />
            </div>
          </div>
        </section>

        <section className="bg-background relative z-10 pb-16">
          <div className="m-auto max-w-5xl px-6">
            <h2 className="text-center text-lg font-medium">
              Trusted by teams worldwide
            </h2>
            <div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16 sm:gap-y-12">
              {customers.map((customer) => (
                <div
                  key={`customer-${customer.id}`}
                  className="h-(--h) w-fit dark:invert"
                  style={
                    { '--h': `${customer.height}px` } as React.CSSProperties
                  }
                >
                  <Image
                    src={customer.src}
                    alt={customer.alt}
                    width={customer.height * 3} // approximate width (logos are often 2-4x height)
                    height={customer.height}
                    className="h-full w-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

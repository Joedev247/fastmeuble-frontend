import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing.config';

// Create navigation helpers with locale-aware Link, redirect, etc.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

// import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
import { cn } from '@/lib/utils';
import { MobileSidebar } from './mobile-sidebar';
import { UserNav } from './user-nav';
// import logo from '../../app/logo.png'

export default function Header() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 absolute left-0 right-0 top-0 z-20 bg-white backdrop-blur">
      <nav className="flex h-14 items-center justify-between px-4">

        <div className={cn('block lg:!hidden')}>
          {/* <MobileSidebar /> */}
        </div>

        <div className="flex items-center justify-end ml-auto gap-2 w-full">
          <UserNav />
          {/* <ThemeToggle /> */}
        </div>
      </nav>
    </div>
  );
}

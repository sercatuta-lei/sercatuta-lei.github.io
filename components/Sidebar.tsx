"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-44 h-screen bg-black text-white py-8 px-4 fixed top-0 left-0 z-40">
      {/* Logo and Lab Name at the top */}
      <div className="mb-10 flex flex-col items-center justify-center">
        <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="20" r="20" fill="#fff" fillOpacity="0.1" />
          <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold" dy=".3em">UTA</text>
        </svg>
        <span className="mt-3 text-lg font-bold tracking-tight text-white text-center">Jeff Lei's Lab</span>
      </div>
      <nav className="flex flex-col gap-2">
        <SidebarLink href="/">Home</SidebarLink>
        <SidebarLink href="/team">Team</SidebarLink>
        <SidebarLink href="/allnews">News</SidebarLink>
        <SidebarLink href="/publications">Publications</SidebarLink>
        <SidebarLink href="/projects">Projects</SidebarLink>
        <SidebarLink href="/future">Future Students</SidebarLink>
        <SidebarLink href="/updates">Archive</SidebarLink>
      </nav>
    </aside>
  );
}

function SidebarLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 rounded-lg font-semibold text-white hover:bg-gray-800 hover:text-white transition-colors duration-150 text-base"
    >
      {children}
    </Link>
  );
} 
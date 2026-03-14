'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  
  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Transactions", href: "dashboard/transactions" },
    { name: "Assets", href: "dashboard/assets" },
    { name: "Investments", href: "dashboard/investments" },
    { name: "Settings", href: "dashboard/settings" },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Finance Tracker</h2>
      <nav>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block py-2 px-4 rounded ${
              pathname === item.href ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}



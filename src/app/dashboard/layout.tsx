import Sidebar from "@/components/sidebar";

export default function DahboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
        <aside>
            <Sidebar/>
        </aside>
        <main>
            {children}
        </main>
    </div>
  );
}
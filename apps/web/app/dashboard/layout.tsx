import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-dashboard flex text-white font-sans">
      <Sidebar />
      <main className="flex-1 ml-[240px] w-[calc(100%-240px)]">
        {children}
      </main>
    </div>
  );
}
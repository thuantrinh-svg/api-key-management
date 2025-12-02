interface DashboardHeaderProps {
  title: string;
}

export function DashboardHeader({ title }: DashboardHeaderProps) {
  return (
    <div className="mb-6 md:mb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
    </div>
  );
}

import AppLayout from "../components/layout/AppLayout";

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Welcome to your developer workspace.
        </p>
      </div>
    </AppLayout>
  );
}
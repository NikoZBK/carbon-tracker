import { Card } from '../components/ui';
import { CarbonSummary } from '../components/charts';
import { ActivityList } from '../components/activities';

export default function Dashboard() {
  return (
    <>
      <h1 className="text-title">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-3 md:col-span-2">
          <h2 className="text-subtitle mb-4">Quick Overview</h2>
          <p className="text-body">
            Monitor your carbon emissions at a glance and track your
            environmental impact. Use the Activity Log to record your daily
            activities.
          </p>
          {/* Dashboard content will go here */}
        </Card>

        <Card>
          <h2 className="text-subtitle mb-4">Tips</h2>
          <ul className="styled-list">
            <li className="text-body">Walk or cycle for short trips</li>
            <li className="text-body">Reduce meat consumption</li>
            <li className="text-body">Use energy-efficient appliances</li>
          </ul>
        </Card>
      </div>

      <CarbonSummary className="mb-6" />

      <ActivityList title="Recent Activities" />
    </>
  );
}

import { useState } from 'react';
import { ActivityForm } from '../components/forms';
import { ActivityList } from '../components/activities';
import { CarbonSummary, Timeline } from '../components/charts';

export default function ActivityLog() {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().substring(0, 10)
  );

  // Handle date changes from the Timeline component
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-title pb-2">Activity Log</h1>
      </div>

      <p className="text-body">
        Track your daily activities and see their impact on your carbon
        footprint
      </p>
      <CarbonSummary />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-fit">
        {/* Left Column - Activity Form */}
        <ActivityForm className="h-grow" />

        {/* Right Column - Timeline with Activity List */}

        <Timeline
          title="Activities Timeline"
          subtitle="No activities logged yet."
          initialDate={selectedDate}
          onDateChange={handleDateChange}
        >
          <ActivityList date={selectedDate} />
        </Timeline>
      </div>
    </div>
  );
}

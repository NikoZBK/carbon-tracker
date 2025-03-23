import { useActivity } from '../../hooks/useActivity';
import {
  ACTIVITY_TYPES,
  ACTIVITY_CATEGORIES,
} from '../../constants/activities';
import { Activity } from '../../contexts/ActivityContext';
import ActivityItem from './ActivityItem';
import Card from '../ui/Card';

interface ActivityListProps {
  title?: string;
  date?: string;
  className?: string;
}
/**
 * ActivityList component for displaying a list of activities.
 *
 * This component displays a list of activities with details such as activity type,
 * quantity, date, and carbon footprint. It also allows users to expand and collapse
 * individual activities to view additional details.
 * @param date - Optional date string to filter activities by a specific date
 * @param className - Additional CSS class name for styling the component container
 */
export default function ActivityList({
  title,
  date,
  className = '',
}: ActivityListProps) {
  const { activities } = useActivity();

  // Filter activities by date if provided
  const filteredActivities = date
    ? activities.filter(activity => activity.date.substring(0, 10) === date)
    : activities;

  // Sort activities by most recent first
  const sortedActivities = [...filteredActivities].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (sortedActivities.length === 0) {
    return (
      <div
        className={`${className} mobile-full-width`}
        role="status"
        aria-live="polite"
      >
        <p className="text-center py-4 text-muted">No activities logged yet.</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getActivityIcon = (activity: Activity) => {
    if (activity.isCustom) {
      return 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2';
    }

    const activityType = ACTIVITY_TYPES.find(t => t.id === activity.typeId);
    if (!activityType) return '';

    const category = ACTIVITY_CATEGORIES.find(
      c => c.id === activityType.categoryId
    );
    return category?.icon || '';
  };

  const getActivityColor = (activity: Activity) => {
    if (activity.isCustom) {
      return '#6366f1'; // Indigo color
    }

    const activityType = ACTIVITY_TYPES.find(t => t.id === activity.typeId);
    if (!activityType) return '#6366f1';

    const category = ACTIVITY_CATEGORIES.find(
      c => c.id === activityType.categoryId
    );
    return category?.color || '#6366f1';
  };

  const getActivityName = (activity: Activity) => {
    if (activity.isCustom) {
      return activity.customName;
    }

    const activityType = ACTIVITY_TYPES.find(t => t.id === activity.typeId);
    return activityType?.name || 'Unknown Activity';
  };

  const getActivityUnit = (activity: Activity) => {
    if (activity.isCustom) {
      return activity.customUnit;
    }

    const activityType = ACTIVITY_TYPES.find(t => t.id === activity.typeId);
    return activityType?.unit || 'units';
  };

  return (
    <Card
      className={`${className} mobile-full-width border-1 border-light1`}
      aria-label="List of activities"
      role="region"
    >
      {title && <h2 className="text-subtitle mb-4">{title}</h2>}
      <ul className="space-y-4 py-2" role="list">
        {sortedActivities.map(activity => (
          <li
            key={activity.id}
            className="rounded-xl elevation-1 hover:elevation-2 transition-shadow"
          >
            <ActivityItem
              activity={activity}
              getActivityName={getActivityName}
              getActivityUnit={getActivityUnit}
              getActivityIcon={getActivityIcon}
              getActivityColor={getActivityColor}
              formatDate={formatDate}
            />
          </li>
        ))}
      </ul>
    </Card>
  );
}

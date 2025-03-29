import { useState } from 'react';
import { Activity } from '../../contexts/ActivityContext';
import { useActivity } from '../../hooks/useActivity';

interface ActivityItemProps {
  activity: Activity;
  getActivityName: (activity: Activity) => string | undefined;
  getActivityUnit: (activity: Activity) => string | undefined;
  getActivityIcon: (activity: Activity) => string;
  getActivityColor: (activity: Activity) => string;
  formatDate: (dateString: string) => string;
}

export default function ActivityItem({
  activity,
  getActivityName,
  getActivityUnit,
  getActivityIcon,
  getActivityColor,
  formatDate,
}: ActivityItemProps) {
  const { getActivityCarbonFootprint, deleteActivity } = useActivity();
  const [isExpanded, setIsExpanded] = useState(false);

  const activityName = getActivityName(activity);
  const activityUnit = getActivityUnit(activity);
  const iconPath = getActivityIcon(activity);
  const activityColor = getActivityColor(activity);
  const carbonFootprint = getActivityCarbonFootprint(activity);

  const activityId = `activity-${activity.id}`;
  const detailsId = `activity-details-${activity.id}`;

  return (
    <div className="py-3 px-4 rounded-md mobile-full-width">
      <div
        className="flex items-center cursor-pointer touch-target"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={detailsId}
        role="button"
        tabIndex={0}
        id={activityId}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
          style={{ backgroundColor: activityColor + '30' }} // 30 for opacity
          aria-hidden="true"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={activityColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d={iconPath} />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="text-subtitle font-medium truncate">
              {activityName}
            </h3>
            <span className="text-sm text-tertiary ml-2">
              {formatDate(activity.date)}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>
              {activity.quantity} {activityUnit}
            </span>
            <span className="font-medium text-accent">
              {carbonFootprint.toFixed(2)} kg CO₂e
            </span>
          </div>
        </div>

        <div className="ml-4">
          <svg
            className={`w-5 h-5 transform transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {isExpanded && (
        <div
          className="mt-3 pl-12 pt-3 text-sm space-y-2"
          id={detailsId}
          role="region"
          aria-labelledby={activityId}
        >
          {activity.notes && (
            <div className="text-secondary">
              <p>{activity.notes}</p>
            </div>
          )}
          <div className="flex justify-end">
            <button
              onClick={() => deleteActivity(activity.id)}
              className="text-error hover:underline touch-target p-2 rounded-md"
              aria-label={`Delete ${activityName} activity`}
            >
              <span className="hidden md:inline">Delete</span>
              <svg
                className="w-5 h-5 md:hidden"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

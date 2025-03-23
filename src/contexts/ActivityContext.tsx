import { createContext, ReactNode, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { ACTIVITY_TYPES } from '../constants/activities';
import { useEvent } from '../hooks/useEvent';
import { APP_EVENTS } from '../constants/events';

export interface Activity {
  id: string;
  date: string; // ISO date string
  typeId: string;
  quantity: number;
  notes?: string;
  // Custom activity fields
  isCustom?: boolean;
  customName?: string;
  customUnit?: string;
  customCarbonPerUnit?: number;
}

interface ActivityContextType {
  activities: Activity[];
  addActivity: (activity: Omit<Activity, 'id'>) => void;
  updateActivity: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  getActivityCarbonFootprint: (activity: Activity) => number;
  getTotalCarbonFootprint: (
    period?: 'day' | 'week' | 'month' | 'all'
  ) => number;
  getActivitiesByDate: (date: string) => Activity[];
}

const ActivityContext = createContext<ActivityContextType>({
  activities: [],
  addActivity: () => {},
  updateActivity: () => {},
  deleteActivity: () => {},
  getActivityCarbonFootprint: () => 0,
  getTotalCarbonFootprint: () => 0,
  getActivitiesByDate: () => [],
});

// Export context for the hook file to use
export { ActivityContext };

interface ActivityProviderProps {
  children: ReactNode;
}

export function ActivityProvider({ children }: ActivityProviderProps) {
  const [activities, setActivities] = useLocalStorage<Activity[]>(
    'activities',
    []
  );
  const { emit } = useEvent();

  // Use useCallback to ensure function reference stability
  const addActivity = useCallback(
    (activity: Omit<Activity, 'id'>) => {
      const newActivity = {
        ...activity,
        id: Date.now().toString(),
      } as Activity;

      setActivities(prev => {
        const updatedActivities = [...prev, newActivity];

        // Emit event after state update
        // We use setTimeout to ensure this runs after the state update is committed
        setTimeout(() => {
          emit(APP_EVENTS.ACTIVITY_ADDED, newActivity);
        }, 0);

        return updatedActivities;
      });

      return newActivity; // Return the new activity with ID
    },
    [emit, setActivities]
  );

  const updateActivity = useCallback(
    (activity: Activity) => {
      setActivities(prev => {
        const updatedActivities = prev.map(a =>
          a.id === activity.id ? activity : a
        );

        // Emit event after state update
        setTimeout(() => {
          emit(APP_EVENTS.ACTIVITY_UPDATED, activity);
        }, 0);

        return updatedActivities;
      });
    },
    [emit, setActivities]
  );

  const deleteActivity = useCallback(
    (id: string) => {
      setActivities(prev => {
        const updatedActivities = prev.filter(a => a.id !== id);

        // Emit event after state update
        setTimeout(() => {
          emit(APP_EVENTS.ACTIVITY_DELETED, { id });
        }, 0);

        return updatedActivities;
      });
    },
    [emit, setActivities]
  );

  const getActivityCarbonFootprint = (activity: Activity) => {
    // Handle custom activities
    if (activity.isCustom && activity.customCarbonPerUnit) {
      return activity.customCarbonPerUnit * activity.quantity;
    }

    // Handle predefined activities
    const activityType = ACTIVITY_TYPES.find(
      type => type.id === activity.typeId
    );
    if (!activityType) return 0;
    return activityType.carbonPerUnit * activity.quantity;
  };

  const getTotalCarbonFootprint = (
    period: 'day' | 'week' | 'month' | 'all' = 'all'
  ) => {
    if (period === 'all') {
      return activities.reduce(
        (total, activity) => total + getActivityCarbonFootprint(activity),
        0
      );
    }

    const now = new Date();
    const filterDate = new Date();

    if (period === 'day') {
      filterDate.setDate(now.getDate() - 1);
    } else if (period === 'week') {
      filterDate.setDate(now.getDate() - 7);
    } else if (period === 'month') {
      filterDate.setMonth(now.getMonth() - 1);
    }

    return activities
      .filter(activity => new Date(activity.date) >= filterDate)
      .reduce(
        (total, activity) => total + getActivityCarbonFootprint(activity),
        0
      );
  };

  const getActivitiesByDate = (date: string) => {
    return activities.filter(
      activity => activity.date.substring(0, 10) === date.substring(0, 10)
    );
  };

  return (
    <ActivityContext.Provider
      value={{
        activities,
        addActivity,
        updateActivity,
        deleteActivity,
        getActivityCarbonFootprint,
        getTotalCarbonFootprint,
        getActivitiesByDate,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}

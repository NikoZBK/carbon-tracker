import { useState, useCallback } from 'react';
import { useEventListener } from '../../hooks/useEvent';
import { APP_EVENTS } from '../../constants/events';
import Card from '../ui/Card';

interface LogEntry {
  id: string;
  event: string;
  timestamp: string;
  data: string;
}

/**
 * EventLogger component demonstrates the event-driven system
 * by showing recent events that have occurred in the application
 */
export default function EventLogger() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // Helper function to add a log entry - wrapped in useCallback to maintain reference
  const addLog = useCallback((event: string, data: unknown) => {
    const newLog: LogEntry = {
      id: Date.now().toString(),
      event,
      timestamp: new Date().toISOString(),
      data: JSON.stringify(data, null, 2),
    };

    setLogs(prevLogs => {
      // Keep only the most recent 10 logs
      const updatedLogs = [newLog, ...prevLogs];
      return updatedLogs.slice(0, 10);
    });
  }, []);

  // Add generic event listeners for various app events
  useEventListener(APP_EVENTS.ACTIVITY_ADDED, payload => {
    addLog(APP_EVENTS.ACTIVITY_ADDED, payload);
  });

  useEventListener(APP_EVENTS.ACTIVITY_UPDATED, payload => {
    addLog(APP_EVENTS.ACTIVITY_UPDATED, payload);
  });

  useEventListener(APP_EVENTS.ACTIVITY_DELETED, payload => {
    addLog(APP_EVENTS.ACTIVITY_DELETED, payload);
  });

  useEventListener(APP_EVENTS.THEME_CHANGED, payload => {
    addLog(APP_EVENTS.THEME_CHANGED, payload);
  });

  useEventListener(APP_EVENTS.MENU_TOGGLED, payload => {
    addLog(APP_EVENTS.MENU_TOGGLED, payload);
  });

  useEventListener(APP_EVENTS.SETTINGS_UPDATED, payload => {
    addLog(APP_EVENTS.SETTINGS_UPDATED, payload);
  });

  // Format the timestamp for display
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString();
  };

  // Clear all logs
  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <Card className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-subtitle">Event Log</h2>
        <button
          onClick={clearLogs}
          className="px-3 py-1 text-sm bg-light3 hover:bg-light4 rounded-md"
        >
          Clear
        </button>
      </div>

      {logs.length === 0 ? (
        <div className="text-tertiary text-center py-4">
          No events logged yet. Try interacting with the app!
        </div>
      ) : (
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {logs.map(log => (
            <div
              key={log.id}
              className="p-3 bg-light2 rounded-md border-l-4 border-primary"
            >
              <div className="flex justify-between text-xs text-tertiary mb-1">
                <span>{log.event}</span>
                <span>{formatTime(log.timestamp)}</span>
              </div>
              <pre className="text-xs overflow-x-auto p-2 bg-light3 rounded-sm">
                {log.data}
              </pre>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

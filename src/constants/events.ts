/**
 * Application event types
 *
 * These constants define all the events that can be emitted in the application.
 * Using constants instead of string literals helps prevent typos and enables
 * better autocomplete support.
 */

export const APP_EVENTS = {
  // Activity events
  ACTIVITY_ADDED: 'activity:added',
  ACTIVITY_UPDATED: 'activity:updated',
  ACTIVITY_DELETED: 'activity:deleted',

  // Theme events
  THEME_CHANGED: 'theme:changed',

  // Settings events
  SETTINGS_UPDATED: 'settings:updated',

  // Menu events
  MENU_TOGGLED: 'menu:toggled',

  // Date events
  DATE_SELECTED: 'date:selected',

  // Analytics events
  DATA_FILTERED: 'analytics:filtered',

  // Navigation events
  PAGE_CHANGED: 'navigation:page_changed',

  // User events
  USER_ACTION: 'user:action',
} as const;

// Type for all event names
export type AppEventType = (typeof APP_EVENTS)[keyof typeof APP_EVENTS];

/**
 * Event payload types for type safety when emitting and listening to events
 */
export interface EventPayloads {
  [APP_EVENTS.ACTIVITY_ADDED]: {
    id: string;
    typeId: string;
    date: string;
    quantity: number;
    notes?: string;
    isCustom?: boolean;
    customName?: string;
    customUnit?: string;
    customCarbonPerUnit?: number;
  };

  [APP_EVENTS.ACTIVITY_UPDATED]: {
    id: string;
    typeId: string;
    date: string;
    quantity: number;
    notes?: string;
    isCustom?: boolean;
    customName?: string;
    customUnit?: string;
    customCarbonPerUnit?: number;
  };

  [APP_EVENTS.ACTIVITY_DELETED]: {
    id: string;
  };

  [APP_EVENTS.THEME_CHANGED]: {
    theme: 'light' | 'dark' | 'system';
  };

  [APP_EVENTS.SETTINGS_UPDATED]: {
    key: string;
    value: unknown;
  };

  [APP_EVENTS.MENU_TOGGLED]: {
    isCollapsed: boolean;
  };

  [APP_EVENTS.DATE_SELECTED]: {
    date: string;
  };

  [APP_EVENTS.DATA_FILTERED]: {
    period: 'day' | 'week' | 'month' | 'year' | 'all';
    type?: string;
  };

  [APP_EVENTS.PAGE_CHANGED]: {
    path: string;
    title: string;
  };

  [APP_EVENTS.USER_ACTION]: {
    action: string;
    details?: Record<string, unknown>;
  };
}

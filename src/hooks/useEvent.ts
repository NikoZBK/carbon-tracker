import { useEffect, useCallback } from 'react';
import eventEmitter, { EventHandler } from '../utils/EventEmitter';
import { AppEventType, EventPayloads } from '../constants/events';

/**
 * Hook for working with the event system
 *
 * Provides type-safe methods to emit events and subscribe to them
 */
export function useEvent() {
  /**
   * Emit an event with a typed payload
   * @param event The event name
   * @param payload The event payload
   */
  const emit = useCallback(
    <E extends AppEventType>(
      event: E,
      payload: E extends keyof EventPayloads ? EventPayloads[E] : unknown
    ) => {
      eventEmitter.emit(event, payload);
    },
    []
  );

  /**
   * Subscribe to an event with a typed handler
   * @param event The event name
   * @param handler The event handler
   * @returns A function to unsubscribe
   */
  const on = useCallback(
    <E extends AppEventType>(
      event: E,
      handler: EventHandler<
        E extends keyof EventPayloads ? EventPayloads[E] : unknown
      >
    ) => {
      return eventEmitter.on(event, handler);
    },
    []
  );

  /**
   * Subscribe to an event once with a typed handler
   * @param event The event name
   * @param handler The event handler
   * @returns A function to unsubscribe
   */
  const once = useCallback(
    <E extends AppEventType>(
      event: E,
      handler: EventHandler<
        E extends keyof EventPayloads ? EventPayloads[E] : unknown
      >
    ) => {
      return eventEmitter.once(event, handler);
    },
    []
  );

  return { emit, on, once };
}

/**
 * Hook to subscribe to an event and automatically unsubscribe when the component unmounts
 * @param event The event name
 * @param handler The event handler
 */
export function useEventListener<E extends AppEventType>(
  event: E,
  handler: EventHandler<
    E extends keyof EventPayloads ? EventPayloads[E] : unknown
  >
) {
  useEffect(() => {
    const unsubscribe = eventEmitter.on(event, handler);

    // Clean up subscription when component unmounts
    return unsubscribe;
  }, [event, handler]);
}

export default useEvent;

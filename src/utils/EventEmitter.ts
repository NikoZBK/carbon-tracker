export type EventHandler<T = unknown> = (payload: T) => void;

export interface EventEmitterInterface {
  on<T>(event: string, handler: EventHandler<T>): () => void;
  off<T>(event: string, handler: EventHandler<T>): void;
  emit<T>(event: string, payload: T): void;
  once<T>(event: string, handler: EventHandler<T>): () => void;
}

class EventEmitter implements EventEmitterInterface {
  private handlers: Record<string, Array<EventHandler<unknown>>> = {};

  /**
   * Subscribe to an event
   * @param event The event name
   * @param handler The event handler
   * @returns A function to unsubscribe
   */
  on<T>(event: string, handler: EventHandler<T>): () => void {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }

    // Use type assertion here as we're storing different handler types in the same array
    this.handlers[event].push(handler as unknown as EventHandler<unknown>);

    // Return a function to unsubscribe
    return () => this.off(event, handler);
  }

  /**
   * Remove an event subscription
   * @param event The event name
   * @param handler The event handler to remove
   */
  off<T>(event: string, handler: EventHandler<T>): void {
    if (!this.handlers[event]) return;

    const handlerToRemove = handler as unknown as EventHandler<unknown>;
    const index = this.handlers[event].indexOf(handlerToRemove);
    if (index !== -1) {
      this.handlers[event].splice(index, 1);
    }
  }

  /**
   * Emit an event with payload
   * @param event The event name
   * @param payload The event payload
   */
  emit<T>(event: string, payload: T): void {
    const handlers = this.handlers[event];
    if (!handlers || handlers.length === 0) return;

    // Call each handler with the payload
    handlers.forEach(handler => {
      try {
        handler(payload as unknown);
      } catch (error) {
        console.error(`Error in event handler for "${event}":`, error);
      }
    });
  }

  /**
   * Subscribe to an event only once
   * @param event The event name
   * @param handler The event handler
   * @returns A function to unsubscribe
   */
  once<T>(event: string, handler: EventHandler<T>): () => void {
    const onceHandler: EventHandler<T> = (payload: T) => {
      // Remove itself after execution
      this.off(event, onceHandler);
      handler(payload);
    };

    return this.on(event, onceHandler);
  }
}

// Create a singleton instance
export const eventEmitter = new EventEmitter();

export default eventEmitter;

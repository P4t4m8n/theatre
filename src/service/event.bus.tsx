// Define an enum for the types of messages
export const SHOW_MSG = "show-msg";

export enum MessageType {
  Success = "success",
  Error = "error",
  Info = "info",
}

// Define the base interface for event data using the enum
interface EventData {
  msg: string;
  type: MessageType;
}

// Specific event data types can extend the base type
interface SuccessData extends EventData {
  type: MessageType.Success;
}

interface ErrorData extends EventData {
  type: MessageType.Error;
}

interface InfoData extends EventData {
  type: MessageType.Info;
}

export type KnownEventData = SuccessData | ErrorData | InfoData;

type Listener<T> = (data: T) => void;

interface ListenersMap {
  [eventName: string]: Listener<KnownEventData>[];
}

function createEventEmitter() {
  const listenersMap: ListenersMap = {};

  return {
    on<T extends KnownEventData>(
      evName: string,
      listener: Listener<T>
    ): () => void {
      listenersMap[evName] = (listenersMap[evName] ||
        []) as Listener<KnownEventData>[];
      listenersMap[evName].push(
        listener as unknown as Listener<KnownEventData>
      );
      return () => {
        listenersMap[evName] = listenersMap[evName].filter(
          (func) => func !== listener
        );
      };
    },
    emit<T extends KnownEventData>(evName: string, data: T): void {
      if (!listenersMap[evName]) return;
      listenersMap[evName].forEach((listener: Listener<KnownEventData>) =>
        listener(data as KnownEventData)
      );
    },
  };
}

export const eventBus = createEventEmitter();

// Use the MessageType enum to ensure type safety.
export function showUserMsg(msg: string, type: MessageType = MessageType.Info) {
  eventBus.emit<KnownEventData>(SHOW_MSG, { msg, type });
}

export function showSuccessMsg(msg: string) {
  showUserMsg(msg, MessageType.Success);
}

export function showErrorMsg(msg: string) {
  showUserMsg(msg, MessageType.Error);
}

// Extend the Window interface for the global function
declare global {
  interface Window {
    showUserMsg: typeof showUserMsg;
  }
}

window.showUserMsg = showUserMsg;

export function setupMessageListeners(): void {
  eventBus.on<KnownEventData>(SHOW_MSG, (data) => {
    if (data.type === MessageType.Success) {
      console.log("Success:", data.msg);
    } else if (data.type === MessageType.Error) {
      console.error("Error:", data.msg);
    } else {
      console.log("Info:", data.msg);
    }
  });
}

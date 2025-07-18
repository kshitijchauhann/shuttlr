import { SignalMessage } from "./types";

let receivedChunks: ArrayBuffer[] = [];

export function handleIncomingFileChunk(event: MessageEvent, onComplete: (blob: Blob, name: string) => void) {
  if (typeof event.data === "string") {
    try {
      const message = JSON.parse(event.data);
      if (message.done) {
        const blob = new Blob(receivedChunks, { type: message.type });
        onComplete(blob, message.name);
        receivedChunks = [];
      }
    } catch {
      console.error("Invalid JSON message");
    }
  } else {
    receivedChunks.push(event.data);
  }
}

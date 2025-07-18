import { SignalMessage } from "./types";

export function sendFileInChunks(file: File, channel: RTCDataChannel) {
  const CHUNK_SIZE = 64 * 1024;
  let offset = 0;

  const sendChunk = () => {
    const slice = file.slice(offset, offset + CHUNK_SIZE);
    const reader = new FileReader();

    reader.onload = () => {
      channel.send(reader.result as ArrayBuffer);
      offset += CHUNK_SIZE;

      if (offset < file.size) sendChunk();
      else {
        channel.send(JSON.stringify({ done: true, name: file.name, type: file.type }));
      }
    };

    reader.readAsArrayBuffer(slice);
  };

  sendChunk();
}

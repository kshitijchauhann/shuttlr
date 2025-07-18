import { SignalMessage } from "./types";

export const createPeerConnection = () => {
  return new RTCPeerConnection({
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:global.stun.twilio.com:3478" },
    ],
  });
};

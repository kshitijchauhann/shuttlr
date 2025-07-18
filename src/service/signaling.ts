import { SignalMessage } from "./types";

export async function sendOffer(pc: RTCPeerConnection, socket: WebSocket, room: string) {
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  socket.send(JSON.stringify({ type: "offer", sdp: offer, room }));
}

export async function handleOfferAndSendAnswer(
  pc: RTCPeerConnection,
  offer: RTCSessionDescriptionInit,
  socket: WebSocket,
  room: string
) {
  await pc.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
  socket.send(JSON.stringify({ type: "answer", sdp: answer, room }));
}


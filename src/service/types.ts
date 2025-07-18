export type SignalMessage =
  | { type: "offer"; sdp: RTCSessionDescriptionInit; room: string }
  | { type: "answer"; sdp: RTCSessionDescriptionInit; room: string }
  | { type: "ice-candidate"; candidate: RTCIceCandidateInit; room: string };

export interface FileDoneMessage {
  done: true;
  name: string;
  type: string;
  size: number;
}

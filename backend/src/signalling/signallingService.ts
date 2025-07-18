import { WebSocketServer, WebSocket } from "ws";

// Define message interfaces for strong typing
interface BaseMessage {
  type: string;
  room: string;
}

interface JoinMessage extends BaseMessage {
  type: "join";
  user: string; // The userId of the joining client
  isCaller: boolean; // Whether this client intends to be the caller
}

interface SignalingMessage extends BaseMessage {
  type: "offer" | "answer";
  sdp: RTCSessionDescriptionInit;
}

interface IceCandidateMessage extends BaseMessage {
  type: "ice-candidate";
  candidate: RTCIceCandidateInit;
}

type IncomingMessage = JoinMessage | SignalingMessage | IceCandidateMessage;

// Define outgoing message interfaces
interface UserInfo {
  id: string;
  isCaller: boolean;
}

interface UserJoinedLeftMessage extends BaseMessage {
  type: "user-joined" | "user-left";
  user: UserInfo; // Information about the user who joined/left
}

interface ErrorMessage extends BaseMessage {
  type: "error";
  message: string;
}

interface RoomFullMessage extends BaseMessage {
  type: "room-full";
}

// Client information stored on the server
interface RoomClient {
  ws: WebSocket;
  userId: string;
  isCaller: boolean; // Indicates if this client initiated the offer
}

// In-memory store for rooms and clients
const rooms: Record<string, RoomClient[]> = {};

export function setupWebSocketServer(wss: WebSocketServer) {
  wss.on("connection", (ws: WebSocket) => {
    let clientId: string | null = null;
    let clientRoomId: string | null = null;

    console.log("New WebSocket connection established.");

    ws.on("message", (rawMessage: string) => {
      try {
        const msg: IncomingMessage = JSON.parse(rawMessage.toString());
        console.log(`Received message from ${clientId || 'unknown'}:`, msg.type, msg.room);

        // All messages must have a room
        if (!msg.room) {
          console.warn("Received message without a room:", msg);
          return;
        }

        switch (msg.type) {
          case "join":
            // Associate connection with user and room
            clientId = msg.user;
            clientRoomId = msg.room;
            handleJoin(ws, msg);
            break;

          case "offer":
          case "answer":
          case "ice-candidate":
            // Ensure the client has joined a room before signaling
            if (!clientId || !clientRoomId) {
              console.warn("Signaling message from client that has not joined a room.");
              return;
            }
            handleSignaling(ws, msg);
            break;

          default:
            console.warn("Unknown message type received:", (msg as any).type);
        }
      } catch (err) {
        console.error("Failed to parse message or handle client request:", err);
      }
    });

    ws.on("close", () => {
      console.log(`WebSocket closed for ${clientId || 'unknown'} in room ${clientRoomId || 'N/A'}.`);
      handleDisconnect(ws, clientRoomId, clientId);
    });

    ws.on("error", (error) => {
      console.error("WebSocket error for client:", error);
      handleDisconnect(ws, clientRoomId, clientId);
    });
  });

  console.log("WebSocket Signaling Server is running.");
}

function handleJoin(ws: WebSocket, msg: JoinMessage) {
  const { room, user, isCaller } = msg;

  if (!rooms[room]) {
    rooms[room] = [];
  }

  const roomClients = rooms[room];

  if (roomClients.length >= 2) {
    console.warn(`Room ${room} is full. User ${user} rejected.`);
    ws.send(JSON.stringify({ type: "room-full", room } as RoomFullMessage));
    ws.close();
    return;
  }

  if (roomClients.some(client => client.userId === user)) {
    console.warn(`User ID ${user} already exists in room ${room}.`);
    ws.send(JSON.stringify({ type: "error", message: "User ID already exists in this room.", room } as ErrorMessage));
    return;
  }

  const newClient: RoomClient = { ws, userId: user, isCaller };
  roomClients.push(newClient);

  console.log(`User ${user} (${isCaller ? 'caller' : 'callee'}) joined room ${room}. Current clients: ${roomClients.length}`);

  // Notify the other client (if any) that a new user has joined
  const otherClient = roomClients.find(client => client.userId !== user);
  if (otherClient) {
    // Notify the existing client about the new client
    const payloadToOther: UserJoinedLeftMessage = {
      type: "user-joined",
      room,
      user: { id: newClient.userId, isCaller: newClient.isCaller }
    };
    if (otherClient.ws.readyState === WebSocket.OPEN) {
      otherClient.ws.send(JSON.stringify(payloadToOther));
      console.log(`Notified existing user ${otherClient.userId} about new user ${newClient.userId}.`);
    } else {
      console.warn(`Existing client ${otherClient.userId} in room ${room} is not open, cannot send user-joined message.`);
    }

    // Also notify the new client about the existing one
    const payloadToNew: UserJoinedLeftMessage = {
      type: "user-joined",
      room,
      user: { id: otherClient.userId, isCaller: otherClient.isCaller }
    };
    if (newClient.ws.readyState === WebSocket.OPEN) {
      newClient.ws.send(JSON.stringify(payloadToNew));
      console.log(`Notified new user ${newClient.userId} about existing user ${otherClient.userId}.`);
    } else {
      console.warn(`New client ${newClient.userId} in room ${room} is not open, cannot send existing user info.`);
    }
  }
}

function handleSignaling(ws: WebSocket, msg: SignalingMessage | IceCandidateMessage) {
  const { room } = msg;
  const roomClients = rooms[room];
  const senderClient = roomClients?.find(client => client.ws === ws);

  if (!roomClients || roomClients.length < 2 || !senderClient) {
    console.warn(`Attempted to signal in room ${room} with insufficient clients or unknown sender.`);
    return;
  }

  // Relay the message to the *other* client in the room
  roomClients.forEach(client => {
    if (client.ws !== ws && client.ws.readyState === WebSocket.OPEN) {
      console.log(`Relaying ${msg.type} from ${senderClient.userId} to ${client.userId} in room ${room}`);
      client.ws.send(JSON.stringify(msg));
    }
  });
}

function handleDisconnect(ws: WebSocket, roomId: string | null, userId: string | null) {
  if (!roomId || !userId || !rooms[roomId]) {
    console.log(`Attempted to disconnect unknown client or from non-existent room. Room: ${roomId}, User: ${userId}`);
    return;
  }

  const roomClients = rooms[roomId];
  const clientIndex = roomClients.findIndex(client => client.ws === ws);

  if (clientIndex !== -1) {
    const [disconnectedClient] = roomClients.splice(clientIndex, 1);
    
    if (disconnectedClient) {
      console.log(`User ${disconnectedClient.userId} left room ${roomId}. Remaining clients: ${roomClients.length}`);

      // If the room is now empty, delete it
      if (roomClients.length === 0) {
        delete rooms[roomId];
        console.log(`Room ${roomId} is now empty and has been deleted.`);
      } else {
        // Notify the remaining client that the other user has left
        const remainingClient = roomClients[0]; // Assuming only one remaining client in a 2-peer room
        
        if (remainingClient && remainingClient.ws.readyState === WebSocket.OPEN) {
          const payload: UserJoinedLeftMessage = {
            type: "user-left",
            room: roomId,
            user: { id: disconnectedClient.userId, isCaller: disconnectedClient.isCaller }
          };
          remainingClient.ws.send(JSON.stringify(payload));
          console.log(`Notified ${remainingClient.userId} that ${disconnectedClient.userId} left room ${roomId}.`);
        } else {
          console.warn(`Remaining client in room ${roomId} is not open, cannot send user-left message.`);
        }
      }
    }
  } else {
    console.warn(`Disconnected WebSocket not found in room ${roomId} for user ${userId}.`);
  }
}

// socket.io 기반 실시간 공부시간 대결 로직
let io;
const participants = new Map(); // userId -> { id, name, elapsed, avatar }

function broadcastParticipants() {
  if (!io) return;
  io.emit("participants:update", Array.from(participants.values()));
}

function setupRealtime(serverIo) {
  io = serverIo;

  io.on("connection", (socket) => {
    console.log("socket connected:", socket.id);

    socket.on("study:start", ({ userId, name }) => {
      participants.set(userId, { id: userId, name, elapsed: 0 });
      broadcastParticipants();
    });

    socket.on("study:update", ({ userId, elapsed }) => {
      const p = participants.get(userId);
      if (p) {
        p.elapsed = elapsed;
        participants.set(userId, p);
        // broadcast frequently but throttle in production
        broadcastParticipants();
      }
    });

    socket.on("study:stop", ({ userId, elapsed }) => {
      const p = participants.get(userId);
      if (p) {
        p.elapsed = elapsed;
        participants.set(userId, p);
      }
      broadcastParticipants();
    });

    socket.on("disconnect", () => {
      // 선택적으로 연결 끊긴 사용자를 목록에서 제거하거나 유지
      console.log("socket disconnected:", socket.id);
    });
  });
}

module.exports = { setupRealtime };

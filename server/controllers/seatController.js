// 자동 반납 엔드포인트 플레이스홀더
exports.autoReturnSeat = async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ success: false, error: "userId required" });
  // 실제 구현: 좌석 상태 변경, 로그 기록 등
  console.log(`Auto-return seat for user ${userId}`);
  return res.json({ success: true, ok: true });
};

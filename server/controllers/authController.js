// 간단 플레이스홀더
exports.login = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "name required" });
  // 실제 구현: 사용자 생성/조회 및 토큰 발급
  return res.json({ id: Date.now().toString(), name });
};

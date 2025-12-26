// 플레이스홀더: 실제 DB 연동 시 모델에서 조회
exports.listBooks = async (req, res) => {
  const sample = [
    { _id: "1", title: "리액트 입문", author: "홍길동" },
    { _id: "2", title: "자바스크립트 고급", author: "김철수" },
  ];
  res.json(sample);
};

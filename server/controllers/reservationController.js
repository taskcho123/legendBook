const Reservation = require("../models/reservation");

exports.createReservation = async (req, res) => {
  const { userId, name, bookId } = req.body;
  if (!userId || !name) return res.status(400).json({ success: false, error: "userId and name required" });

  try {
    const reservation = await Reservation.findOneAndUpdate(
      { userId },
      { userId, name, bookId: bookId || null, isReserved: true, reservedAt: new Date() },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res.json({ success: true, reservation, isReserved: reservation.isReserved });
  } catch (err) {
    console.error("createReservation error", err);
    return res.status(500).json({ success: false, error: "reservation_failed" });
  }
};

exports.cancelReservation = async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ success: false, error: "userId required" });

  try {
    const reservation = await Reservation.findOneAndUpdate(
      { userId },
      { isReserved: false },
      { new: true }
    );
    if (!reservation) return res.status(404).json({ success: false, error: "not_found" });
    return res.json({ success: true, reservation, isReserved: reservation.isReserved });
  } catch (err) {
    console.error("cancelReservation error", err);
    return res.status(500).json({ success: false, error: "cancel_failed" });
  }
};

exports.getReservation = async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ success: false, error: "userId required" });

  try {
    const reservation = await Reservation.findOne({ userId });
    if (!reservation) return res.json({ success: true, isReserved: false });
    return res.json({ success: true, isReserved: !!reservation.isReserved, reservation });
  } catch (err) {
    console.error("getReservation error", err);
    return res.status(500).json({ success: false, error: "lookup_failed" });
  }
};

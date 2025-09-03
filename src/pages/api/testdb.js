import { getConnection } from "../../lib/db";

export default async function handler(req, res) {
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute("SELECT 1 AS test");
    await conn.end();
    res.status(200).json({ success: true, result: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

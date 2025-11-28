export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { password } = req.body;

  // Compare with SECRET env variable on Vercel
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (!correctPassword) {
    return res.status(500).json({
      success: false,
      message: "Server error: ADMIN_PASSWORD is not set",
    });
  }

  if (password === correctPassword) {
    return res.status(200).json({ success: true, message: "Access granted" });
  } else {
    return res.status(401).json({ success: false, message: "Invalid password" });
  }
}

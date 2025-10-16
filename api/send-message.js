// /api/send-message.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { firstName, lastName, email, phone, message } = req.body;

  // 🧠 Get from Vercel Environment Variables (we'll add them in Step 2)
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const composedText = [
    `📩 New Portfolio Message`,
    `👤 Name: ${firstName} ${lastName}`,
    `📧 Email: ${email}`,
    phone ? `📱 Phone: ${phone}` : '',
    '',
    message,
  ].filter(Boolean).join('\n');

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: composedText }),
    });

    if (!response.ok) throw new Error('Telegram API error');

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error sending message:', err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}

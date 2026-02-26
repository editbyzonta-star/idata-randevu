import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const botToken = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;
    const url = "https://idata.com.tr/tr/appointment-form.php";

    const response = await fetch(url);
    const page = await response.text();

    if (!page.includes("Uygun randevu bulunmamaktadır")) {
      const message =
        "‼️ IDATA İZMİR RANDEVU AÇILDI ‼️\nHemen gir: https://idata.com.tr";
      await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`
      );
    }

    res.status(200).json({ checked: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
}

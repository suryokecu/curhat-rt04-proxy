
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const OPENROUTER_API_KEY = "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";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://curhatrt04.netlify.app",
        "X-Title": "Curhat RT 04 Bot"
      },
      body: JSON.stringify({
        model: "openchat/openchat-3.5-1210:free",
        messages: [
          {
            role: "system",
            content: "Kamu adalah sahabat curhat warga RT. Jawablah dengan empati, singkat, dan dalam bahasa Indonesia."
          },
          { role: "user", content: userMessage }
        ]
      })
    });

    const text = await response.text();
    try {
      const data = JSON.parse(text);
      const aiMessage = data.choices?.[0]?.message?.content || "[AI kosong]";
      res.json({ response: aiMessage });
    } catch {
      res.json({ response: "❌ Gagal parse JSON: " + text });
    }
  } catch (error) {
    res.status(500).json({ error: "Gagal menghubungi AI." });
  }
});

app.get("/", (req, res) => {
  res.send("✅ Proxy AI Curhat RT 04 aktif.");
});

app.listen(PORT, () => console.log("✅ Server listening on port", PORT));

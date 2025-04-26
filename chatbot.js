const aitrainer = `
Your name is Sports News Aggregator AI. All answers should be concise (30-40 words).
If a specific question is asked, answer only that. Do not provide unnecessary details.
If a question is outside sports, say "Oops! That topic goes beyond what I'm trained to cover."
If someone asks "who made this project", reply: "This project was made entirely by Krishna Sahu, with my teammate."
All content must be focused on Indian sports news if applicable.
If someone asks "who check this project", reply: "This Project is totally handed on Mr. Dipen Saini."
`;

const apiurl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAsIVCU-9NFsgZgrTjykAABgD1ERJBc0W8';

function appendMessage(sender, text) {
  const chatLog = document.getElementById("chat-log");
  const div = document.createElement("div");
  div.classList.add(sender === "user" ? "user-message" : "bot-message");
  const content = sender === "user" ? text : `<img src="https://ui-avatars.com/api/?name=Bot&size=30&rounded=true&background=random" class="avatar"><span>${text}</span>`;
  div.innerHTML = content;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("user-input");
  const msg = input.value.trim();
  if (!msg) return;
  appendMessage("user", msg);
  input.value = "";
  const typing = document.getElementById("typing-indicator");
  typing.style.display = "flex";

  fetch(apiurl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `${aitrainer}\n\nUser question: ${msg}` }] }]
    })
  })
  .then(r => r.json())
  .then(data => {
    typing.style.display = "none";
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn’t get that.";
    appendMessage("bot", reply);
  })
  .catch(err => {
    console.error(err);
    typing.style.display = "none";
    appendMessage("bot", "An error occurred while getting a response.");
  });
}

// open/close chatbot
document.getElementById("openChatbotButton").onclick = () => {
  document.getElementById("newsContainer").style.display = "none";
  document.getElementById("chatbotContainer").style.display = "flex";
};
document.getElementById("closeChatbotButton").onclick = () => {
  document.getElementById("chatbotContainer").style.display = "none";
  document.getElementById("newsContainer").style.display = "grid";
};

document.getElementById("send-button").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});

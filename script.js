// Toggle chatbot visibility
function toggleChat() {
    const chatbox = document.getElementById("chatbox");
    chatbox.style.display = chatbox.style.display === "none" ? "block" : "none";
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Botpress API endpoint (replace with your actual endpoint)
const BOTPRESS_URL = "https://your-botpress-url/api/v1/bots/<bot-id>/converse/<user-id>";

// Function to send message to Botpress and get a response
async function sendMessage() {
    const userMessage = document.getElementById("userInput").value;
    if (!userMessage) return;

    displayMessage(userMessage, "user");

    try {
        const response = await fetch(BOTPRESS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer YOUR_BOTPRESS_TOKEN`
            },
            body: JSON.stringify({ type: 'text', text: userMessage })
        });

        const botResponse = await response.json();
        const botMessage = botResponse.responses[0].text;
        displayMessage(botMessage, "bot");

    } catch (error) {
        console.error("Error communicating with Botpress:", error);
        displayMessage("Sorry, there was an issue connecting to the bot.", "bot");
    }

    document.getElementById("userInput").value = "";
}

// Display message and auto-scroll
function displayMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = sender === "user" ? "user-message" : "bot-message";
    messageDiv.textContent = message;
    document.getElementById("messages").appendChild(messageDiv);

    const chatbox = document.getElementById("messages");
    chatbox.scrollTop = chatbox.scrollHeight;
}

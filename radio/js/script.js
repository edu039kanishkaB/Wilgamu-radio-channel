// Firebase Configuration (Replace with your Firebase project details)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref("messages");

// Chat Elements
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendButton = document.getElementById("sendButton");

// Send Message
sendButton.addEventListener("click", () => {
    const message = chatInput.value.trim();
    if (message) {
        db.push({
            user: "Anonymous", // Replace with user authentication if needed
            text: message,
            timestamp: Date.now()
        });
        chatInput.value = "";
    }
});

// Listen for New Messages
db.on("child_added", (snapshot) => {
    const data = snapshot.val();
    const messageElement = document.createElement("div");
    const time = new Date(data.timestamp).toLocaleTimeString();
    messageElement.textContent = `[${time}] ${data.user}: ${data.text}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll
});

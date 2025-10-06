const socket = io("http://localhost:8000");



const messageInp = document.getElementById("input-field");
const container = document.querySelector(".chat-box");
const sendForm = document.getElementById("input-area");
const sendBtn = document.getElementById("SendButton");
var audio = new Audio("notification_tone.mp3");

const append = (message, position) => {
    const message_ele = document.createElement("div");
    message_ele.innerText = message;
    message_ele.classList.add("message");
    message_ele.classList.add(position);
    container.append(message_ele);
    if(position=="left")
    {
        audio.load(); 
        audio.play();
    }
}

const name1 = prompt("Enter your name:");
socket.emit("newuser-joined", name1);

socket.on("user-joined", name1 => {
    append(`${name1} has joined the chat`, "left");
});

sendBtn.addEventListener("click", (e) => {
    e.preventDefault(); // ✅ prevents page from reloading
    const message = messageInp.value;
        append(`you: ${message}`, "right");
        socket.emit("send", message);
        messageInp.value = ""; // ✅ this will now work
    }
);


socket.on("receive", data => {
    append(`${data.name}: ${data.message}`, "left");
});

socket.on("left", data => {
    append(`${data.name} left the chat`, "left");
});


const form = document.getElementById("contactForm");
const messagesList = document.getElementById("messages-list");

document.addEventListener("DOMContentLoaded", loadMessages);

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  await addMessage();
});

async function addMessage() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const newMessage = { id: Date.now(), name, email, message };

  await saveMessage(newMessage);

  alert(`Thank you for contacting me, ${name}! I will get back to you soon.`);
  form.reset();
  loadMessages();
}

async function saveMessage(newMessage) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const messages = getMessagesSync();
      messages.push(newMessage);
      localStorage.setItem("messages", JSON.stringify(messages));
      resolve();
    }, 500); 
  });
}

function getMessagesSync() {
  return JSON.parse(localStorage.getItem("messages")) || [];
}

async function getMessages() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const messages = getMessagesSync();
      resolve(messages);
    }, 500);
  });
}

async function loadMessages() {
  messagesList.innerHTML = "";
  const messages = await getMessages();

  messages.forEach((msg) => {
    const messageElement = document.createElement("div");
    messageElement.className = "testimonial cute-message";
    messageElement.innerHTML = `
      <div>
        <div class="hearts">&#10084;&#10084;&#10084;&#10084;&#10084;&#10084;&#10084;&#10084;&#10084;&#10084;</div>
        <p><strong>${msg.name}</strong></p>
        <p>${msg.message}</p>
      </div>
    `;
    messagesList.appendChild(messageElement);
  });
}

function editMessage(id) {
  const messages = getMessagesSync();
  const message = messages.find((msg) => msg.id === id);
  if (message) {
    document.getElementById("name").value = message.name;
    document.getElementById("email").value = message.email;
    document.getElementById("message").value = message.message;

    deleteMessage(id);
  }
}

function deleteMessage(id) {
  let messages = getMessagesSync();
  messages = messages.filter((msg) => msg.id !== id);
  localStorage.setItem("messages", JSON.stringify(messages));
  loadMessages();
}

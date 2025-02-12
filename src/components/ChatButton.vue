<template>
    <div>
      <!-- Nút chat -->
      <button @click="toggleChat" class="chat-button" style="background: #22c55e; box-shadow: rgba(0, 77, 255, 0.5) 0px 4px 24px;">
  <img src="../components/svg/chat.svg" width="20" alt="">
</button>
  
      <!-- Cửa sổ chat -->
      <div v-if="isChatOpen" class="chat-window">
        <div class="chat-header">
          <span>Chat With Us</span>
          <button @click="toggleChat"><img src="../components/svg/close.svg" style="color: white" width="20" alt=""></button>
        </div>
        <div class="chat-body" ref="chatBody">
          <!-- Hiển thị các tin nhắn chat ở đây -->
          <div v-for="message in messages" :key="message.id" class="message" :class="{'user-message': message.isUser, 'bot-message': !message.isUser}">
            <span>{{ message.text }}</span>
          </div>
        </div>
        <div class="chat-footer">
          <input v-model="newMessage" placeholder="Enter new message..."  @keydown.enter="sendMessage" />
          <button @click="sendMessage">Send</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        isChatOpen: false,
        newMessage: '',
        messages: []
      };
    },
    methods: {
      toggleChat() {
        this.isChatOpen = !this.isChatOpen;
      },
      async sendMessage() {
        if (this.newMessage.trim()) {
          // Add user message to the chat
          const userMessage = { id: Date.now(), text: this.newMessage, isUser: true };
          this.messages.push(userMessage);
  
          try {
            const message = this.newMessage;    
            console.log(message);
            
            const data = new FormData();
            data.append("user_input", message);
  
            // Send POST request to the server with the user's message
            const response = await axios.post('http://127.0.0.1:5000/chat', data, {
              headers: { 'content-type': 'application/x-www-form-urlencoded' }
            });
  
            // Add bot's response to the chat
            const botResponse = { id: Date.now(), text: response.data, isUser: false };
            this.messages.push(botResponse);

            this.$nextTick(() => {
            const chatBody = this.$refs.chatBody;
            chatBody.scrollTop = chatBody.scrollHeight;
          });
          } catch (error) {
            console.error('Lỗi khi gửi tin nhắn:', error);
          }
  
          // Clear the input field after sending the message
          this.newMessage = '';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .chat-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px;
    background-color: #22c55e;
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 16px;
    cursor: pointer;
  }
  
  .chat-window {
    position: fixed;
    z-index: 9999;
    bottom: 70px;
    right: 20px;
    width: 300px;
    height: 400px;
    background-color: white;
    border: 1px solid #ddd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
  }
  
  .chat-header {
    padding: 10px;
    background-color: #22c55e;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .chat-body {
    flex-grow: 1;
    padding: 10px;
    overflow-y: auto;
  }
  
  .chat-footer {
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
  
  .message {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 20px; /* Rounded corners */
    max-width: 80%;
    word-wrap: break-word;
    display: inline-block;
    clear: both; /* Ensures messages are aligned correctly */
  }
  
  .message span {
    display: block;
  }
  
  .user-message {
    background-color: #22c55e; /* Green background for user messages */
    color: white;
    border: 2px solid #22c55e; /* Border for user message */
    padding: 8px 15px;
    float: right; /* Align user messages to the right */
    margin-left: 10px; /* Optional: Adds a small gap to the left of the user message */
  }
  
  .bot-message {
    background-color: #f1f1f1; /* Light gray background for bot messages */
    color: black;
    border: 2px solid #ddd; /* Border for bot message */
    padding: 8px 15px;
    float: left; /* Align bot messages to the left */
    margin-right: 10px; /* Optional: Adds a small gap to the right of the bot message */
  }
  
  input {
    width: 80%;
    padding: 5px;
  }
  
  button {
    padding: 5px 10px;
    background-color: #22c55e;
    color: white;
    border: none;
    cursor: pointer;
  }
  </style>
  
  
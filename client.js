const socket = io('http://localhost:3000')
const msgContainer = document.getElementById('message-container')
const msgForm = document.getElementById('send-button')
const msgInput = document.getElementById('message-input')
const roomInput = document.getElementById('room-input')
const joinRoom = document.getElementById('room-button');

socket.on('connect', ()=>{
  addMessage(`UserID: ${socket.id}`)
})

socket.on('receive_message', message => {
  addMessage(message)
})


msgForm.addEventListener('click', e => {
  e.preventDefault()
  const message = msgInput.value;
  console.log(message)
  const room = roomInput.value;

  if(message === "") return
  socket.emit('send_message', message, room);
  addMessage(`You: ${message}`)
  msgInput.value = ''

  // send get_history command to get client's history
  socket.emit('get_history','');

})

joinRoom.addEventListener('click', ()=>{
  const room = roomInput.value;
  socket.emit('join_room', room, message => {
    addMessage(message);
  });
})

function addMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.setAttribute("style", "margin-top: 10px")
  messageElement.setAttribute("class", "bg-success")
  messageElement.innerHTML = message
  msgContainer.append(messageElement)
}
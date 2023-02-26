import { format } from 'date-fns';
import{ ELEMENTS } from './consts'
import Cookies from 'js-cookie';


export function sendingMessage(name, newMessage, mail, time) {
  
    const message = ELEMENTS.templateMessage.content.querySelector('.messageNew');
    const timeMessage = ELEMENTS.templateMessage.content.querySelector('.timeMessageNew');
    message.textContent = name + `: ` + newMessage;
    timeMessage.textContent = format(new Date(time), 'HH:mm');
  
    let cloneRight = document.createElement('div');
    cloneRight.classList.add('messageSending');
  
    let cloneLeft = document.createElement('div');
    cloneLeft.classList.add('messageDelivered');
  
    cloneRight.append(ELEMENTS.templateMessage.content.cloneNode(true));
    cloneLeft.append(ELEMENTS.templateMessage.content.cloneNode(true));
  
    if (mail === Cookies.get('mail')) {
      if (newMessage.length === 0) {
        alert('введите сообщение');
      } else {
        ELEMENTS.chatSpace.append(cloneRight);
      }
    } else {
      ELEMENTS.chatSpace.append(cloneLeft);
    }
  
    ELEMENTS.messageInput.value = '';
  }
  

export function messageSplice() {
    array = JSON.parse(localStorage.getItem('message'));
    const futureArray = array.splice(0, 20);
    localStorage.setItem('message', JSON.stringify(array));
    futureArray.forEach((info) =>
      sendingMessage(info.user.name, info.text, info.user.email, info.createdAt)
    );
  }

  export function checkName(cookie) {
    if (cookie != null || undefined || '') {
      ELEMENTS.buttonEntry.remove();
      ELEMENTS.topSettings.append(ELEMENTS.buttonExit);
    } else {
      ELEMENTS.buttonExit.remove();
      ELEMENTS.topSettings.append(ELEMENTS.buttonEntry);
    }
  }



  export function entrySmile(e) {
    smile = e.currentTarget;
    ELEMENTS.messageInput.value = ELEMENTS.messageInput.value + smile.textContent;
  }
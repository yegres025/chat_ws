import Cookies from 'js-cookie';
import { messageStories, settingName, gettingNameInfo, gettingCode, sendindMessageWebSocket } from './async'
import { sendingMessage, messageSplice, checkName, entrySmile } from './render'
import {ELEMENTS, socket} from './consts'


ELEMENTS.chatSpace.addEventListener('scroll', () => {
  if (ELEMENTS.chatSpace.scrollHeight - -ELEMENTS.chatSpace.scrollTop < 450) {
    messageSplice();
  }
});

ELEMENTS.formMail.addEventListener('submit', (e) => {
  e.preventDefault();
  Cookies.set('mail', ELEMENTS.mailInput.value);
});

ELEMENTS.formInput.addEventListener('submit', (e) => {
  e.preventDefault();
  sendindMessageWebSocket(ELEMENTS.messageInput);
});

ELEMENTS.formMail.addEventListener('submit', gettingCode);

ELEMENTS.formNamePopup.addEventListener('submit', () =>
  settingName(ELEMENTS.inputNamePopup.value)
);

ELEMENTS.formNamePopup.addEventListener('submit', () => {
  if (Cookies.get('token') == null || undefined) {
    alert('Пройдите авторизацию');
  } else {
    Cookies.set('name', ELEMENTS.inputNamePopup.value);
    gettingNameInfo(ELEMENTS.token);
  }
});


ELEMENTS.buttonExit.addEventListener('click', () => {
  Cookies.remove('token');
  Cookies.remove('name');
  Cookies.remove('mail');
  ELEMENTS.chatSpace.textContent = '';
  checkName(Cookies.get('name'));
});

document.addEventListener('DOMContentLoaded', () =>
  checkName(Cookies.get('name'))
);

document.addEventListener('DOMContentLoaded', () => messageStories());

ELEMENTS.formEntryPopup.addEventListener('submit', (e) => {
  e.preventDefault();
  Cookies.set('token', ELEMENTS.inputCodePopup.value);
});

ELEMENTS.messageInput.addEventListener('mousemove', () =>
  checkName(Cookies.get('name'))
);


ELEMENTS.smiles.forEach((smile) => {
 smile.addEventListener('click', entrySmile);
});


socket.onmessage = function (event) {
  let webSocket = JSON.parse(event.data);
  sendingMessage(
    webSocket.user.name,
    webSocket.text,
    webSocket.user.email,
    webSocket.createdAt
  );
};

import Cookies from 'js-cookie';

export const ELEMENTS = {
    topSettings: document.querySelector('.setting'),
    buttonEntry: document.querySelector('.buttonEntry'),
    buttonExit: document.querySelector('.buttonExit'),
    formInput: document.querySelector('.messageSpace'),
    messageInput: document.querySelector('.inputForDelivered'),
    chatSpace: document.querySelector('.chatSpace'),
    templateMessage: document.querySelector('.template'),
    formMail: document.querySelector('.formMailPopup'),
    mailInput: document.querySelector('.inputMailPopup'),
    inputNamePopup: document.querySelector('.inputNamePopup'),
    inputCodePopup: document.querySelector('.inputCodePopup'),
    formEntryPopup: document.querySelector('.formEntryPopup'),
    formNamePopup: document.querySelector('.nameSpacePopup'),
    smiles: document.querySelectorAll('.smile'),
    templateMessage: document.querySelector('.template'),
    errorMessage: document.querySelector('.entryMessage'),
    token: Cookies.get('token'),
    stradaURL: 'https://edu.strada.one/api/user',
    stradaURLinfo: `https://edu.strada.one/api/user/me`,
    stradaURLmessage: 'https://edu.strada.one/api/messages/ ',
  };

  export const socket = new WebSocket(`wss://edu.strada.one/websockets?${ELEMENTS.token}`)
  
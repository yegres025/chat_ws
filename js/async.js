import Cookies from 'js-cookie';
import { ELEMENTS, socket } from './consts';
import {messageSplice} from './render'


export async function messageStories() {
  try {
    let result = await fetch(ELEMENTS.stradaURLmessage, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf=8',
        Authorization: `Bearer ${ELEMENTS.token}`,
      },
    });
    let info = await result.json();
    localStorage.setItem('message', JSON.stringify(info.messages));
    if (result.ok) {
      console.log(info);
      messageSplice();
    } else {
      console.log('error');
    }
  } catch {
    console.log('err');
  }
}



export async function settingName(name, token = Cookies.get('token')) {
  try {
    let result = await fetch(ELEMENTS.stradaURL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${ELEMENTS.token}`,
      },
      body: JSON.stringify({ name: name }),
    });
    if (result.ok) {
      return await result.json();
    } else {
      console.log('err');
    }
  } catch {
    console.log('fatch failed');
  }
}



export async function gettingNameInfo(token) {
  try {
    let result = await fetch(ELEMENTS.stradaURLinfo, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${ELEMENTS.token}`,
      },
    });
    if (result.ok) {
      console.log(result.json());
    } else console.log('err');
  } catch {
    console.log('fatch failed');
  }
}

export async function gettingCode() {
  let user = {
    email: ELEMENTS.mailInput.value,
  };
  let result;
  try {
    result = await fetch(ELEMENTS.stradaURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${ELEMENTS.token}`,
      },
      body: JSON.stringify(user),
    });
    if (result.ok) {
      console.log(result.json());
    } else {
      alert('Error');
    }
  } catch {
    console.log('request failed');
  }
}


export function sendindMessageWebSocket(message) {
    if (message.value === '')
      return (
        ELEMENTS.errorMessage.classList.add('entryMessageShow'),
        setTimeout(() => ELEMENTS.errorMessage.classList.remove('entryMessageShow'), 3000)
      );
  
    socket.send(JSON.stringify({ text: message.value }));
  }
  
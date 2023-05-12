const serverUrl = 'http://localhost:8888';

async function authenticatedGet(url) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();
    return json;
  } catch (error) {
    console.error(`error inside authenticatedGet call to ${url}: `, error);
  }
}

async function authenticatedPost(url, body) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(body),
    });
    return res;
  } catch (error) {
    console.error(`error inside authenticatedPost call to ${url}: `, error);
  }
}

async function post(url, body) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`error inside unauthenticated post call to ${url}: `, error);
  }
}

export async function registerUser({ email, password }) {
  try {
    const data = await post(`${serverUrl}/public/register`, { email, password });
    if (data.token) {
      localStorage.setItem('token', data.token);
      return data;
    }
    if (data.message) {
      alert(data.message);
    }
    return null;
  } catch (error) {
    console.error('error inside registerUser: ', error);
  }
  return null;
}

export async function loginUser({ email, password }) {
  try {
    const data = await post(`${serverUrl}/public/login`, { email, password });
    if (data.token) {
      localStorage.setItem('token', data.token);
      return data;
    }
    if (data.message) {
      alert(data.message);
    }
    return null;
  } catch (error) {
    console.error('error inside loginUser: ', error);
  }
  return null;
}

export function pingServer() {
  return authenticatedGet(`${serverUrl}/ping`);
}

export function getAllPets() {
  const res = authenticatedGet(`${serverUrl}/protected/all-pets`);
  return res;
}

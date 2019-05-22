import fetch from 'isomorphic-fetch';

function processResponse(response) {
  const statusCode = response.status;
  const data = response.json();
  return Promise.all([statusCode, data]).then(res => ({
    statusCode: res[0],
    body: res[1],
  }));
}


function makeAsyncCall(options) {
  return fetch(options.url, {
    method: options.method,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
    },
    body: options.body,
  })
    .then(processResponse);
}

export { makeAsyncCall };
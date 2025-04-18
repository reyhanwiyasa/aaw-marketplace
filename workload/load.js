import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 100,         // like -c 100
  duration: '10m',  // like -z 10m
};

export default function () {
  const url = 'http://54.147.175.117:30000/api/auth/v1/login';
  const payload = JSON.stringify({
    email: 'test@example.com',
    password: 'password123'
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
  sleep(1);
}

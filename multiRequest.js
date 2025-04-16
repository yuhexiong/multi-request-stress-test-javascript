const axios = require('axios');
const { performance } = require('perf_hooks');

const API_URL = ''; 
const NUM_REQUESTS = 10;

const TOKEN = '';
const headers = {
  'Authorization': `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
};
const body = {};

async function sendRequest(requestIndex) {
  const start = performance.now();

  try {
    const response = await axios.post(API_URL, body, { headers });

    const end = performance.now();
    console.log(`Request ${requestIndex} - Response time: ${(end - start).toFixed(2)} ms`);

    // 若 response 裡面有 timestamp，可印出來：
    if (response.data && response.data.timestamp) {
      console.log(`Request ${requestIndex} - API Response Timestamp: ${response.data.timestamp}`);
    }

    return response.data;
  } catch (error) {
    console.error(`Request ${requestIndex} - Error:`, error.message);
  }
}

async function testConcurrentRequests() {
  console.time('Total Time');

  const tasks = [];
  for (let i = 0; i < NUM_REQUESTS; i++) {
    tasks.push(sendRequest(i + 1));
  }

  await Promise.all(tasks);

  console.timeEnd('Total Time');
}

testConcurrentRequests();

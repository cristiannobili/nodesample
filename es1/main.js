import fetch from 'node-fetch';

fetch("https://www.google.com").then(data => data.text()).then(console.log);
import fetch from 'node-fetch'; // ESM Module 
import { createRequire } from "module";
const require = createRequire(import.meta.url); //CommonJS
const fs = require('fs');
const readline = require('readline');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0; // bypassa la verifica del certificato TLS

const conf = JSON.parse(fs.readFileSync('conf.json'));
const token = conf.token;
const baseUrl = "https://ws.progettimolinari.it";
const urlSet = baseUrl + "/cache/set";

const readText = (question) => {
   return new Promise((resolve) => {
      const read = readline.createInterface({
         input: process.stdin,
         output: process.stdout
      });
      read.question(question, text => {
         read.close();
         resolve(text);
      });
   });
}

const saveData = (key, value) => {
   return new Promise((resolve, reject) => {
      fetch(urlSet, {
         headers: {
            'Content-Type': 'application/json',
            'key': token
         },
         method: "POST",
         body: JSON.stringify({
            key: key,
            value: value
         })
      }).then(r => r.json())
         .then(resolve)
         .catch(reject)
      })
   }

readText("Inserisci la chiave: ").then((response) => {
   const key = response;
   readText("Inserisci il valore: ").then((response) => {
      const value = response;
      saveData(key, value).then(console.log);      
   })
});




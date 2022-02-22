/*
 *
 *  Push Notifications codelab
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

/* eslint-env browser, es6 */
/*
https://developers.google.com/web/fundamentals/codelabs/push-notifications#%E7%8D%B2%E5%8F%96%E6%87%89%E7%94%A8%E6%9C%8D%E5%8B%99%E5%99%A8%E5%AF%86%E9%91%B0
鑰匙
https://web-push-codelab.glitch.me/
*/

'use strict';
const applicationServerPublicKey = 'your key';

const pushButton = document.querySelector('.js-push-btn');

let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// 註冊 serviceWorker
if('serviceWorker' in navigator && 'PushManager' in window){
  console.log('Service Worker and Push is supported');
  navigator.serviceWorker.register('sw.js')
  .then(
    (swReg) => {
      console.log('Service Worker is registered', swReg);

      swRegistration = swReg
    }
  )
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}

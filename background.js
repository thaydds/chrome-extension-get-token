// background.js

let color = '#3aa757';

chrome.runtime.onInstalled.addListener(async () => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
  console.log('storage',  chrome.desktopCapture);
  console.log('dev',  chrome);
  chrome.storage.sync.get('color', function(result) {
    console.log('sync', result)
  });
  chrome.storage.local.get(['myCat'], function(result) {
    console.log('local', result)
  });
});


// Reads all data out of storage.sync and exposes it via a promise.
//
// Note: Once the Storage API gains promise support, this function
// can be greatly simplified.



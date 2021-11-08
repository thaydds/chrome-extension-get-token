// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
    // chrome.devtools.network.getHAR(
    //     function (harLog) {
    
    //       har_string = JSON.stringify(harLog);
    //       ptrn = /(?<=\"Bearer )(.*?)(?=\")/
    
    //       var results = har_string.match(ptrn);
    
    //       alert(results[0]);
    //     }
    //   );
    // var myStoredValue = localStorage["redux"];

    // let log = chrome.devtools.network.getHAR()
    // alert(JSON.stringify(log))

    // chrome.storage.sync.get(['redux'], function(result) {
    //   alert(JSON.stringify(result));
    // });

    let [tab1] = await chrome.tabs.query({ active: true, currentWindow: true });
    

    chrome.scripting.executeScript({
      target: { tabId: tab1.id },
      function: setPageBackgroundColor,
    });
  });
  
  // The body of this function will be executed as a content script inside the
  // current page
  function setPageBackgroundColor() {

    const cat = JSON.parse(window.localStorage.getItem('redux'));
    const el = document.createElement('textarea')
    el.value = cat.authentication.token
    document.body.appendChild(el)
    el.select();
    document.execCommand('copy')
    document.removeChild(el)

    chrome.storage.sync.get("color", ({ color }) => {
      document.body.style.backgroundColor = color;
    
    });
  }


  
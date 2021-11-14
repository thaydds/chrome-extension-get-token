chrome.runtime.onInstalled.addListener(async () => {
  console.log('dev',  chrome);
  chrome.storage.sync.set({token: ''});
});


chrome.webRequest.onBeforeSendHeaders.addListener(
	async function (details) {
      for (var i = 0; i < details.requestHeaders.length; ++i) {
        if (details.requestHeaders[i].name === "Authorization") {
          const token = details.requestHeaders[i].value;
          chrome.storage.sync.set({token}, function() {
            console.log('Value is set to ', token);
          });
        }
      }
      return { requestHeaders: details.requestHeaders };
	},
	{ urls: ["*://fleet-api.ifood-devel.com.br/api/*"] },
	["requestHeaders"]
);

chrome.storage.onChanged.addListener(addBadge)

async function addBadge(){
  const {token} = await chrome.storage.sync.get("token")
  if(token){
    chrome.action.setBadgeText({ text: '1' });
  }
}




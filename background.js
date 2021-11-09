// background.js

let color = "#3aa757";

chrome.runtime.onInstalled.addListener(async () => {
	chrome.storage.sync.set({ color });
	console.log("Default background color set to %cgreen", `color: ${color}`);
	console.log("storage", chrome.desktopCapture);
	console.log("dev", chrome);
	chrome.storage.sync.get("color", function (result) {
		console.log("sync", result);
	});
	chrome.storage.local.get(["myCat"], function (result) {
		console.log("local", result);
	});
});

chrome.webRequest.onBeforeSendHeaders.addListener(
	async function (details) {
		for (var i = 0; i < details.requestHeaders.length; ++i) {
			if (details.requestHeaders[i].name === "Authorization") {
				const token = details.requestHeaders[i].value;
				chrome.tabs.query(
					{ currentWindow: true, active: true },
					(tabs) => {
						var activeTab = tabs[0];
						chrome.scripting.executeScript({
							target: { tabId: activeTab.id },
							func: copyTokenToClipboard,
							args: [token],
						});
					}
				);
			}
		}
		return { requestHeaders: details.requestHeaders };
	},
	{ urls: ["<all_urls>"] },
	["requestHeaders"]
);


function copyTokenToClipboard(token) {
    const el = document.createElement("textarea");
    el.value = token;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
}

// Reads all data out of storage.sync and exposes it via a promise.
//
// Note: Once the Storage API gains promise support, this function
// can be greatly simplified.

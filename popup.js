function copyTokenToClipboard(token) {
    const el = document.createElement("textarea");
    el.value = token;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
}

changeColor.addEventListener("click", async () => {
  console.log('chrome', chrome)
    chrome.storage.sync.get("token", ({ token }) => {
      copyTokenToClipboard(token)
    });
});



  
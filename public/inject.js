chrome.runtime.onMessage.addListener(
  // this is the message listener
  function (request, sender, sendResponse) {
    if (request.message === "getPage") {
      var text = document.body.innerText;
      console.log(text, request, sender);
      sendResponse(text);
    }
  }
);

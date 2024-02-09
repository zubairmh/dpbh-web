let brw = null;
if (typeof chrome !== "undefined" && chrome.runtime) {
  brw = chrome;
} else if (typeof browser !== "undefined" && browser.runtime) {
  brw = browser;
}
var urls = [];

function logURL(requestDetails) {
  if (requestDetails.method == "POST") {
    console.log(`Loading: ${requestDetails.url}`);
    console.log("Body: ", requestDetails.requestBody);
    try {
      var postedString = decodeURIComponent(
        String.fromCharCode.apply(
          null,
          new Uint8Array(requestDetails.requestBody.raw[0].bytes)
        )
      );

      console.log("Parsed: ", postedString);
      urls.push([requestDetails.url, postedString]);
    } catch (error) {}
  }
}

brw.webRequest.onBeforeRequest.addListener(
  logURL,
  {
    urls: ["<all_urls>"],
  },
  ["requestBody"]
);

brw.runtime.onMessage.addListener(
  // this is the message listener
  function (request, sender, sendResponse) {
    if (request.message === "getData") {
      sendResponse("abcd");
      //   sendResponse(JSON.stringify(urls))
    }
  }
);

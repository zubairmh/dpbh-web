let brw = chrome;
// if (typeof chrome !== "undefined" && chrome.runtime) {
//   brw = chrome;
// } else
if (typeof browser !== "undefined" && browser.runtime) {
  brw = browser;
}
var urls = [];

function logURL(requestDetails) {
  if (requestDetails.method == "POST") {
    // let f = new URL(requestDetails.url);
    // console.log(`Loading: `, f);
    // console.log("Body: ", requestDetails.requestBody);

    // try {
    //   var postedString = decodeURIComponent(
    //     String.fromCharCode.apply(
    //       null,
    //       new Uint8Array(requestDetails.requestBody.raw[0].bytes)
    //     )
    // );

    // console.log("Parsed: ", postedString);
    urls.push(requestDetails.url);
    // } catch (error) {}
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
      console.log("+===========we got the request for data ================+");

      brw.webRequest.onBeforeRequest.removeListener(logURL);
      sendResponse(urls);
    }
  }
);

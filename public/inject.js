chrome.runtime.onMessage.addListener(
  // this is the message listener
  function (request, sender, sendResponse) {
    if (request.message === "getPage") {
      var text = document.body.innerText;
      console.log("getPage",text, request, sender);
      sendResponse(text);
    }
    if (request.message === "favicon") {
      const faviconElement = document.querySelector("link[rel*='icon']");
      const faviconUrl = faviconElement ? faviconElement.href : null;
      console.log("favicon", faviconUrl)
      sendResponse(faviconUrl);
    }

    if (request.message === "title") {
      console.log("title", window.location.hostname)
      sendResponse(window.location.hostname);
    }

    if (request.message==="image") {
      const images=document.querySelectorAll("img")
      const links=[];
      images.forEach((img)=> {
        console.log(img.src)
        links.push(img.src)
      })
      console.log("images", links)
      sendResponse(links)
    }
  }
);

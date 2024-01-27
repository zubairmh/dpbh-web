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
      images.forEach((img, i)=> {
        if(img.src!="" && img.width>200 && img.height>200 && (img.width/img.height)>2) {
          const overlay = document.createElement('div');
          overlay.classList.add('dark-pattern-overlay');
  
          // Apply a yellow filter to the image
          img.style.filter = 'blur(10px)';
  
          // Add a text label in the middle of the image
          overlay.innerText = `Analyzing Image`;
          overlay.style.position = 'absolute';
          overlay.style.top = '50%';
          overlay.style.left = '50%';
          overlay.style.transform = 'translate(-50%, -50%)';
          overlay.style.color = 'yellow';
          overlay.style.fontWeight = 'bold';
          overlay.style.textShadow = '2px 2px 2px #000';
  
          // Append the overlay to the image's parent
          img.parentElement.appendChild(overlay);

          setTimeout(()=>{
            img.style.filter='';
            img.parentElement.removeChild(overlay);
          }, 2000+i*50)

          console.log(img)
          console.log(img.src)
          links.push(img.src)
        }
      })
      console.log("images", links)
      sendResponse(links)
    }
  }
);

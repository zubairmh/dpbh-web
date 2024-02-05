var all = {};
var gfg = [];
chrome.runtime.onMessage.addListener(
  // this is the message listener
  function (request, sender, sendResponse) {
    text = [];
    function recurse(i) {
      if (!(i.tagName === "SCRIPT" || i.tagName === "STYLE")) {
        if (i.childElementCount == 0) {
          if (i.innerText != "" && i.innerText != null) {
            gfg.push(i);
            var cleanedText = i.innerText.trim().replace("\n", "");
            text.push(cleanedText);
          }
        }
        for (j of i.childNodes) {
          recurse(j);
        }
      }
    }

    if (request.message === "getPage") {
      recurse(document.body);
      // var text = document.body.innerText;
      console.log("getPage", text, gfg);
      sendResponse([text, gfg]);
    }

    if (request.message === "show") {
      let ls = document.getElementsByName("WebGuard_" + request.i);
      for (let gh of ls) {
        gh.style.border = "1px solid red";
      }
      sendResponse([text, gfg]);
    }

    if (request.message === "hide") {
      let ls = document.getElementsByName("WebGuard_" + request.i);
      console.log("trying to hide ", ls);

      for (let gh of ls) {
        gh.style.border = "none";
      }
      sendResponse([text, gfg]);
    }

    if (request.message === "draw") {
      for (let gh of request.index) {
        //   request.ah[gh].addEventListener("mouseenter", () => {
        //     console.log(`Hovering over : ${request.bh[gh]}`);
        //   });
        console.log("drawing", gfg);
        let i = gfg[gh];
        wrapperDiv = document.createElement("div");
        wrapperDiv.setAttribute("name", "WebGuard_" + String(request.i));
        wrapperDiv.style.border = "1px solid red";
        i.parentNode.insertBefore(wrapperDiv, i);
        wrapperDiv.appendChild(i);
        // .style.color = "red";
      }
    }

    if (request.message === "favicon") {
      const faviconElement = document.querySelector("link[rel*='icon']");
      const faviconUrl = faviconElement ? faviconElement.href : null;
      console.log("favicon", faviconUrl);
      sendResponse(faviconUrl);
    }

    if (request.message === "title") {
      console.log("title", window.location.hostname);
      sendResponse(window.location.hostname);
    }

    if (request.message === "disable") {
      all[request.link]["img"].style.filter = "";
      all[request.link]["img"].parentElement.removeChild(
        all[request.link]["overlay"]
      );

      const overlay = document.createElement("div");
      overlay.classList.add("dark-pattern-overlay");

      // Apply a yellow filter to the image
      if (request.pattern_type == "Not Dark Pattern") {
        all[request.link]["img"].style.filter = "contrast(200%) blur(10px)";
        overlay.style.color = "green";
      } else {
        all[request.link]["img"].style.filter = "grayscale(80%) blur(10px)";
        overlay.style.color = "red";
      }

      // Add a text label in the middle of the image
      overlay.innerText = request.pattern_type;
      overlay.style.fontSize = "20px";
      overlay.style.position = "absolute";
      overlay.style.top = "50%";
      overlay.style.left = "50%";
      overlay.style.transform = "translate(-50%, -50%)";

      overlay.style.fontWeight = "bold";
      overlay.style.textShadow = "2px 2px 2px #000";

      // Append the overlay to the image's parent
      all[request.link]["img"].parentElement.appendChild(overlay);

      setTimeout(() => {
        all[request.link]["img"].style.filter = "";
        all[request.link]["img"].parentElement.removeChild(overlay);
      }, 5000);
      sendResponse("OK");
    }

    if (request.message === "image") {
      const images = document.querySelectorAll("img");
      const links = [];
      images.forEach((img, i) => {
        if (img.src != "" && img.width / img.height > 2) {
          const overlay = document.createElement("div");
          overlay.classList.add("dark-pattern-overlay");

          // Apply a yellow filter to the image
          img.style.filter = "blur(10px)";

          // Add a text label in the middle of the image
          overlay.style.fontSize = "20px";
          overlay.innerText = `Analyzing Image`;
          overlay.style.position = "absolute";
          overlay.style.top = "50%";
          overlay.style.left = "50%";
          overlay.style.transform = "translate(-50%, -50%)";
          overlay.style.color = "yellow";
          overlay.style.fontWeight = "bold";
          overlay.style.textShadow = "2px 2px 2px #000";

          // Append the overlay to the image's parent
          img.parentElement.appendChild(overlay);

          all[img.src] = {
            img: img,
            overlay: overlay,
          };
          // setTimeout(()=>{
          //   img.style.filter='';
          //   img.parentElement.removeChild(overlay);
          // }, 2000+i*50)

          console.log(img);
          console.log(img.src);
          links.push(img.src);
        }
      });
      console.log("images", links);
      sendResponse(links);
    }

    /*
    params: request.message = "uncheck"
    Description: basically unchecks all the checkboxes on the page when the extension is clicked
    to-do: automatically uncheck the checkboxes
    */
    if (request.message === "uncheck") {
      var checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(function (checkbox) {
        if (checkbox.defaultChecked === true) {
          checkbox.click();
        }
      });
    }
  }
);

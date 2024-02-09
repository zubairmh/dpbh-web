var all = {};
var gfg = [];
let brw = chrome;
if (typeof browser !== "undefined" && browser.runtime) {
  brw = browser;
}
function rmPriceTags(inputString) {
  var words = inputString.split(" ");
  var filteredWords = words.filter(function (word) {
    return word.indexOf("$") === -1;
  });

  var resultString = filteredWords.join(" ");
  return resultString;
}

brw.runtime.onMessage.addListener(
  // this is the message listener
  function (request, sender, sendResponse) {
    text = [];
    function recurse(i) {
      if (!(i.tagName === "SCRIPT" || i.tagName === "STYLE")) {
        if (i.childElementCount == 0) {
          if (i.innerText != "" && i.innerText != null) {
            var cleanedText = i.innerText.trim().replace("\n", "");
            cleanedText = rmPriceTags(cleanedText);
            if (cleanedText.length >= 6) {
              gfg.push(i);
              text.push(cleanedText);
            }
          }
        }
        for (j of i.childNodes) {
          recurse(j);
        }
      }
    }
    function handleElementSelection(event) {
      document.getElementById("customhover").remove();
      document.body.removeEventListener("click", handleElementSelection, true);
      event.preventDefault();
      event.stopPropagation();

      var tagName = event.target.tagName;
      var classNames = Array.from(event.target.classList);
      var attributes = Array.from(event.target.attributes);

      let obj = {
        // tagName: tagName,
        // classNames: classNames,
        // attributes: attributes,
        text: event.target.innerText,
      };

      tmp = document.createElement("div");
      tmp.id = "floating-window";
      tmp.className = "floating-window";
      tmp.innerHTML = `
      <div class="window-header">
    <h2>Settings</h2>
    <button id="close-btn" class="close-btn">×</button>
  </div>
  <div class="window-content">
    <label for="dropdown">Choose an option:</label>
    <form>
    <select name="whichelement" id="whichelement">
 <option value="Urgency">Urgency</option>
  <option value="Misdirection">Misdirection</option>
  <option value="Not Dark Pattern">Not Dark Pattern</option>
  <option value="Scarcity">Scarcity</option>
  <option value="Obstruction">Obstruction</option>
  <option value="Social Proof">Social Proof</option>
  <option value="Sneaking">Sneaking</option>
  <option value="Forced Action">Forced Action</option>
    </select>
    <button disabled id="elementsend">Send feed back</button>
    </form>
  </div>
      
      `;
      const style = document.createElement("style");
      style.textContent = `
      .floating-window {
        z-index:99999;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        background-color: #f9f9f9;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
      }
      
      .window-header {
        background-color: #007bff;
        color: #fff;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
      
      .window-header h2 {
        margin: 0;
      }
      
      .close-btn {
        background: none;
        border: none;
        color: #fff;
        cursor: pointer;
        font-size: 20px;
      }
      
      .window-content {
        padding: 20px;
      }
      
      label {
        display: block;
        margin-bottom: 10px;
      }
      
      select {
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        font-size: 16px;
      }
      
      select:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.5);
      }
      `;
      document.head.after(style);
      document.body.after(tmp);
      // obj = {};
      const ng = tmp.getElementsByTagName("select");
      const bt = tmp.getElementsByTagName("button");
      ng[0].addEventListener("click", () => {
        bt[1].disabled = false;
      });

      function submitfeedback(obj) {
        console.log("sending msg", obj);
        fetch("https://dark.rachancheet.me/feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });
      }

      const frm = tmp.getElementsByTagName("form");
      frm[0].addEventListener("submit", (e) => {
        e.preventDefault();
        obj.pattern = e.target.elements["whichelement"].value;
        console.log(obj);
        submitfeedback(obj);
        tmp.remove();
      });
    }

    if (request.message == "selector") {
      var style = document.createElement("style");
      style.id = "customhover";
      style.textContent = `
        *:hover {
            box-shadow: 0 0 10px yellow !important;
        }
    `;
      document.head.appendChild(style);
      document.body.addEventListener("click", handleElementSelection, true);
      sendResponse("never done");
    }

    if (request.message === "getPage") {
      recurse(document.body);
      // var text = document.body.innerText;
      console.log("getPage", text, gfg);
      var data = JSON.stringify([text, gfg]);
      sendResponse(data);
    }

    if (request.message === "show") {
      let ls = document.getElementsByName("WebGuard_" + request.i);
      for (let gh of ls) {
        console.log("Showing: ", gh);
        gh.style.border = "1px solid red";
      }

      if (ls.length > 0) {
        ls[0].scrollIntoView();
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
        wrapperDiv.style =
          "border: 2px solid red; border-radius:4px;   padding:4px;";
        // wrapperDiv.style.border = "1px solid red";
        i.parentNode.insertBefore(wrapperDiv, i);
        wrapperDiv.appendChild(i);
        // .style.color = "red";
      }
      if (request.index.length > 0) {
        gfg[request.index[0]].scrollIntoView();
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
    if (request.message === "startSaber") {
      function removeClickedElement(event) {
        event.preventDefault();
        event.target.remove();
        document.body.style.overflow = "auto";
      }

      function handleKeyPress(event) {
        if (event.key === "Escape") {
          document.body.removeEventListener("click", removeClickedElement);
          style.parentNode.removeChild(style);
        }
      }

      document.body.addEventListener("click", removeClickedElement);
      document.addEventListener("keydown", handleKeyPress);

      var style = document.createElement("style");
      style.textContent = `
        *:hover {
            box-shadow: 0 0 10px yellow !important;
        }
    `;
      document.head.appendChild(style);
    }
  }
);

export default function Selectelement() {
  let brw = null;
  if (typeof chrome !== "undefined" && chrome.runtime) {
    brw = chrome;
  } else if (typeof browser !== "undefined" && browser.runtime) {
    brw = browser;
  }
  function select() {
    if (brw != null) {
      brw.runtime.onMessage.addListener(function (
        request,
        sender,
        sendResponse
      ) {
        if (request.message == "selectedelement") {
        }
      });

      brw.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        brw.tabs.sendMessage(
          tabs[0].id,
          { message: "selector" },
          (response) => {
            console.log("selector active");
          }
        );
      });
    }
  }

  return (
    <button className="bg-[#2e3134] border-r-2" onClick={select}>
      Select Element
    </button>
  );
}

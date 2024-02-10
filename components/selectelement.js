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
    <button
    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={select}>
      Flag False Positives 
    </button>
  );
}

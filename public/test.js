function parseEasyList(easyListText) {
  const blockedDomains = easyListText.split("\n");
  const requests = [
    "https://example.com/image.jpg",
    "https://google-analytics.com/analytics.js",
    "https://example.org/script.js",
  ];

  const blockedRequests = requests.filter((request) => {
    const requestDomain = new URL(request).hostname;
    console.log(requestDomain);

    return blockedDomains.includes(requestDomain);
  });

  return blockedRequests;
}
const fs = require("fs");

const filePath = "domains.txt";
let easyListText;
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  easyListText = data;

  const blockedRequests = parseEasyList(easyListText);

  console.log("Blocked requests:", blockedRequests);
});

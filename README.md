


# Dark Patterns Detector


[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![GitHub Forks](https://img.shields.io/github/forks/zubairmh/dpbh-web?style=social)
![GitHub Stars](https://img.shields.io/github/stars/zubairmh/dpbh-web?style=social)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/zubairmh/dpbh-web?style=social)
## Overview

The *Dark Patterns Detector* is a sophisticated web extension developed with *Next.js*, designed to systematically identify and analyze deceptive design elements, commonly known as "dark patterns," prevalent on various websites. These manipulative tactics exploit user behavior, and this extension aims to empower users by exposing and providing insights into such practices.

## Features

- **Pattern Detection:** Utilizing *ML model and image processing* , the extension discerns and categorizes common dark patterns, including urgency, misdirection, scarcity, obstruction, social proof, sneaking, and forced action on websites.

- **Pattern Counts:** Providing a transparent count of each detected dark pattern on a given webpage, the extension offers users valuable insights into the specific tactics employed.

- **Interactive Visualization:** Results of the analysis are presented through an intuitive and interactive pie chart, enhanced by the [Recharts](https://recharts.org/) library. This visualization aids users in easily interpreting the distribution of dark patterns.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/zubairmh/dpbh-web
   ```

2. Navigate to the project directory:

   ```bash
   cd dpbh-web
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and go to [http://localhost:3000](http://localhost:3000) to access the extension during development.

## Browser Compatibility
| Browser         	| Is compatible? 	| Tested versions                                                               	|
|-----------------	|:--------------:	|-------------------------------------------------------------------------------	|
| <img src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/chrome.svg" width="24px" style="background: white" /> Google Chrome   	|        ✅       	| <ul><li>113.0.5672.92 (Mac/arm64)</li><li>113.0.5672.93 (Win/x64)</li></ul> 	|
| <img src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/edge.svg" width="24px" style="background: white" /> Microsoft Edge  	|        ✅       	| <ul><li>113.0.1774.35 (Mac/arm64)</li><li>113.0.1774.35 (Win/x64)</li></ul>   	|
| <img src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/safari.svg" width="24px" style="background: white" /> Safari          	|        ✅       	| <ul><li>16.4 (18615.1.26.110.1) (Mac/arm64)</ul></li>                            	|
| <img src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/firefox.svg" width="24px" style="background: white" /> Mozilla Firefox 	|        ✅       	| <ul><li>113.0 (Mac/arm64)</li><li>112.0.2 (Win/x64)</li></ul>   	|
| <img src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/opera.svg" width="24px" style="background: white" /> Opera           	|        ✅       	| <ul><li>98.0.4759.39 (Mac/arm64)</li><li>98.0.4759.39 (Win/x64)</ul></li>       	|

### Google Chrome, Microsoft Edge and Opera
The Pattern Highlighter uses an [API](https://developer.chrome.com/docs/extensions/reference/) that is specified by Google and primarily supported by the Google Chrome browser. However, many other browsers also support this Chrome API. Since Microsoft Edge and Opera, just like Google Chrome, are built on the [Chromium](https://en.wikipedia.org/wiki/Chromium_(web_browser)) code base, the [API support](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Browser_support_for_JavaScript_APIs) of the three browsers is almost completely identical. Consequently, the extension will behave the same way in these browsers. This is also to be expected for other browsers that are based on Chromium.

### Firefox
Firefox also supports the Chrome API with [some differences and limitations](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Chrome_incompatibilities). For the Pattern Highlighter it is only relevant that Firefox [does not support](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json#browser_compatibility) the `background.service_worker` key in the [manifest file](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json) of extensions to define scripts that run in the background. Instead, it supports the `background.scripts` key, which is not supported by Chrome. Therefore, the Firefox version of the extension requires a custom manifest file. The other files are the same as in the Chrome version of the extension. The section on [installation in Firefox](#firefox) explains how to create the Firefox version.

### Safari
Safari also supports the Chrome API functions required by the Pattern Highlighter. Thus, the Pattern Highlighter is functionally fully compatible with Safari. However, Safari uses its own format for extensions, which differs from the other browsers. Therefore, the code of the Pattern Highlighter must first be converted to a Safari extension. This can conveniently be done automatically and is described in the section on [installation in Safari](#safari-1).
### Usage

- **Automatic Detection:** The extension seamlessly scans webpages, automatically identifying and categorizing dark patterns.

- **Comprehensive Analysis:** Detailed data analysis provides users with actionable insights into the prevalence of each dark pattern.

- **Visual Representation:** An interactive pie chart visually represents the distribution of dark patterns, enhanced using the [Recharts](https://recharts.org/) library.

## Screenshots

![Home](https://github.com/zubairmh/dpbh-web/assets/113838495/0c79f231-a510-4944-a854-48cf954dae19) | ![Analysis](https://github.com/zubairmh/dpbh-web/assets/113838495/23a8fe07-a7b8-4bdd-93a5-706069cd012a) | ![About](https://github.com/zubairmh/dpbh-web/assets/113838495/3bd054c5-f35b-4be8-b3f8-c94ef04f59c8)
:---:|:---:|:---:

## License

This project is licensed under the *MIT License* - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Special thanks to [Recharts](https://recharts.org/) for providing an excellent tool for pie chart visualization.

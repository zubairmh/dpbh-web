


# WebGuard : Dark Patterns Detector


[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![GitHub Forks](https://img.shields.io/github/forks/zubairmh/dpbh-web?style=social)
![GitHub Stars](https://img.shields.io/github/stars/zubairmh/dpbh-web?style=social)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/zubairmh/dpbh-web?style=social)

![Guard](https://github.com/zubairmh/dpbh-web/assets/113838495/b591ea7a-e2b6-4cf3-a692-d814c3778d93)

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
| Browser         	| Is compatible? 	| Links                                                               	|
|-----------------	|:--------------:	|-------------------------------------------------------------------------------	|
| <img src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/chrome.svg" width="24px" style="background: white" /> Google Chrome   	|        ✅  |https://chromewebstore.google.com/detail/webguard/fmdhbnclekigiecacodhabbbnadokeoj	|
| <img src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/firefox.svg" width="24px" style="background: white" /> Mozilla Firefox 	|        ✅       	| https://addons.mozilla.org/en-US/firefox/addon/webguard-gg/   	|
| <img src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/edge.svg" width="24px" style="background: white" /> Microsoft Edge  	|        ✅       	| Download From Chrome Webstore  	|
| <img src="https://gist.githubusercontent.com/PonomareVlad/f7a37bce6ff2dc19971c681269a30b26/raw/6ead3403e203db1c9ea195b57f6026f1d498e7dc/arc.svg" width="24px" style="background: white" /> Arc          	|        ✅       	| Download From Chrome Webstore                           	|
| <img src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/opera.svg" width="24px" style="background: white" /> Opera           	|        ✅       	| Download From Chrome Webstore      	|



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
- Special thanks to [Framer-motion](https://www.framer.com/motion/) for providing the excellent animations and transition

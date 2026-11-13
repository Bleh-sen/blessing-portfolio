# Ejindu Blessing Mmesomachukwu — Portfolio

A responsive portfolio built with plain HTML, CSS and JavaScript. No build step or package installation is required.

## View the website

Open `index.html` in a browser. For local development, a static file server or the VS Code Live Server extension can also be used.

## Editing the portfolio

- **Text and contact details:** Edit the relevant section in `index.html`.
- **Project information and filters:** Edit the project cards in `index.html` and the matching descriptions in the `projects` object in `script.js`. Keep each card's `data-project` value aligned with its project key.
- **Temporary project visuals:** The portfolio mock-ups are HTML elements in `index.html`, with their appearance in `styles.css`. Replace these mock-ups with real images only when authentic work samples are available; remove the temporary-visual labels at that time.
- **Skills and tools:** Edit the `skillContent` object in `script.js`.
- **CV:** The download button currently generates a clearly labelled, one-page PDF placeholder in `script.js`. To use a real CV, put the PDF in the project (for example, `assets/ejindu-blessing-cv.pdf`) and replace the `#download-cv` click handler with a download link to that file. Do not share the placeholder as a real CV.
- **Contact form:** The form validates the fields in the browser and prepares an email using the visitor's default email app. It does not submit to a server or store personal information. A hosted form endpoint would be needed for direct website submissions.

## Accessibility and responsive behavior

The site includes a keyboard-accessible mobile navigation, active section indicators, keyboard-operable skill tabs, expandable experience details, focusable project dialogs and a reduced-motion preference. The layout adapts for mobile and tablet widths.

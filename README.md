# AFYS & EWB Website

This repository contains the source for the joint website of the **Arab Foundation for Young Scientists (AFYS)** and the **Egyptian Water Bank (EWB)**. The site introduces the organizations, showcases initiatives and programs, and provides news and contact information. Its goal is to raise awareness of the two institutions and act as a central hub for their work.

## Local development

The project is a static site built with HTML, CSS, and JavaScript. No build step is required and there is no `package.json` or automated tests.

To preview the site locally you can open `index.html` directly in your browser or start a small web server:

```bash
# clone the repository
$ git clone <repository-url>
$ cd afys-ewb-website

# start a simple web server
$ python3 -m http.server
```

Then open `http://localhost:8000` in your browser.

## Project structure

- `index.html` and other page files are kept in the repository root. New pages can be added here using the `.html` extension.
- `css/` contains the global stylesheet (`style.css`).
- `js/` contains JavaScript for interactive behavior (`script.js`).
- `images/` stores image assets.

Add any new assets or supporting files to these directories to keep the project organized.

## Contributing

Pull requests and issue reports are welcome. If you have a fix or improvement:

1. Fork the repository.
2. Create a feature branch and make your changes.
3. Open a pull request describing your contribution.

We appreciate your help in making this site better.

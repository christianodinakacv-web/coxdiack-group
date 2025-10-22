
Coxdiack Group Website - Ready to Deploy
---------------------------------------

Contents: a React + Tailwind starter site with the Coxdiack Group theme, logo assets, and a simple animated GIF preview.

How to deploy to Vercel or Netlify:

1. Install Node.js (>=16) and npm.
2. Unzip the package and in the project root run:
   npm install
3. To run locally:
   npm start
4. To build:
   npm run build
5. For Vercel:
   - Sign in to Vercel, create a new project, import this repository or upload the folder.
   - Set the build command to: npm run build
   - Set the output directory to: build
6. For Netlify:
   - Drag and drop the build folder (after running npm run build) into Netlify dashboard, or connect via Git and set build command as above.

Note: Tailwind is pre-listed in devDependencies. After cloning, ensure tailwind.config.js content paths include ./src/**/*.{js,jsx,ts,tsx} and index.css includes @tailwind directives.


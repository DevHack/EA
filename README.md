# README #

## Setup ##

Run `npm install`

Run `gulp` and leave it running

## Development ##

Run `gulp connect` to serve the files locally to `localhost:8021`

## Tests ##

Run `karma start`

## Inside Drupal ##

To use inside Drupal:

1. Make sure the node you're embedding on is set up to ignore the theme (see `templates/system/html--node--117.tpl.php` for an example)
2. After building using `gulp dist`, copy all files from `/dist/prod` inside this repo to `earned_admission_app` inside the Drupal repo. It replaces the config URLs with production ones when building with `gulp dist` (you can see this inside `gulpfile.js`).
3. Commit and push to Pantheon, and you should see the updated app at `https://dev-gfa.ws.asu.edu/earned-admission-track/start`
4. Test (or have someone at ASU test) the workflow at `https://dev-gfa.ws.asu.edu/earned-admission-track/start` and make sure it works and *points to production Salesforce endpoints*
5. Do the usual deployment workflow inside Pantheon to push the code to test, and then live
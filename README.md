# Boilerplate
Front end starting point for creating websites with jade and sass

## Gulp tasks
Task|Description
----|-----------
gulp dist|Packages the project in the dist directory
gulp live|Executes ´gulp dist´ and uses BrowserSync to live refresh the project in the browser
gulp clean|Deletes the dist directory

## File destinations

Development directory|Directory description|Distribution directory
---------------------|---------------------|----------------------
app/static|Contains static files (example: images, css, fonts)|dist
app/sass/|Contains SASS files|dist/css
app/jade|Contains jade files|dist
app/js|Contains your javascript files (will be uglified)|dist/js
app/js/libs|Contains javascript libraries (won't be uglified)|dist/js

const fs = require('fs');

function view (templateName, values, res) {
    // Read from the template files
    let fileContents = fs.readFileSync('./views/' + templateName + '.html');
    // Insert values into the content
    // Write out the contents to the reponse
    res.write(fileContents);
    // Insert values in to the content
    // Write out to the response
}

module.exports = { view }
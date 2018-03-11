const fs = require('fs');

function mergeValues(values, content) {
    // Cycle over keys
    for (let key in values) {
        // Replace all {{key}} with the value from the values object
        content = content.replace(`{{${key}}}`, values[key]);
    }
    return content;
}

function view (templateName, values, res) {
    // Read from the template files
    let fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: "utf8"});
    // Insert values into the content
    fileContents = mergeValues(values, fileContents);
    // Write out the contents to the reponse
    res.write(fileContents);
}

module.exports = { view }
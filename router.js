const Profile = require("./profile");
const renderer = require('./renderer');

function home(req, res) {
    if (req.url === "/") {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        renderer.view("header", {}, res);
        renderer.view("search", {}, res);
        renderer.view("footer", {}, res);
        res.end();
    }
}

function user(req, res) {
    let username = req.url.replace("/", "");
    if (username.length > 0) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        renderer.view("header", {}, res);

        let studentProfile = new Profile(username);
        studentProfile.on('end', function (profileJSON) {
            // Store values which we need
            let values = {
                avatarUrl: profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges: profileJSON.badges.length,
                javascript: profileJSON.points.JavaScript
            }
            // Simple response
            renderer.view("profile", values, res);
            renderer.view("footer", {}, res);
            res.end();
        });

        studentProfile.on('error', function (error) {
            renderer.view("error", {errorMessage: error.message}, res);
            renderer.view("search", {}, res);
            renderer.view("footer", {}, res);
            res.end();
        });        
    }
}

module.exports = { home, user }
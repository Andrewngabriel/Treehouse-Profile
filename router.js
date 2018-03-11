const Profile = require("./profile");
const renderer = require('./renderer');
const querystring = require('querystring');

const commonHeaders = {'Content-Type': 'text/html'};

function home(req, res) {
    if (req.url === "/") {
        if (req.method.toLowerCase() === "") {
            res.writeHead(200, commonHeaders);
            renderer.view("header", {}, res);
            renderer.view("search", {}, res);
            renderer.view("footer", {}, res);
            res.end();
        } else {
            req.on('data', function(postBody) {
                let query = querystring.parse(postBody.toString());
                res.write(query.username);
                res.end();
            });
        }
    }
}

function user(req, res) {
    let username = req.url.replace("/", "");
    if (username.length > 0) {
        res.writeHead(200, commonHeaders);
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
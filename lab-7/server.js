const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Serve static files
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// Handle form submission
server.post('/submit', (req, res) => {
    const { noun, verb, adjective, place, pluralNoun } = req.body;

    if (!noun || !verb || !adjective || !place || !pluralNoun) {
        res.send(`
            <h1>Submission Failed</h1>
            <p>Please fill out ALL fields</p>
            <a href="index.html">Go Back to Form</a>
        `);
        return;
    }

    const madLib = `Once upon a time, a ${adjective} ${noun} went to ${place}. There, they met a group of ${pluralNoun} and decided to ${verb}. It was an unforgettable adventure!`;

    res.send(`
        <h1>Submission Successful</h1>
        <p>${madLib}</p>
        <a href="index.html">Go Back to Form</a>
    `);
});

// Start server
let port = 80;
if (process.argv[2] === 'local') {
    port = 8080;
}
server.listen(port, () => console.log('Ready on localhost!'));

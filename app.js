const express = require('express');
const app = express();
let jsend = require('jsend');
const bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3003);

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the JSend middleware
app.use(jsend.middleware);

let itemCount = 20;

app.get('/getcount', function (req, res) {
    if (req.query.item) {
        return res.jsend.success({ "quantity": itemCount });
    } else {
        return res.jsend.error({
            code: 500,
            message: 'Error occurred: body parser error.'
        });
    }
});

app.post('/setcount', function (req, res) {
    // Allows developer to modify the count that is sent back to the ordering service
    // The quantity will be the new count
    itemCount = req.body.quantity;

    /* Code to reset the count (probably in a database) according to how many items ordered */

    // Reports back a message to show user what items were reduced and how much, as well as the count of items in stock 
    res.send("Reduced " + req.body.item + "(s) by " + req.body.quantity + "\n  -Item count is set to " + itemCount);
});

// Error middleware
app.use(function (req, res, next) {
    res.status(404);
    res.send('404 – Not Found');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.');
});
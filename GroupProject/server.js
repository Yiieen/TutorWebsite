const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Route to save form data
app.post('/save-form-data', (req, res) => {
    const formData = req.body;

    // Read existing data
    fs.readFile('formData.json', 'utf8', (err, data) => {
        let json = [];
        if (!err && data) {
            json = JSON.parse(data); // Parse existing data
        }

        // Add new form data
        json.push(formData);

        // Save updated data back to the file
        fs.writeFile('formData.json', JSON.stringify(json, null, 2), (err) => {
            if (err) {
                console.error('Error writing to file', err);
                res.status(500).send('Failed to save data.');
            } else {
                res.status(200).send('Form data saved successfully.');
            }
        });
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

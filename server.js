const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dataFilePath = 'uniforms.json';

app.post('/addUniform', (req, res) => {
    const uniformData = req.body;

    fs.readFile(dataFilePath, (err, data) => {
        if (err) throw err;

        const uniforms = JSON.parse(data);
        uniforms.push(uniformData);

        fs.writeFile(dataFilePath, JSON.stringify(uniforms, null, 2), (err) => {
            if (err) throw err;
            console.log('Uniform added successfully.');
            res.send('Uniform added successfully.');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

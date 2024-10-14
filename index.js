const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000; // Replace with your desired port

app.get('/image', async (req, res) => {
  try {
    const imgname = req.query.imgname; // Get the query string parameter
    if (!imgname) {
      return res.status(400).send('Missing img fil ename parameter');
    }

    const externalApiUrl = 'https://43.229.78.113:8300/uploads/' + imgname; // Replace with the URL of the external API

    const response = await axios.get(externalApiUrl, {
      responseType: 'arraybuffer',
    });
    const imageData = Buffer.from(response.data, 'binary');

    res.contentType('image/jpeg'); // Adjust the content type as needed
    res.send(imageData);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Failed to fetch image');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

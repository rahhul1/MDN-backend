const axios = require('axios');


const allproductioninfromation = async (req, res) => {
    try {
      // Use axios to make GET requests to the three APIs
      const response1 = await axios.get('API_URL_1');
      const response2 = await axios.get('API_URL_2');
      const response3 = await axios.get('API_URL_3');
  
      // Process and merge the data from the three responses
      const mergedData = {
        dataFromAPI1: response1.data,
        dataFromAPI2: response2.data,
        dataFromAPI3: response3.data,
      };
  
      // Store or manipulate the merged data as needed, e.g., save it to MongoDB
  
      // Send the merged data as a response
      res.json(mergedData);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
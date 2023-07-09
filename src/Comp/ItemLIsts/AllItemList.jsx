// apiData.js

import axios from 'axios';
const apiKey = process.env.REACT_APP_API_KEY;
async function LaptopList() {
  const response = await axios.get(`${apiKey}/api/laptops`);
  return response.data;
}
async function PhoneList() {
  const response = await axios.get(`${apiKey}/api/phones`);
  return response.data;
}
async function LaptopListlimit() {
  const response = await axios.get(`${apiKey}/api/laptops`, {
    params: {
      limit: 10,
      sort: 'date',
    },
  });
  return response.data;
}
async function PhoneListLimit() {
  const response = await axios.get(`${apiKey}/api/phones`, {
    params: {
      limit: 10,
      sort: 'date',
    },
  });
  return response.data;
}


async function OtherListLimit() {
  const response = await axios.get(`${apiKey}/api/others`, {
    params: {
      limit: 10,
      sort: 'date',
    },
  });
  return response.data;
}

export { LaptopList,PhoneList,OtherListLimit,PhoneListLimit,LaptopListlimit};
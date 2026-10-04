import axios from 'axios';

const API = axios.create({
  baseURL: 'https://localhost:7000/api', // Thay đúng cổng port Backend .NET của em vào đây
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
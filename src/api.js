const API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://spendwise-ten-zeta.vercel.app'; // Replace this with your live backend URL later

export default API_BASE_URL;

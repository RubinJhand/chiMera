const API_KEY = process.env.REACT_APP_TEST_API_KEY;

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
};

export default requests;

const API_FETCH_ALL_POSTS = (pageNo) =>
    `https://rigi-react-assignment-ii-server-production.up.railway.app/api/posts?limit=10&page=${pageNo}`;

const API_FETCH_POST = (id) =>
    `https://rigi-react-assignment-ii-server-production.up.railway.app/api/posts/${id}`;

const API_FETCH_USERS = `https://rigi-react-assignment-ii-server-production.up.railway.app/api/users`;

export { API_FETCH_ALL_POSTS, API_FETCH_POST, API_FETCH_USERS };

import axios from 'axios';
const API_KEY = '5ba7a6b5036dfc28188ad9ffc7202a9acb8a6d5204e7e';

export const fetchUrls = ({query}) => {
  // const url = `https://pixabay.com/api/?image_type=photo&q=${query}&per_page=${count}&page=${page}&key=${API_KEY}`;
  // const url = `http://api.linkpreview.net/?key=${API_KEY}&q='https://www.eurosport.ru/'`;
  const url = `http://api.linkpreview.net/?key=${API_KEY}&q=${query}`;
  // console.log(url);
  // return url;
  return axios
    .get(url)
    .then(res => res)
    .catch(err => console.log('axios err : ', err));
};
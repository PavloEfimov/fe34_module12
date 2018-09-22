export const set = value => {
    localStorage.setItem('urls', JSON.stringify(value));
  };
  
  export const get = () => {
    const data = localStorage.getItem('urls');
  
    return data ? JSON.parse(data) : null;
  };
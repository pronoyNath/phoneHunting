async function fetchData() {
    try {
      // Asynchronous operation, e.g., fetching data from an API
      const response = await fetch('https://openapi.programming-hero.com/api/phones?search=4545');
      
      const data = await response.json();
      console.log('Data:try field-->', data);
    } catch (error) {
      console.error('Error:error field-->',error);
    }
  }
  
  fetchData();
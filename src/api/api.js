
const API_URL = 'https://fp-ardrecruiting-prod-001-func.azurewebsites.net/api';

export async function getOptions() {
    try {
      const response = await fetch(`${API_URL}/concretepurpose`);
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();
      let processedData = [];
      processedData = data.filter(d => {
      if(d && d.DesignatedConcrete) {
          return true;
        }
        return false;
      });
      if(!processedData.length) {
        throw new Error("The data received was invalid for the dropdown");
      }
      return processedData;
    } catch (error) {
      console.log(error.message);
    }
      
  }

export async function getChartData(value) {
    try {
      const response = await fetch(`${API_URL}/concretedetails?designatedConcrete=${value.DesignatedConcrete}`);
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      return response;
    } catch (error) {
      console.log(error.message);
    }
    
  }
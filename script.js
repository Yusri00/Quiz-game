async function fetchData(){

    try{
        const response = await fetch('data.JSON');
        if(!response.ok){
            throw new Error(`Http error! status: ${response.status}`);
        }
        const data = await response.json();
        const dataDisplay = document.getElementById('dataDisplay');

        // Visa data i HTML
        dataDisplay.textContent = JSON.stringify(data, null, 2);
    }
    catch(error){
        console.error('API could not be read', error);
    }
}
fetchData();

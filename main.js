async function fetchData(){

    try{
    const response = await fetch('data.JSON');

        if(!response.ok){
            throw new Error();
        }
        return response.json;
    }
    catch{
        console.error('API could not be read', error);
    }
}
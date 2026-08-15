async function loadDashboardStats(){

    try{

        const response = await fetch(
            "https://agrisense-ai-fua5.onrender.com/prediction"
        );


        const data = await response.json();


        document.getElementById("totalLands").innerHTML =
        data.total_lands;


        document.getElementById("totalPredictions").innerHTML =
        data.total_predictions;


        document.getElementById("totalFinance").innerHTML =
        data.total_finance;


        document.getElementById("totalSchemes").innerHTML =
        data.total_schemes;


    }

    catch(error){

        console.log(error);

    }

}


loadDashboardStats();

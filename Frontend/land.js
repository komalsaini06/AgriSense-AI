// Save Land + Display Saved Land


const landForm = document.getElementById("landForm");


// Load saved land when page opens
window.onload = function(){
    loadLand();
};



landForm.addEventListener("submit", async function(event){

    event.preventDefault();


    const landData = {

        land_name: document.getElementById("land_name").value,

        location: document.getElementById("location").value,

        area: Number(document.getElementById("area").value),

        soil_type: document.getElementById("soil_type").value,

        current_crop: document.getElementById("current_crop").value

    };



    try{


        const response = await fetch(
            "http://127.0.0.1:8000/land",
            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(landData)
            }
        );



        const result = await response.json();



        alert("✅ " + result.message);



        landForm.reset();



        // Refresh land parcel after saving
        loadLand();



    }


    catch(error){

        console.log(error);

        alert("❌ Backend connection failed");

    }


});




// Function to get saved land

async function loadLand(){


    try{


        const response = await fetch(
            "http://127.0.0.1:8000/land"
        );


        const lands = await response.json();



        if(lands.length > 0){


            // latest land
            const land = lands[lands.length - 1];



            document.querySelector(".parcel").innerHTML = `

                <p>🏞 Land Name : ${land.land_name}</p>
                
                <p>📍 Location : ${land.location}</p>

                <p>🌾 Area : ${land.area} Acres</p>

                <p>🌱 Soil Type : ${land.soil_type}</p>

                <p>🌿 Current Crop : ${land.current_crop}</p>

            `;


        }


    }


    catch(error){

        console.log(error);

    }


}
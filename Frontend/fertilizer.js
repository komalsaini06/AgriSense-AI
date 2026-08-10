// Seed & Fertilizer Recommendation


async function getFertilizer(){


    const crop = document.getElementById("crop").value;



    if(crop === ""){

        alert("Please select crop");

        return;

    }



    const data = {

        crop: crop

    };




    try{


        const response = await fetch(

            "http://127.0.0.1:8000/fertilizer/recommend",

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },


                body:JSON.stringify(data)

            }

        );



        const result = await response.json();





        document.getElementById("result").innerHTML = `


        <p>
        🌱 Crop :
        <b>${result.crop}</b>
        </p>


        <p>
        🌾 Recommended Seed :
        ${result.seed}
        </p>


        <p>
        🧪 Nitrogen :
        ${result.nitrogen}
        </p>


        <p>
        🧪 Phosphorus :
        ${result.phosphorus}
        </p>


        <p>
        🧪 Potassium :
        ${result.potassium}
        </p>


        <p>
        🌿 Organic Fertilizer :
        ${result.organic}
        </p>


        `;



    }


    catch(error){


        console.log(error);

        alert("Backend connection error");


    }



}
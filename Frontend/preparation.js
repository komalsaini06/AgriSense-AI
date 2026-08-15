// Land Preparation Recommendation


async function getPreparation(){


    const crop = document.getElementById("crop").value;

    const soil = document.getElementById("soil").value;



    if(crop === "" || soil === ""){

        alert("Please select crop and soil type");

        return;

    }



    const data = {


        crop: crop,


        soil_type: soil


    };




    try{


        const response = await fetch(

            "https://agrisense-ai-fua5.onrender.com/preparation/recommend",

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },


                body:JSON.stringify(data)

            }

        );



        const result = await response.json();




        let steps = "";



        result.steps.forEach(function(step, index){


            steps += `<p>${index + 1}. ${step}</p>`;


        });






        document.getElementById("result").innerHTML = `



        <p>
        🚜 Crop :
        <b>${result.crop}</b>
        </p>



        <h3>Preparation Steps:</h3>

        ${steps}



        <p>
        🌱 Soil Improvement :
        ${result.soil_improvement}
        </p>



        `;



    }


    catch(error){


        console.log(error);

        alert("Unable to get preparation plan");


    }



}

// Crop Rotation Recommendation


async function getRotation(){


    const crop = document.getElementById("crop").value;



    if(crop === ""){

        alert("Please select current crop");

        return;

    }



    const data = {

        crop: crop

    };




    try{


        const response = await fetch(

            "https://agrisense-ai-fua5.onrender.com/rotation/recommend",

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },


                body:JSON.stringify(data)

            }

        );



        const result = await response.json();




        let crops = "";



        result.recommended_next_crops.forEach(function(item){



            crops += `

            <div>

            <h3>🌱 ${item.crop}</h3>

            <p>
            📌 ${item.benefit}
            </p>

            </div>

            <hr>

            `;



        });







        document.getElementById("result").innerHTML = `



        <p>
        🌾 Current Crop :
        <b>${result.current_crop}</b>
        </p>



        <h3>
        🔄 Recommended Next Crops:
        </h3>



        ${crops}



        `;



    }


    catch(error){


        console.log(error);

        alert("Unable to get crop rotation plan");


    }



}

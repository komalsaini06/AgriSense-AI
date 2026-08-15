// Crop Calendar JavaScript


async function getCalendar(){


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

           fetch("https://agrisense-ai-fua5.onrender.com/prediction"),

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
        🌾 Sowing Time :
        ${result.sowing}
        </p>



        <p>
        🌿 Fertilizer Schedule :
        ${result.fertilizer}
        </p>



        <p>
        💧 Irrigation :
        ${result.irrigation}
        </p>



        <p>
        🚜 Harvesting :
        ${result.harvesting}
        </p>



        `;



    }


    catch(error){


        console.log(error);

        alert("Unable to load crop calendar");


    }


}

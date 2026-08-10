// Disease Detection JavaScript


async function detectDisease(){


    const imageInput = document.getElementById("leafImage");


    if(imageInput.files.length === 0){

        alert("Please upload a leaf image");

        return;

    }



    const image = imageInput.files[0];



    const formData = new FormData();


    formData.append(
        "image",
        image
    );



    try{


        const response = await fetch(

            "http://127.0.0.1:8000/disease/detect",

            {

                method:"POST",

                body:formData

            }

        );



        const result = await response.json();



        document.getElementById("result").innerHTML = `


        <p>
        🍂 Disease :
        <b>${result.disease}</b>
        </p>


        <p>
        🔍 Symptoms :
        ${result.symptoms}
        </p>


        <p>
        💊 Treatment :
        ${result.treatment}
        </p>


        <p>
        🛡 Prevention :
        ${result.prevention}
        </p>


        `;



    }


    catch(error){


        console.log(error);

        alert("Disease detection failed");


    }


}
// ==========================================
// CROP RECOMMENDATION
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    loadLands();

    const recommendButton =
        document.getElementById("recommendBtn");

    recommendButton.addEventListener(
        "click",
        function (event) {

            // IMPORTANT: prevent page refresh
            event.preventDefault();

            recommendCrop();

        }
    );


    // Restore previous recommendation if page reloads
    restoreRecommendation();

});


// ==========================================
// LOAD LANDS
// ==========================================

async function loadLands() {

    const select =
        document.getElementById("land_select");

    try {

       const response = await fetch(
    "https://agrisense-ai-fua5.onrender.com/crop/lands"
        );
        if (!response.ok) {

            throw new Error(
                "Unable to load lands"
            );

        }

        const lands =
            await response.json();


        select.innerHTML = `
            <option value="">
                Select Land
            </option>
        `;


        lands.forEach(function (land) {

            const option =
                document.createElement("option");

            option.value =
                JSON.stringify(land);

            option.textContent =
                land.land_name;

            select.appendChild(option);

        });

    }

    catch (error) {

        console.error(
            "Land loading error:",
            error
        );

        select.innerHTML = `
            <option value="">
                Unable to load lands
            </option>
        `;

    }

}


// ==========================================
// RECOMMEND CROP
// ==========================================

async function recommendCrop() {

    const landValue =
        document.getElementById(
            "land_select"
        ).value;


    const season =
        document.getElementById(
            "season"
        ).value;


    const irrigation =
        document.getElementById(
            "irrigation"
        ).value;


    // ======================================
    // VALIDATION
    // ======================================

    if (landValue === "") {

        alert("Please select land.");

        return;

    }


    if (season === "") {

        alert("Please select season.");

        return;

    }


    if (irrigation === "") {

        alert("Please select irrigation.");

        return;

    }


    // ======================================
    // READ LAND
    // ======================================

    let land;

    try {

        land = JSON.parse(landValue);

    }

    catch (error) {

        console.error(error);

        alert("Invalid land information.");

        return;

    }


    // ======================================
    // REQUEST DATA
    // ======================================

    const cropData = {

        land_name: land.land_name,

        location: land.location,

        soil_type: land.soil_type,

        season: season,

        irrigation: irrigation

    };


    const resultBox =
        document.getElementById("result");


    // ======================================
    // SHOW LOADING
    // ======================================

    resultBox.innerHTML = `

        <div style="
            padding:20px;
            text-align:center;
        ">

            <h3>🌱 Analyzing...</h3>

            <p>
                Please wait...
            </p>

        </div>

    `;


    try {

        // ==================================
        // API CALL
        // ==================================

        const response = await fetch(
    "https://agrisense-ai-fua5.onrender.com/crop/lands"
);

            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(cropData)
            }

        );


        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "Backend response:",
                errorText
            );

            throw new Error(
                "Backend returned an error"
            );

        }


        // ==================================
        // GET RESULT
        // ==================================

        const result =
            await response.json();


        console.log(
            "Recommendation result:",
            result
        );


        // ==================================
        // SAVE RESULT
        // ==================================

        sessionStorage.setItem(
            "cropRecommendation",
            JSON.stringify(result)
        );


        // ==================================
        // DISPLAY RESULT
        // ==================================

        displayRecommendation(result);

    }

    catch (error) {

        console.error(
            "Recommendation error:",
            error
        );


        resultBox.innerHTML = `

            <div style="
                background:#f8d7da;
                padding:20px;
                border-radius:10px;
                border-left:5px solid #dc3545;
            ">

                <h3>
                    ⚠️ Unable to get recommendation
                </h3>

                <p>
                    Please make sure the backend
                    is running.
                </p>

            </div>

        `;

    }

}


// ==========================================
// DISPLAY RECOMMENDATION
// ==========================================

function displayRecommendation(result) {

    const resultBox =
        document.getElementById("result");


    resultBox.innerHTML = `

        <div style="
            background:#ffffff;
            padding:20px;
            border-radius:12px;
            border-left:5px solid #176b2c;
            box-shadow:
                0 4px 12px
                rgba(0,0,0,0.10);
        ">

            <h2 style="
                color:#176b2c;
                margin-top:0;
            ">
                🌱 Crop Recommendation
            </h2>


            <p>
                <strong>
                    🌾 Recommended Crop:
                </strong>

                <span style="
                    color:#176b2c;
                    font-weight:bold;
                ">

                    ${result.recommended_crop || "--"}

                </span>
            </p>


            <p>

                <strong>
                    📌 Reason:
                </strong>

                ${result.reason || "--"}

            </p>


            <p>

                <strong>
                    💧 Water Requirement:
                </strong>

                ${result.water_requirement || "--"}

            </p>


            <p>

                <strong>
                    ⏳ Duration:
                </strong>

                ${result.crop_duration || "--"}

            </p>


            <p>

                <strong>
                    🌾 Expected Yield:
                </strong>

                ${result.expected_yield || "--"}

            </p>

        </div>

    `;

}


// ==========================================
// RESTORE RESULT AFTER REFRESH
// ==========================================

function restoreRecommendation() {

    const savedResult =
        sessionStorage.getItem(
            "cropRecommendation"
        );


    if (!savedResult) {

        return;

    }


    try {

        const result =
            JSON.parse(savedResult);


        displayRecommendation(result);

    }

    catch (error) {

        console.error(
            "Unable to restore recommendation:",
            error
        );

    }

}

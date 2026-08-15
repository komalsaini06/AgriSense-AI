// ==========================================
// CROP RECOMMENDATION
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    loadLands();

    const recommendButton =
        document.getElementById("recommendBtn");

    if (recommendButton) {

        recommendButton.addEventListener(
            "click",
            function (event) {

                // Prevent page refresh
                event.preventDefault();

                recommendCrop();

            }
        );

    }

    // Restore previous recommendation
    restoreRecommendation();

});


// ==========================================
// LOAD LANDS
// ==========================================

async function loadLands() {

    const select =
        document.getElementById("land_select");

    if (!select) {

        console.error(
            "Land select element not found."
        );

        return;

    }

    try {

        // ======================================
        // GET SAVED LANDS
        // ======================================

        const response = await fetch(
            "https://agrisense-ai-fua5.onrender.com/crop/lands"
        );


        if (!response.ok) {

            throw new Error(
                "Unable to load lands"
            );

        }


        // ======================================
        // READ LAND DATA
        // ======================================

        const lands =
            await response.json();


        console.log(
            "Lands received:",
            lands
        );


        // ======================================
        // CLEAR DROPDOWN
        // ======================================

        select.innerHTML = "";


        // ======================================
        // DEFAULT OPTION
        // ======================================

        const defaultOption =
            document.createElement("option");

        defaultOption.value = "";

        defaultOption.textContent =
            "Select Land";

        select.appendChild(
            defaultOption
        );


        // ======================================
        // CHECK LAND DATA
        // ======================================

        if (
            !Array.isArray(lands) ||
            lands.length === 0
        ) {

            const emptyOption =
                document.createElement("option");

            emptyOption.value = "";

            emptyOption.textContent =
                "No land available";

            select.appendChild(
                emptyOption
            );

            return;

        }


        // ======================================
        // ADD LANDS TO DROPDOWN
        // ======================================

        lands.forEach(function (land) {

            const option =
                document.createElement("option");


            // Store complete land information
            option.value =
                JSON.stringify(land);


            // Display land name and location
            option.textContent =
                land.land_name +
                " - " +
                land.location;


            select.appendChild(
                option
            );

        });


        console.log(
            "Dropdown options:",
            select.options.length
        );

    }


    catch (error) {

        console.error(
            "Land loading error:",
            error
        );


        // ======================================
        // SHOW ERROR
        // ======================================

        select.innerHTML = "";


        const errorOption =
            document.createElement("option");


        errorOption.value = "";


        errorOption.textContent =
            "Unable to load lands";


        select.appendChild(
            errorOption
        );

    }

}


// ==========================================
// RECOMMEND CROP
// ==========================================

async function recommendCrop() {

    const landSelect =
        document.getElementById(
            "land_select"
        );


    const seasonSelect =
        document.getElementById(
            "season"
        );


    const irrigationSelect =
        document.getElementById(
            "irrigation"
        );


    const landValue =
        landSelect.value;


    const season =
        seasonSelect.value;


    const irrigation =
        irrigationSelect.value;


    // ======================================
    // VALIDATION
    // ======================================

    if (landValue === "") {

        alert(
            "Please select land."
        );

        return;

    }


    if (season === "") {

        alert(
            "Please select season."
        );

        return;

    }


    if (irrigation === "") {

        alert(
            "Please select irrigation."
        );

        return;

    }


    // ======================================
    // READ LAND INFORMATION
    // ======================================

    let land;


    try {

        land =
            JSON.parse(
                landValue
            );

    }


    catch (error) {

        console.error(
            "Land parsing error:",
            error
        );


        alert(
            "Invalid land information."
        );


        return;

    }


    // ======================================
    // PREPARE REQUEST DATA
    // ======================================

    const cropData = {

        land_name:
            land.land_name,

        location:
            land.location,

        soil_type:
            land.soil_type,

        season:
            season,

        irrigation:
            irrigation

    };


    console.log(
        "Crop request:",
        cropData
    );


    const resultBox =
        document.getElementById(
            "result"
        );


    // ======================================
    // SHOW LOADING
    // ======================================

    resultBox.innerHTML = `

        <div style="
            padding:20px;
            text-align:center;
        ">

            <h3>
                🌱 Analyzing...
            </h3>

            <p>
                Please wait...
            </p>

        </div>

    `;


    try {

        // ==================================
        // SEND REQUEST TO BACKEND
        // ==================================

        const response =
            await fetch(

                "https://agrisense-ai-fua5.onrender.com/crop/recommend",

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            cropData
                        )

                }

            );


        // ==================================
        // CHECK RESPONSE
        // ==================================

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
        // GET RECOMMENDATION
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

            JSON.stringify(
                result
            )

        );


        // ==================================
        // DISPLAY RESULT
        // ==================================

        displayRecommendation(
            result
        );

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
                    Please try again later.
                </p>

            </div>

        `;

    }

}


// ==========================================
// DISPLAY RECOMMENDATION
// ==========================================

function displayRecommendation(
    result
) {

    const resultBox =
        document.getElementById(
            "result"
        );


    if (!resultBox) {

        return;

    }


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

                    ${
                        result.recommended_crop
                        || "--"
                    }

                </span>

            </p>


            <p>

                <strong>
                    📌 Reason:
                </strong>

                ${
                    result.reason
                    || "--"
                }

            </p>


            <p>

                <strong>
                    💧 Water Requirement:
                </strong>

                ${
                    result.water_requirement
                    || "--"
                }

            </p>


            <p>

                <strong>
                    ⏳ Duration:
                </strong>

                ${
                    result.crop_duration
                    || "--"
                }

            </p>


            <p>

                <strong>
                    🌾 Expected Yield:
                </strong>

                ${
                    result.expected_yield
                    || "--"
                }

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
            JSON.parse(
                savedResult
            );


        displayRecommendation(
            result
        );

    }


    catch (error) {

        console.error(
            "Unable to restore recommendation:",
            error
        );


        sessionStorage.removeItem(
            "cropRecommendation"
        );

    }

}

// ==========================================
// AGRISENSE AI - FINANCE CALCULATOR
// ==========================================


document.addEventListener(
    "DOMContentLoaded",
    function () {

        const button =
            document.getElementById(
                "calculateFinanceBtn"
            );


        if (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    calculateFinance();

                }
            );

        }


        restoreFinanceResult();

    }
);


// ==========================================
// CALCULATE FINANCE
// ==========================================

async function calculateFinance() {


    const cropName =
        document.getElementById(
            "crop_name"
        ).value;


    const landArea =
        parseFloat(
            document.getElementById(
                "land_area"
            ).value
        );


    const production =
        parseFloat(
            document.getElementById(
                "production"
            ).value
        );


    const investment =
        parseFloat(
            document.getElementById(
                "investment"
            ).value
        );


    const sellingPrice =
        parseFloat(
            document.getElementById(
                "selling_price"
            ).value
        );


    // ==========================================
    // VALIDATION
    // ==========================================

    if (cropName === "") {

        alert("Please select a crop.");

        return;

    }


    if (
        isNaN(landArea) ||
        landArea <= 0
    ) {

        alert(
            "Please enter a valid land area."
        );

        return;

    }


    if (
        isNaN(production) ||
        production <= 0
    ) {

        alert(
            "Please enter a valid production."
        );

        return;

    }


    if (
        isNaN(investment) ||
        investment < 0
    ) {

        alert(
            "Please enter a valid investment."
        );

        return;

    }


    if (
        isNaN(sellingPrice) ||
        sellingPrice < 0
    ) {

        alert(
            "Please enter a valid selling price."
        );

        return;

    }


    // ==========================================
    // SHOW CALCULATING MESSAGE
    // ==========================================

    const resultBox =
        document.getElementById(
            "financeResult"
        );


    resultBox.innerHTML = `

        <div class="parcel">

            <h3>
                💰 Calculating...
            </h3>

            <p>
                Please wait.
            </p>

        </div>

    `;


    // ==========================================
    // SEND DATA TO BACKEND
    // ==========================================

    try {


        const response = await fetch(

            "http://127.0.0.1:8000/finance",

            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify({

                    crop_name:
                        cropName,

                    land_area:
                        landArea,

                    production:
                        production,

                    investment:
                        investment,

                    selling_price:
                        sellingPrice

                })

            }

        );


        // ==========================================
        // CHECK RESPONSE
        // ==========================================

        if (!response.ok) {

            const error =
                await response.text();

            console.error(
                "Backend Error:",
                error
            );

            throw new Error(
                "Finance calculation failed."
            );

        }


        const data =
            await response.json();


        console.log(
            "Finance Result:",
            data
        );


        // ==========================================
        // SAVE RESULT
        // ==========================================

        sessionStorage.setItem(

            "financeResult",

            JSON.stringify(data)

        );


        // ==========================================
        // DISPLAY RESULT
        // ==========================================

        displayFinanceResult(data);


    }

    catch (error) {


        console.error(
            "Finance Error:",
            error
        );


        resultBox.innerHTML = `

            <div
                class="parcel"
                style="
                    background:#f8d7da;
                    border-left:5px solid #dc3545;
                "
            >

                <h3>
                    ⚠️ Finance Calculation Error
                </h3>

                <p>
                    Unable to calculate finance.
                </p>

                <p>
                    Please make sure the
                    AgriSense AI backend is running.
                </p>

            </div>

        `;

    }

}


// ==========================================
// DISPLAY RESULT
// ==========================================

function displayFinanceResult(data) {


    const resultBox =
        document.getElementById(
            "financeResult"
        );


    const profit =
        Number(
            data.estimated_profit || 0
        );


    const income =
        Number(
            data.estimated_income || 0
        );


    const profitPercentage =
        Number(
            data.profit_percentage || 0
        );


    const production =
        Number(
            data.estimated_production || 0
        );


    let background =
        "#d4edda";


    let statusColor =
        "green";


    if (
        data.status &&
        data.status.toLowerCase()
            .includes("loss")
    ) {

        background =
            "#f8d7da";

        statusColor =
            "red";

    }


    resultBox.innerHTML = `

        <div
            class="parcel"
            style="
                background:${background};
                padding:25px;
                border-left:5px solid ${statusColor};
            "
        >

            <h2>
                💰 Finance Report
            </h2>


            <p>

                🌾
                <strong>
                    Crop:
                </strong>

                ${data.crop_name}

            </p>


            <p>

                📏
                <strong>
                    Land Area:
                </strong>

                ${data.land_area}
                Acres

            </p>


            <p>

                📦
                <strong>
                    Production:
                </strong>

                ${production}
                Quintals

            </p>


            <p>

                💵
                <strong>
                    Estimated Income:
                </strong>

                ₹${income.toFixed(2)}

            </p>


            <p>

                📈
                <strong>
                    Estimated Profit:
                </strong>

                ₹${profit.toFixed(2)}

            </p>


            <p>

                📊
                <strong>
                    Profit Percentage:
                </strong>

                ${profitPercentage.toFixed(2)}%

            </p>


            <h3
                style="
                    color:${statusColor};
                "
            >

                ${data.status}

            </h3>


            <hr>


            <p>

                ℹ️
                This result is calculated from
                the production, investment and
                selling price entered by the farmer.

            </p>

        </div>

    `;

}


// ==========================================
// RESTORE RESULT
// ==========================================

function restoreFinanceResult() {


    const savedResult =
        sessionStorage.getItem(
            "financeResult"
        );


    if (!savedResult) {

        return;

    }


    try {


        const data =
            JSON.parse(
                savedResult
            );


        displayFinanceResult(data);


    }

    catch (error) {


        console.error(
            "Could not restore finance result:",
            error
        );

    }

}
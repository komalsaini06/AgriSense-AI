async function loadHistory() {

    try {

        const response = await fetch("http://127.0.0.1:8000/history");

        const data = await response.json();


        // LAND HISTORY

        const landDiv = document.getElementById("landHistory");

        if (data.land_history.length === 0) {

            landDiv.innerHTML = "<p>No land records found.</p>";

        } 
        
        else {

            data.land_history.forEach(land => {

                landDiv.innerHTML += `

                <div class="history-card">

                    <h3>🌾 ${land.land_name}</h3>

                    <p><b>Location:</b> ${land.location}</p>

                    <p><b>Area:</b> ${land.area} Acres</p>

                    <p><b>Soil Type:</b> ${land.soil_type}</p>

                    <p><b>Current Crop:</b> ${land.current_crop}</p>

                </div>

                `;

            });

        }



        // PREDICTION HISTORY

        const predictionDiv = document.getElementById("predictionHistory");


        if (data.prediction_history.length === 0) {

            predictionDiv.innerHTML = "<p>No prediction records found.</p>";

        } 
        
        else {

            data.prediction_history.forEach(prediction => {


                predictionDiv.innerHTML += `

                <div class="history-card">

                    <h3>🌱 Recommended Crop: ${prediction.predicted_crop}</h3>

                    <p><b>Farmer:</b> ${prediction.farmer_name}</p>

                    <p><b>Nitrogen:</b> ${prediction.nitrogen}</p>

                    <p><b>Phosphorus:</b> ${prediction.phosphorus}</p>

                    <p><b>Potassium:</b> ${prediction.potassium}</p>

                    <p><b>Temperature:</b> ${prediction.temperature} °C</p>

                    <p><b>Humidity:</b> ${prediction.humidity}%</p>

                    <p><b>Rainfall:</b> ${prediction.rainfall} mm</p>

                </div>

                `;

            });

        }



        // FINANCE HISTORY

        const financeDiv = document.getElementById("financeHistory");


        if (data.finance_history.length === 0) {

            financeDiv.innerHTML = "<p>No finance records found.</p>";

        } 
        
        else {

            data.finance_history.forEach(finance => {


                let statusColor =
                    finance.status === "Loss"
                    ? "red"
                    : "green";


                financeDiv.innerHTML += `

                <div class="history-card">

                    <h3>💰 ${finance.crop_name}</h3>

                    <p><b>Land Area:</b> ${finance.land_area} Acres</p>

                    <p><b>Investment:</b> ₹${finance.investment}</p>

                    <p><b>Income:</b> ₹${finance.estimated_income}</p>

                    <p><b>Profit:</b> ₹${finance.estimated_profit}</p>

                    <p><b>Profit Percentage:</b> ${finance.profit_percentage}%</p>


                    <h3 style="color:${statusColor}">
                        ${finance.status}
                    </h3>

                </div>

                `;

            });

        }


    }


    catch(error) {

        console.log(error);

        alert("Unable to load history.");

    }

}


loadHistory();
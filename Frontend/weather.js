function analyzeWeather() {

    const temperature =
        parseFloat(document.getElementById("temperature").value);

    const humidity =
        parseFloat(document.getElementById("humidity").value);

    const precipitation =
        parseFloat(document.getElementById("precipitation").value);

    const wind =
        document.getElementById("wind").value;


    // ================================
    // VALIDATION
    // ================================

    if (
        isNaN(temperature) ||
        isNaN(humidity) ||
        isNaN(precipitation) ||
        wind === ""
    ) {
        alert("Please enter all weather conditions.");
        return;
    }


    if (humidity < 0 || humidity > 100) {
        alert("Humidity must be between 0 and 100%.");
        return;
    }


    if (precipitation < 0 || precipitation > 100) {
        alert("Precipitation must be between 0 and 100%.");
        return;
    }


    // ================================
    // CROP WEATHER REQUIREMENTS
    // ================================

    const crops = {

        "🌾 Rice": {
            temp: [20, 35],
            humidity: [60, 100],
            precipitation: [40, 100]
        },

        "🌾 Wheat": {
            temp: [10, 25],
            humidity: [30, 70],
            precipitation: [10, 60]
        },

        "🌽 Maize": {
            temp: [18, 32],
            humidity: [40, 80],
            precipitation: [30, 70]
        },

        "🌿 Cotton": {
            temp: [21, 35],
            humidity: [40, 75],
            precipitation: [20, 60]
        },

        "🥔 Potato": {
            temp: [10, 25],
            humidity: [40, 70],
            precipitation: [20, 60]
        },

        "🌱 Sugarcane": {
            temp: [20, 35],
            humidity: [60, 90],
            precipitation: [40, 100]
        }

    };


    // ================================
    // CALCULATE SUITABILITY
    // ================================

    let results = [];


    for (const crop in crops) {

        const requirement = crops[crop];

        let score = 0;


        // Temperature

        if (
            temperature >= requirement.temp[0] &&
            temperature <= requirement.temp[1]
        ) {
            score += 25;
        }


        // Humidity

        if (
            humidity >= requirement.humidity[0] &&
            humidity <= requirement.humidity[1]
        ) {
            score += 25;
        }


        // Precipitation

        if (
            precipitation >= requirement.precipitation[0] &&
            precipitation <= requirement.precipitation[1]
        ) {
            score += 25;
        }


        // Wind

        if (wind === "Low") {

            score += 25;

        } else if (wind === "Moderate") {

            score += 20;

        } else if (wind === "High") {

            score += 10;

        }


        results.push({
            crop: crop,
            score: score
        });

    }


    // ================================
    // SORT BEST CROPS
    // ================================

    results.sort(function(a, b) {
        return b.score - a.score;
    });


    // Show top 3 crops

    const topCrops = results.slice(0, 3);


    // ================================
    // RESULT
    // ================================

    let resultHTML = `

        <div class="weather-result suitable">

            <h2>🌱 Crop Suitability Analysis</h2>

            <p>
                Based on the weather conditions entered,
                these are the most suitable crops:
            </p>

    `;


    topCrops.forEach(function(item, index) {

        let status = "";

        if (item.score >= 75) {

            status = "Highly Suitable";

        } else if (item.score >= 50) {

            status = "Moderately Suitable";

        } else {

            status = "Less Suitable";

        }


        resultHTML += `

            <div class="crop-item">

                <strong>
                    ${index + 1}. ${item.crop}
                </strong>

                <br>

                Suitability Score:
                ${item.score}%

                <br>

                <small>
                    ${status}
                </small>

            </div>

        `;

    });


    resultHTML += `

        </div>

    `;


    // ================================
    // WEATHER SUMMARY
    // ================================

    resultHTML += `

        <div class="weather-summary">

            <h3>🌦 Weather Conditions Entered</h3>

            <p>
                <strong>🌡 Temperature:</strong>
                ${temperature} °C
            </p>

            <p>
                <strong>💧 Humidity:</strong>
                ${humidity} %
            </p>

            <p>
                <strong>🌧 Precipitation:</strong>
                ${precipitation} %
            </p>

            <p>
                <strong>💨 Wind:</strong>
                ${wind}
            </p>

            <hr>

            <p class="weather-note">

                ℹ️ This feature analyzes the conditions
                entered by the farmer. It does not predict
                actual atmospheric weather.

            </p>

        </div>

    `;


    document.getElementById("weatherResult").innerHTML =
        resultHTML;

}
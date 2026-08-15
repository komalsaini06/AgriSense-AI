alert("script loaded");
document.getElementById("predictionForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
        farmer_name: document.getElementById("farmer_name").value,
        nitrogen: Number(document.getElementById("nitrogen").value),
        phosphorus: Number(document.getElementById("phosphorus").value),
        potassium: Number(document.getElementById("potassium").value),
        temperature: Number(document.getElementById("temperature").value),
        humidity: Number(document.getElementById("humidity").value),
        ph: Number(document.getElementById("ph").value),
        rainfall: Number(document.getElementById("rainfall").value)
    };

    try {
        const response = await fetch("https://agrisense-ai-fua5.onrender.com/prediction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        document.getElementById("result").innerHTML =
            `<h3>Recommended Crop: ${result.predicted_crop}</h3>`;

    } catch (error) {
        console.error(error);
        document.getElementById("result").innerHTML =
            "<h3>Something went wrong!</h3>";
    }
});

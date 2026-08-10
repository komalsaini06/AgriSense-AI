async function loadSchemes() {

    try {

        const response = await fetch("http://127.0.0.1:8000/schemes");

        const schemes = await response.json();

        let html = "";

        schemes.forEach(function(scheme) {

            html += `

            <div class="parcel" style="margin-bottom:20px;">

                <h2>🏛 ${scheme.scheme_name}</h2>

                <p><strong>Benefit:</strong> ${scheme.benefit}</p>

                <p><strong>Eligibility:</strong> ${scheme.eligibility}</p>

                <p><strong>Documents:</strong> ${scheme.documents}</p>

                <p>
                    <a href="${scheme.official_link}" target="_blank">
                        Visit Official Website
                    </a>
                </p>

            </div>

            `;

        });

        document.getElementById("schemeList").innerHTML = html;

    }

    catch (error) {

        console.log(error);

        alert("Unable to load government schemes.");

    }

}
const apiKey = "patNfcLptJfVOCBf1.072dca7f45b4dee255eaa96f1653018f549768c2298cdcd60a330567c5ef0a1b";  // Replace with your actual API key
const baseId = "appQisc0Nphkb1rii";  // Replace with your base ID from Airtable API documentation
const tableName = "Ratings";    // Name of the table in Airtable

document.getElementById("ratingForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Capture names and convert form values to numbers
    const raterName = document.querySelector("select[name='raterName']").value;  // Rater's name
    const ratedName = document.querySelector("select[name='ratedName']").value;  // Rated player's name
    const pace = Number(document.querySelector("input[name='pace']").value);
    const shooting = Number(document.querySelector("input[name='shooting']").value);
    const passing = Number(document.querySelector("input[name='passing']").value);
    const dribbling = Number(document.querySelector("input[name='dribbling']").value);
    const defense = Number(document.querySelector("input[name='defense']").value);
    const physical = Number(document.querySelector("input[name='physical']").value);
    const overallRating = Number(document.querySelector("input[name='overallRating']").value);  // Overall Rating

    // Define the data structure with rater and rated player names
    const data = {
        records: [
            {
                fields: { 
                    raterName, 
                    ratedName, 
                    pace, 
                    shooting, 
                    passing, 
                    dribbling, 
                    defense, 
                    physical,
                    overallRating // Directly send the overall rating without calculation
                }
            }
        ]
    };

    // Send the request to Airtable
    fetch(`https://api.airtable.com/v0/${baseId}/${tableName}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
        alert("Rating submitted successfully!");
        document.getElementById("ratingForm").reset();
    })
    .catch(error => {
        console.error("Error:", error);
        alert("There was an error submitting the rating.");
    });
});

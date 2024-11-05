document.getElementById("ratingForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Get form values
    const pace = document.querySelector("input[name='pace']").value;
    const shooting = document.querySelector("input[name='shooting']").value;
    const passing = document.querySelector("input[name='passing']").value;
    const dribbling = document.querySelector("input[name='dribbling']").value;
    const defense = document.querySelector("input[name='defense']").value;
    const physical = document.querySelector("input[name='physical']").value;

    // Airtable API details
    const apiKey = "patNfcLptJfVOCBf1.072dca7f45b4dee255eaa96f1653018f549768c2298cdcd60a330567c5ef0a1b";  // Replace with your actual API key
    const baseId = "appQisc0Nphkb1rii";  // Replace with your base ID from Airtable API documentation
    const tableName = "ratings";    // Name of the table in Airtable

    // Prepare API request to Airtable
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;
    const data = {
        records: [
            {
                fields: { pace, shooting, passing, dribbling, defense, physical }
            }
        ]
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            document.getElementById("responseMessage").textContent = "Rating submitted successfully!";
            document.getElementById("ratingForm").reset();
        } else {
            document.getElementById("responseMessage").textContent = "Failed to submit rating.";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("responseMessage").textContent = "An error occurred.";
    }
});

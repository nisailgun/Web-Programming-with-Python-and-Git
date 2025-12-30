document.getElementById("analyzeBtn").addEventListener("click", () => {
    const text = document.getElementById("textInput").value;

    fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: text })
    })
    .then(async response => {
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error("Server error: " + errorText);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("result").innerText =
            `Sentiment: ${data.sentiment} (confidence: ${data.confidence})`;
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("result").innerText = "An error occurred.";
    });
});

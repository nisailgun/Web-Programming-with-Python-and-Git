document.getElementById("analyzeBtn").addEventListener("click", () => {
    const text = document.getElementById("textInput").value;

    fetch("/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: text })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("result").innerText = data.sentiment;
    })
    .catch(error => {
        console.error("Error:", error);
    });
});

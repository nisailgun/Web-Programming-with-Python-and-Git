document.getElementById("analyzeBtn").addEventListener("click", async () => {
  const text = document.getElementById("textInput").value.trim();

  // reset UI state
  document.body.classList.remove("positive", "negative");

  if (!text) {
    document.getElementById("result").innerText = "-";
    return;
  }

  try {
    const response = await fetch("/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const data = await response.json();

    // show label
    const sentiment = (data.sentiment || "").toString().toUpperCase();
    document.getElementById("result").innerText = sentiment || "-";

    // apply theme classes (for GIF + colors)
    if (sentiment.includes("POS")) {
      document.body.classList.add("positive");
    } else if (sentiment.includes("NEG")) {
      document.body.classList.add("negative");
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("result").innerText = "ERROR";
  }
});

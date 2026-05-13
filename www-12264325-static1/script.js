document.getElementById("dataForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;

    const data = {
        fullName: form.fullName.value,
        email: form.email.value,
        message: form.message.value
    };

    try {
        const response = await fetch(
            "https://uniweb.ayden-williams.workers.dev/www-12264325-static1/submit",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        const result = await response.text();

        document.getElementById("responseMessage").innerText = result;

        form.reset();

    } catch (error) {
        document.getElementById("responseMessage").innerText =
            "Submission failed.";
    }
});

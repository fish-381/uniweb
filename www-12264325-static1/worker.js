export default {
    async fetch(request) {

        const url = new URL(request.url);

        // Handle POST requests
        if (
            request.method === "POST" &&
            url.pathname === "/www-12264325-static1/submit"
        ) {

            try {

                const data = await request.json();

                console.log("Form Submission:", data);

                // Example response
                return new Response(
                    `Thank you ${data.fullName}, your form was submitted.`,
                    {
                        status: 200,
                        headers: {
                            "Content-Type": "text/plain",
                            "Access-Control-Allow-Origin": "*"
                        }
                    }
                );

            } catch (err) {

                return new Response("Invalid form data", {
                    status: 400
                });

            }
        }

        return new Response("Not Found", {
            status: 404
        });
    }
};

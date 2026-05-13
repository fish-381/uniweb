addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method === 'POST') {
    try {
      const formData = await request.json();
      const { fullName, email, message } = formData;

      return new Response(
        JSON.stringify({
          message: 'Form submitted successfully!',
          data: { fullName, email, message },
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    } catch (error) {
      return new Response('Invalid form data', { status: 400 });
    }
  }

  return new Response('Not Found', { status: 404 });
}
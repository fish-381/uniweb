addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

async function handleRequest(request) {
  const url = new URL(request.url);

  // Check if the request is for the correct route
  if (url.pathname === '/www-12264325-static1/submit') {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

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
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        );
      } catch (error) {
        return new Response('Invalid form data', { status: 400, headers: corsHeaders });
      }
    }

    return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
  }

  return new Response('Not Found', { status: 404, headers: corsHeaders });
}

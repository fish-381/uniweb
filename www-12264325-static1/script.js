document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript is working!');
    
    const form = document.getElementById('dataForm');
    const responseMessage = document.getElementById('responseMessage');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        try {
            const response = await fetch('/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                responseMessage.classList.remove('error');
                responseMessage.classList.add('success');
                responseMessage.innerHTML = `
                    <h3>Thank you! Your submission was received:</h3>
                    <p><strong>Name:</strong> ${result.fullName}</p>
                    <p><strong>Email:</strong> ${result.email}</p>
                    <p><strong>Message:</strong> ${result.message}</p>
                `;
                form.reset();
            } else {
                throw new Error('Server responded with status ' + response.status);
            }
        } catch (error) {
            responseMessage.classList.remove('success');
            responseMessage.classList.add('error');
            responseMessage.innerHTML = `<p>Error submitting form: ${error.message}</p>`;
        }
    });
});

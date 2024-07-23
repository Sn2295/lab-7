// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
    // Get the form element
    const form = document.querySelector('form');

    // Add an event listener to handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect form data
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Send the data to the server using fetch
        fetch(form.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(data).toString()
        })
        .then(response => response.text())
        .then(responseText => {
            // Display the server response
            const responseContainer = document.createElement('div');
            responseContainer.innerHTML = responseText;
            document.body.appendChild(responseContainer);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

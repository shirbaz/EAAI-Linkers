// script.js
document.getElementById('userInfoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var formData = new FormData(this);
    var profileDescription = formData.get('profileDescription');
    var wordCount = profileDescription.trim().split(/\s+/).length;

    if (wordCount > 300) {
        alert("Profile description must not exceed 300 words.");
    } else {
        fetch('/create_profile', {
            method: 'POST',
            body: new URLSearchParams([...formData]) // Encode form elements for POST
        }).then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Network response was not ok.');
            }
        }).then(() => {
            window.location.href = '/'; // Redirect to the landing page on success
        }).catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    }
});

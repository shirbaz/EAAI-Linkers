document.getElementById('projectForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var formData = new FormData(this);
    fetch('/create_project', {
        method: 'POST',
        body: new URLSearchParams([...formData])
    }).then(response => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error('Network response was not ok.');
        }
    }).then(() => {
        window.location.href = '/view_projects.html';
    }).catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
});

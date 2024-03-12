fetch('/matches')
    .then(response => response.json())
    .then(matches => {
        const matchesList = document.getElementById('matches-list');
        matches.forEach(match => {
            const matchElement = document.createElement('div');
            matchElement.innerHTML = `
                <h2>${match.profileName} - ${match.projectName}</h2>
                <!-- Add additional match details here -->
            `;
            matchesList.appendChild(matchElement);
        });
    })
    .catch(error => console.error('Error fetching matches:', error));

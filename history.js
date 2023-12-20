function loadHistoryData() {
    fetch('history.json')
        .then(response => response.json())
        .then(data => displayHistoryData(data))
        .catch(error => console.error('Error loading history data:', error));
}

function displayHistoryData(historyData) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = ''; // Clear existing content
    gallery.style.display = 'flex'; // Use flexbox to manage the layout
    gallery.style.flexDirection = 'column'; // Stack children elements in a column

    historyData.forEach(group => {
        group.activities.forEach(activity => {
            const row = document.createElement('div');
            row.classList.add('history-row'); // Use this class to style the row
            row.style.display = 'flex';
            row.style.justifyContent = 'space-between';
            row.style.marginBottom = '10px';

            // Image container
            const imageContainer = document.createElement('div');
            const img = document.createElement('img');
            img.src = activity.token.contentURI;
            img.alt = activity.token.meta.name;
            imageContainer.appendChild(img);

            // Name container
            const nameContainer = document.createElement('div');
            nameContainer.textContent = activity.token.meta.name;

            // Price container
            const priceContainer = document.createElement('div');
            priceContainer.textContent = activity.listedPrice ? `${activity.listedPrice} BTC` : 'N/A';

            // Date container
            const dateContainer = document.createElement('div');
            dateContainer.textContent = new Date(activity.createdAt).toLocaleString();

            // Append all containers to the row
            row.appendChild(imageContainer);
            row.appendChild(nameContainer);
            row.appendChild(priceContainer);
            row.appendChild(dateContainer);

            // Append row to the gallery
            gallery.appendChild(row);
        });
    });
}

// This function can be called when the history button is clicked
document.getElementById('history-btn').addEventListener('click', loadHistoryData);


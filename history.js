function loadHistoryData() {
    fetch('history.json')
        .then(response => response.json())
        .then(data => displayHistoryData(data))
        .catch(error => console.error('Error loading history data:', error));
}

function displayHistoryData(historyData) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = ''; // Clear existing content
    gallery.style.display = 'grid';
    gallery.style.gridTemplateColumns = '1fr 2fr 1fr 1fr'; // Set grid columns

    historyData.forEach(item => {
        item.activities.forEach(activity => {
            const row = document.createElement('div');
            row.classList.add('gallery-item');
            row.classList.add('show'); // Ensure it is visible
            row.style.display = 'grid';
            row.style.gridTemplateColumns = '1fr 2fr 1fr 1fr';
            row.style.gap = '10px';
            row.style.marginBottom = '10px';

            // Image column
            const imageContainer = document.createElement('div');
            const img = document.createElement('img');
            img.src = activity.token.contentURI;
            img.alt = activity.token.meta.name;
            imageContainer.appendChild(img);
            row.appendChild(imageContainer);

            // Name column
            const nameDiv = document.createElement('div');
            nameDiv.textContent = activity.token.meta.name;
            row.appendChild(nameDiv);

            // Listed Price column
            const priceDiv = document.createElement('div');
            priceDiv.textContent = activity.listedPrice ? `${activity.listedPrice} BTC` : 'N/A';
            row.appendChild(priceDiv);

            // Created At column
            const dateDiv = document.createElement('div');
            dateDiv.textContent = new Date(activity.createdAt).toLocaleString();
            row.appendChild(dateDiv);

            // Append row to the gallery
            gallery.appendChild(row);
        });
    });
}

// This function can be called when the history button is clicked
document.getElementById('history-btn').addEventListener('click', loadHistoryData);


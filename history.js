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
    gallery.style.gridTemplateColumns = '1fr'; // Set to single column

    historyData.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('gallery-item');
        itemDiv.classList.add('show'); // Ensure it is visible

        // Add content to itemDiv based on item properties
        // Example: itemDiv.textContent = item.someProperty;

        gallery.appendChild(itemDiv);
    });
}

// This function can be called when the history button is clicked
document.getElementById('history-btn').addEventListener('click', loadHistoryData);

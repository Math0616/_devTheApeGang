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

    const allActivities = historyData.flatMap(group => group.activities);
    allActivities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    allActivities.forEach(activity => {
        const row = document.createElement('div');
        row.classList.add('history-row');
        row.style.display = 'flex';
        row.style.justifyContent = 'space-between';
        row.style.marginBottom = '10px';

        // Create the anchor element for the image
        const imageLink = document.createElement('a');
        // Use the tokenId to create the URL
        imageLink.href = `https://magiceden.io/ordinals/item-details/${activity.tokenId}`;
        imageLink.target = "_blank"; // Ensure the link opens in a new tab

        // Image container
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        const img = document.createElement('img');
        img.src = activity.token.contentURI;
        img.alt = activity.token.meta.name || `Inscription #${activity.token.inscriptionNumber}`;
        imageContainer.appendChild(img);

        // Append the image container to the link
        imageLink.appendChild(imageContainer);

        // Name container, use 'Inscription #' if the name is not available
        const nameContainer = document.createElement('div');
        nameContainer.textContent = activity.token.meta.name || `Inscription #${activity.token.inscriptionNumber}`;

        // Format the price from satoshis to bitcoins and remove trailing zeros
        const priceInBTC = activity.listedPrice ? (parseInt(activity.listedPrice) / 100000000).toString() : 'N/A';
        // Use regex to remove trailing zeros after decimal
        const formattedPrice = priceInBTC !== 'N/A' ? parseFloat(priceInBTC).toFixed(8).replace(/(\.\d*?[1-9])0+$/, "$1").replace(/\.0+$/, "") : 'N/A';

        // Price container
        const priceContainer = document.createElement('div');
        priceContainer.textContent = `${formattedPrice} BTC`;

        // Date container
        const dateContainer = document.createElement('div');
        dateContainer.textContent = new Date(activity.createdAt).toLocaleString();

        // Append the link (which contains the image) and other containers to the row
        row.appendChild(imageLink); // Now appending the link instead of the imageContainer directly
        row.appendChild(nameContainer);
        row.appendChild(priceContainer);
        row.appendChild(dateContainer);

        // Append row to the gallery
        gallery.appendChild(row);
    });
}


// This function can be called when the history button is clicked
document.getElementById('history-btn').addEventListener('click', loadHistoryData);

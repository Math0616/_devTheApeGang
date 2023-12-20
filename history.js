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

        // Create the anchor element for the image and set its properties
        const imageLink = document.createElement('a');
        imageLink.href = `https://magiceden.io/ordinals/item-details/${activity.tokenId}`;
        imageLink.target = "_blank";

        // Create the image and set its properties
        const img = document.createElement('img');
        img.src = activity.token.contentURI;
        img.alt = activity.token.meta.name || `Inscription #${activity.token.inscriptionNumber}`;
        img.classList.add('history-image'); // Add a class for styling if needed

        // Append the image to the link
        imageLink.appendChild(img);

        // Image container
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        
        // Append the link (which contains the image) to the image container
        imageContainer.appendChild(imageLink);

        // Name container, use 'Inscription #' if the name is not available
        const nameContainer = document.createElement('div');
        nameContainer.textContent = activity.token.meta.name || `Inscription #${activity.token.inscriptionNumber}`;

        // Format the price from satoshis to bitcoins and remove trailing zeros
        let formattedPrice = 'N/A';
        if (activity.listedPrice) {
            const priceInBTC = parseInt(activity.listedPrice) / 100000000;
            formattedPrice = parseFloat(priceInBTC.toFixed(8)).toString().replace(/\.?0+$/, "");
        }

        // Price container
        const priceContainer = document.createElement('div');
        priceContainer.textContent = `${formattedPrice} BTC`;

        // Date container
        const dateContainer = document.createElement('div');
        dateContainer.textContent = new Date(activity.createdAt).toLocaleString();

        // Append the image container and other containers to the row
        row.appendChild(imageContainer);
        row.appendChild(nameContainer);
        row.appendChild(priceContainer);
        row.appendChild(dateContainer);

        // Append row to the gallery
        gallery.appendChild(row);
    });
}

// This function can be called when the history button is clicked
document.getElementById('history-btn').addEventListener('click', loadHistoryData);

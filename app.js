const apiUrl = 'https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json';

let data = [];
let currentPage = 1;
let pageSize = 20;

// Fetch Data from API
function fetchData() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(apiData => {
            data = apiData; // Store the data globally
            displayPage(currentPage); // Display the first page of data
            createPaginationControls();
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Display Data for the Current Page
function displayPage(page) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = pageSize === 'all' ? data.length : startIndex + parseInt(pageSize);
    const paginatedData = data.slice(startIndex, endIndex);

    const tableBody = document.getElementById('data-table-body');
    tableBody.innerHTML = '';

    paginatedData.forEach(item => {
        const row = `<tr>
            <td><img src="${item.images.xs}" alt="Icon"></td>
            <td>${item.name}</td>
            <td>${item.biography.fullName || '-'}</td>
            <td>${formatPowerstats(item.powerstats)}</td>
            <td>${item.appearance.race || 'N/A'}</td>
            <td>${item.appearance.gender || 'N/A'}</td>
            <td>${item.appearance.height[0] || 'N/A'}</td>
            <td>${item.appearance.weight[1] || 'N/A'}</td>
            <td>${item.biography.placeOfBirth || 'N/A'}</td>
            <td>${item.biography.alignment || 'N/A'}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Format Powerstats
function formatPowerstats(powerstats) {
    return Object.entries(powerstats).map(([key, value]) => `${key}: ${value}\n`).join(', ');
}

// Create Pagination Controls
function createPaginationControls() {
    const paginationControls = document.getElementById('pagination-controls');
    paginationControls.innerHTML = '';

    const totalPages = Math.ceil(data.length / pageSize);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => {
            currentPage = i;
            displayPage(currentPage);
        });
        paginationControls.appendChild(button);
    }
}

// Handle Page Size Change
document.getElementById('page-size').addEventListener('change', (e) => {
    pageSize = e.target.value === 'all' ? data.length : parseInt(e.target.value);
    currentPage = 1; // Reset to first page
    displayPage(currentPage);
    createPaginationControls();
});

// Fetch and display data when page loads
fetchData();

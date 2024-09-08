let data = [];
let currentPage = 1;
let pageSize = 20;
let currentSortColumn = 'name'; // Set initial sort column to 'name'
let isAscending = true; // Set initial sort order to ascending

// Fetch Data from API
function fetchData() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(apiData => {
            data = apiData; // Store the data globally
            isAscending = false; // Set initial sort order to descending
            sortData('name', false); // Sort the data initially by name in descending order
            displayPage(currentPage); // Display the first page of data
            createPaginationControls();
            addSortListeners();
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
            <td>${item.biography.fullName || 'N/A'}</td>
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

    updateSortIndicators();
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

        if (i === currentPage) {
            button.style.backgroundColor = '#8B0000'; // Dark red background for the current page
            button.style.color = '#fff'; // White text for the current page
        }

        button.addEventListener('click', () => {
            currentPage = i;
            displayPage(currentPage);
            createPaginationControls();
        });
        paginationControls.appendChild(button);
    }
}


function sortData(column, ascending = true) {
    if (column === currentSortColumn) {
        isAscending = !isAscending; // Toggle sort order
    } else {
        isAscending = ascending; // Reset to ascending order if a new column is sorted
        currentSortColumn = column; // Update current sort column
    }

    data.sort((a, b) => {
        let valueA = getNestedProperty(a, column);
        let valueB = getNestedProperty(b, column);

        // Handle missing values
        const isValueAMissing = valueA === null || valueA === undefined || valueA === 'N/A' || valueA === '-' || valueA === '';
        const isValueBMissing = valueB === null || valueB === undefined || valueB === 'N/A' || valueB === '-' || valueB === '';

        if (isValueAMissing && isValueBMissing) return 0; // Both are missing, keep original order
        if (isValueAMissing) return isAscending ? 1 : -1; // 'N/A', '-', or empty is always last
        if (isValueBMissing) return isAscending ? -1 : 1; // 'N/A', '-', or empty is always last
        if (column === 'biography.fullName') {
            const isValueAEmpty = !valueA || valueA.trim() === '';
            const isValueBEmpty = !valueB || valueB.trim() === '';
            if (isValueAEmpty && isValueBEmpty) return 0;
            if (isValueAEmpty) return isAscending ? 1 : -1;
            if (isValueBEmpty) return isAscending ? -1 : 1;
            valueA = valueA.trim().toLowerCase();
            valueB = valueB.trim().toLowerCase();
            return isAscending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        }

        // Handle numerical values for weight and height
        if (column === 'appearance.weight') {
            valueA = parseFloat(valueA[1].toLowerCase().replace(' kg', '').replace(' tons', '000').split(' ')[0]);
            valueB = parseFloat(valueB[1].toLowerCase().replace(' kg', '').replace(' tons', '000').split(' ')[0]);
        } else if (column === 'appearance.height') {
            valueA = parseFloat(valueA[0].split(' ')[0]);
            valueB = parseFloat(valueB[0].split(' ')[0]);
        } else {
            // Trim spaces for full name, place of birth, and alignment sorting
            if (column === 'biography.placeOfBirth' || column === 'biography.alignment') {
                valueA = valueA.trim();
                valueB = valueB.trim();
            }
        }

        // Compare values
        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return isAscending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        }

        if (valueA < valueB) return isAscending ? -1 : 1;
        if (valueA > valueB) return isAscending ? 1 : -1;
        return 0;
    });

    displayPage(currentPage);
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

# sortable

## Introduction

Welcome to Villain's Kill List, a web application designed to help you, the villain, organize confidential information about those annoying superheroes. You now have the power to sort, search, and view detailed profiles of these so-called "heroes" with a user-friendly interface. Your mission is to quickly navigate the data and make informed decisions on who’s next on your list.
Project Overview

This project is a single-page web application that fetches superhero data from a remote API, displays it in a table, and allows for sorting, filtering, and pagination. The interface is built from scratch without relying on any external JavaScript libraries or frameworks.
Features
1. Data Fetching

The superhero data is fetched from the Superhero API using the fetch() method in JavaScript. The data is processed and displayed on the page, showcasing vital information about each superhero.
2. Displaying Superhero Data

The data is shown in a responsive table, with the following fields:

- Icon: A small image representing the hero.
- Name: The superhero's name.
- Full Name: The superhero's full civilian name.
- Powerstats: Stats such as intelligence, strength, and speed.
- Race: The superhero's race.
- Gender: Gender of the superhero.
- Height: Height (in cm and feet).
- Weight: Weight (in kg and pounds).
- Place Of Birth: Where the superhero was born.
- Alignment: Hero's moral alignment (e.g., good, bad, neutral).

3. Pagination

You can control the number of results displayed per page by selecting a page size (10, 20, 50, 100, or all) from a dropdown menu. The default page size is 20.
4. Search

The application provides a search bar for filtering superheroes by name. The search is dynamic and updates the table with each keystroke. For example, typing "man" will filter all superheroes whose name contains "man."
5. Sorting

The table is sortable by any of its columns. You can sort data alphabetically or numerically by clicking on the column headers:

- The first click sorts the column in ascending order.
- The second click sorts it in descending order.
- Consecutive clicks toggle between ascending and descending.

Special handling is applied to columns like weight and height, where the values represent numeric data stored as strings (e.g., "100 kg" or "6 feet"). Missing values are always sorted last.
6. Detail View

Clicking on a superhero's icon will open a modal with a larger image and more detailed information about that superhero.
7. Responsive Design

The layout is responsive and adapts to various screen sizes. The table and images are styled to maintain readability on both desktop and mobile devices.
8. Custom Styling

The user interface is themed with a villainous dark mode featuring:

- A dark background with contrasting red and white elements.
- Stylish buttons and pagination controls.
- Intuitive table layouts that ensure all important information is clearly presented.

### Installation

1. Clone the repository to your local machine:
    ```bash
    git clone https://learn.zone01kisumu.ke/git/hokwach/sortable.git
    ```
2.  Open the index.html file in any modern web browser.

3. No external dependencies are needed—everything is written in vanilla HTML, CSS, and JavaScript.

## Usage
### Running the App

- Open the Application: Navigate to the location of the index.html file and open it in your browser.
- View Superhero Data: Upon loading, the data will be fetched and displayed.
- Search: Use the search bar to find specific superheroes by name.
- Sort: Click on any table header to sort the data by that column.
- Pagination: Use the page size dropdown to select how many heroes are displayed per page. Navigate between pages using the pagination buttons.
- Detail View: Click on a hero's icon to open a detailed view modal with a larger image.
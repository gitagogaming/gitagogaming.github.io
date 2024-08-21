
 // Function to sort the table by column index
function sortTable(columnIndex, type) {
    const table = document.querySelector(".sortable");
    const rows = Array.from(table.querySelectorAll("tbody tr"));

    let sortOrder = 1;
    if (table.dataset.sortedColumnIndex === columnIndex.toString()) {
      // If the same column is clicked again, toggle the sorting order
      sortOrder = -1 * table.dataset.sortedOrder;
    }

    table.dataset.sortedColumnIndex = columnIndex.toString();
    table.dataset.sortedOrder = sortOrder;

    rows.sort((a, b) => {
      const cellA = a.cells[columnIndex].innerText;
      const cellB = b.cells[columnIndex].innerText;

      if (type === 'number') {
        return sortOrder * (parseInt(cellA) - parseInt(cellB)); // Treat "ID" column as numbers
      } else {
        return sortOrder * cellA.localeCompare(cellB);
      }
    });

    // Clear the current table body
    const tbody = table.querySelector("tbody");
    tbody.innerHTML = "";

    // Append the sorted rows to the table body
    rows.forEach((row) => {
      tbody.appendChild(row);
    });
}

  

// Function to format date in a more readable format
function formatDate(data) {
  // Loop through the data and format the "date" property
  data.forEach((project) => {
    // Get the original date string from the "date" property
    const originalDate = project.date;

    // Create a new Date object from the original date string
    const dateObject = new Date(originalDate);

    // Format the date to appear like normal date stamps (e.g., "YYYY-MM-DD")
    const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dateObject.getDate().toString().padStart(2, "0")}`;

    // Update the "date" property in the project object with the formatted date
    project.date = formattedDate;
  });
  return data;
}


// OLD - DONT SEE IT USED ANYMORE
 // Function to fetch and display development portfolio projects (Table/List view)
// function fetchDevelopmentProjects_Table(data) {
//    fetch("production_portfolio_table.json")
//      .then((response) => response.json())
//      .then((data) => {
//        const formatteddata = formatDate(data);
//        const portfolioRow = document.getElementById("portfolioRow");
//        portfolioRow.innerHTML = "";//

//        const table = document.createElement("table");
//        table.classList.add("table");
//        table.classList.add("sortable"); // Add the sortable class to enable sorting//

//        // Create table header
//        const tableHeader = `
//          <thead>
//            <tr>
//              <th scope="col" onclick="sortTable(0, 'number')">Date</th>
//              <th scope="col" onclick="sortTable(1, 'text')">Event Name</th>
//              <th scope="col" onclick="sortTable(2, 'text')">Game</th>
//              <th scope="col" onclick="sortTable(2, 'text')">Description</th>
//              <th scope="col" onclick="sortTable(3, 'text')">Organizer</th>
//            </tr>
//          </thead>
//        `;//

//        table.innerHTML = tableHeader;//

//        // Create table rows
//        data.forEach((project) => {
//          const tableRow = `
//            <tr>
//              <td style="white-space: nowrap; overflow: hidden;">${project.date ? project.date : ''}</td> <!-- Use the ternary operator to handle empty date -->
//              <td>${project.eventName ? project.eventName : ''}</td> <!-- Use the ternary operator to handle empty event name -->
//              <td>${project.game ? project.game : ''}</td> <!-- Use the ternary operator to handle empty game -->
//              <td>${project.detailsNotes ? project.detailsNotes : ''}</td> <!-- Use the ternary operator to handle empty notes -->
//              <td>${project.organizer}</td>
//            </tr>
//          `;
//          table.innerHTML += tableRow;
//          portfolioRow.appendChild(table);
//        });
//      })
//      .catch((error) => console.error("Error fetching JSON:", error));
//  }//
//

//        function displayPage(page) {
//            // Calculate the start and end index of the items to display on the current page
//            const startIndex = (page - 1) * itemsPerPage;
//            const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
//        
//            // Clear previous content
//            const portfolioRow = document.getElementById("portfolioRow");
//            portfolioRow.innerHTML = "";
//        
//            // Create project cards and append them to the portfolio row
//            for (let i = startIndex; i < endIndex; i++) {
//              const project = data[i];
//              const projectCard = createProjectCard(project);
//              portfolioRow.appendChild(projectCard);
//            }
//        }
//  
//        // Create pagination buttons dynamically
//        const paginationContainer = document.getElementById("paginationContainer-top");
//        const paginationContainerbottom = document.getElementById("paginationContainer-bottom");
//        paginationContainer.innerHTML = ""; // Clear previous buttons
//        paginationContainerbottom.innerHTML = ""; // Clear previous buttons
//  
//        if (totalPages > 1) {
//            for (let i = 1; i <= totalPages; i++) {
//            const button = document.createElement("button");
//            button.classList.add("pagination-button");
//            button.dataset.page = i;
//            button.textContent = i;
//            // check if its more than 1 page then append
//            paginationContainer.appendChild(button);
//            paginationContainerbottom.appendChild(button.cloneNode(true));
//            }
//            }
//  
//        if (totalPages > 1){
//            // Add event listeners to pagination buttons
//            const paginationButtons = document.querySelectorAll(".pagination-button");
//            
//            // Add "active" class to the first button
//            paginationButtons[0].classList.add("active");
//            
//            paginationButtons.forEach(button => {
//            button.addEventListener("click", () => {
//            // Remove "active" class from all buttons
//            paginationButtons.forEach((btn) => btn.classList.remove("active"));
//            // Add "active" class to the clicked button
//            button.classList.add("active");
//            
//            const page = parseInt(button.dataset.page);
//            displayPage(page);
//      });
//      });
//    }

    // PRODUCTION
  function fetchDevelopmentProjects() {
    fetch("production_portfolio.json")
      .then((response) => response.json())
      .then((data) => {
        const itemsPerPage = 8; // Number of items to show per page
        const totalItems = data.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
  
        // Function to create the project card element
        function createProjectCard(project) {
            const projectCard = document.createElement("div");
            projectCard.className = "col-lg-4 mt-4 portfolioCard"; // Adjust the class name and column size as needed
          
            // Add the data-link attribute with the project URL
            projectCard.dataset.link = project.URL;
          
            // Set the innerHTML content for the project card
            projectCard.innerHTML = `
              <div class="card portfolioContent">
                <img class="card-img-top" src="${project.Image}" alt="Card image" style="width:100%">
                <div class="card-body">
                  <h4 class="card-title">${project.Title}</h4>
                  <h6 class="card-subtitle mb-2 text-muted">${project.Organizer}</h6>
                  <p class="card-text">${project.Description}</p>
                </div>
              </div>
            `;
          
            return projectCard;
          }
          
  
           // Function to display the items for the specified page
        function displayPage(page) {
            // Calculate the start and end index of the items to display on the current page
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
        
            // Clear previous content
            const portfolioRow = document.getElementById("portfolioRow");
            portfolioRow.innerHTML = "";
        
            // Create project cards and append them to the portfolio row
            for (let i = startIndex; i < endIndex; i++) {
              const project = data[i];
              const projectCard = createProjectCard(project);
              portfolioRow.appendChild(projectCard);
            }
        }
  
        // Create pagination buttons dynamically
        const paginationContainer = document.getElementById("paginationContainer-top");
        const paginationContainerbottom = document.getElementById("paginationContainer-bottom");
        paginationContainer.innerHTML = ""; // Clear previous buttons
        paginationContainerbottom.innerHTML = ""; // Clear previous buttons
  
        if (totalPages > 1) {
            for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button");
            button.classList.add("pagination-button");
            button.dataset.page = i;
            button.textContent = i;
            // check if its more than 1 page then append
          // Add a unique identifier to the cloned button
        const clonedButton = button.cloneNode(true);
        clonedButton.id = `pagination-button-bottom`;

        // Append the original and cloned buttons to their respective containers
        paginationContainer.appendChild(button);
        paginationContainerbottom.appendChild(clonedButton);
            }
            }
  
        if (totalPages > 1){
            // Add event listeners to pagination buttons
            const paginationButtons = document.querySelectorAll(".pagination-button");
            
            // Add "active" class to the first button
            paginationButtons[0].classList.add("active");
            
            paginationButtons.forEach(button => {
            button.addEventListener("click", () => {
            // Remove "active" class from all buttons
            paginationButtons.forEach((btn) => btn.classList.remove("active"));
            // Add "active" class to the clicked button
            button.classList.add("active");
            
            const page = parseInt(button.dataset.page);
            displayPage(page);
      });
      });
    }
      // Show the first page by default
      displayPage(1);
      })
      .catch((error) => console.error("Error fetching JSON:", error));
  }
  













// Functiont to Display Page for the Portfolio
  function displayPage(page, itemsPerPage, totalItems, data) {
    // Calculate the start and end index of the items to display on the current page
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    // Clear previous content
    const portfolioRow = document.getElementById("portfolioRow");
    portfolioRow.innerHTML = "";

    // Create project cards and append them to the portfolio row
    for (let i = startIndex; i < endIndex; i++) {
      const project = data[i];
      const projectCard = createProjectCard(project);
      portfolioRow.appendChild(projectCard);
    }
  }


// Function to create the project card element
function createProjectCard(project) {
          const projectCard = document.createElement("div");
          projectCard.className = "col-lg-3 mt-4 portfolioCard"; // Add a common class name
  
          // Add the data-link attribute with the project URL
          projectCard.dataset.link = project.URL;
  
          // Set the innerHTML content for the project card
          projectCard.innerHTML = `
            <div class="card portfolioContent">
              <img class="card-img-top" src="images/plugins/${project.Name}.jpg" alt="Card image" style="width:100%">
              <div class="card-body">
                <h4 class="card-title">${project.Name}</h4>
                <p class="card-text">${project.Description}</p>
                <div class="text-center">
                  <a href="${project.URL}" class="btn btn-primary projecturl">Link</a>
                </div>
              </div>
            </div>
          `;
  
          return projectCard;
        }

// Function to fetch and display portfolio projects
function fetchPortfolioProjects() {
    fetch("plugin_portfolio.json")
      .then((response) => response.json())
      .then((data) => {
        const itemsPerPage = 12; // Number of items to show per page
        const totalItems = data.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
  
        // Create pagination buttons dynamically
      const paginationContainer = document.getElementById("paginationContainer-top");
      const paginationContainerbottom = document.getElementById("paginationContainer-bottom");
      paginationContainer.innerHTML = ""; // Clear previous buttons
      paginationContainerbottom.innerHTML = ""; // Clear previous buttons
  
      for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.classList.add("pagination-button");
      button.dataset.page = i;
      button.textContent = i;
      paginationContainer.appendChild(button);
      paginationContainerbottom.appendChild(button.cloneNode(true));
      }
  
      // Add event listeners to pagination buttons
      const paginationButtons = document.querySelectorAll(".pagination-button");
      // Add "active" class to the first button
      paginationButtons[0].classList.add("active");
  
      paginationButtons.forEach(button => {
      button.addEventListener("click", () => {
      // Remove "active" class from all buttons
      paginationButtons.forEach((btn) => btn.classList.remove("active"));
      // Add "active" class to the clicked button
      button.classList.add("active");
      
          const page = parseInt(button.dataset.page);
          displayPage(page, itemsPerPage, totalItems, data);
      });
      });
        
      // Show the first page by default
      displayPage(1, itemsPerPage, totalItems, data);
      })
      .catch((error) => console.error("Error fetching JSON:", error));
  }
  






let countingStarted = false;

  // Function to count from 0 to a specified target
  function countTo(target, duration, element) {
    const start = 0;
    const increment = target / (duration / 10);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        current = target;
      }
      element.innerText = Math.round(current);
    }, 10);
  }

  // Function to handle scroll event and animate the counter section
  function handleScroll() {
    const counterSection = document.querySelector('.counter-trigger');
    const rect = counterSection.getBoundingClientRect();
    const halfWindowHeight = window.innerHeight / 2;

    if (rect.top <= halfWindowHeight && rect.bottom >= halfWindowHeight && !countingStarted) {
      const totalEvents = document.getElementById('total-events');
      const totalHours= document.getElementById('total-hours');
      const totalOrganizers = document.getElementById('total-organizers');
      const totalProjects = document.getElementById('total-projects');

      countTo(168, 2000, totalEvents);
      countTo(850, 2000, totalHours);
      countTo(11, 2000, totalOrganizers);
      countTo(26, 2000, totalProjects);

      // Set opacity to 1 and reset the position
      counterSection.style.opacity = 1;
      counterSection.style.transform = 'translateY(0)';

      countingStarted = true;
    }
  }

  window.addEventListener('scroll', handleScroll);
// Project List - Project Page
const projects = [
    {
      id: "1",
      title: "Data Visualization for Uber Customer Review",
      type: "Data Visualization",
      lang: "Tableau",
      status: "Completed",
      dateStart: "2024-11-01",
      dateEnd: "2024-12-10",
      image: "imgs/proj/uberproj.png",
      description:" This project involved creating a comprehensive data visualization dashboard using Tableau to analyze Uber customer reviews. The dashboard provides insights into customer satisfaction, trends, and areas for improvement based on the review data."
    },
    {
      id: "2",
      title: "Cardiovascular Disease Prediction - Using SVM",
      type: "Machine Learning",
      lang: "Python",
      status: "Completed",
      dateStart: "2023-10-12",
      dateEnd: "2023-11-15",
      image: "imgs/proj/svmproj.png",
      description: "This project focuses on predicting cardiovascular diseases using Support Vector Machine (SVM) algorithms. It involves data preprocessing, feature selection, and model training to achieve accurate predictions based on patient health data."
    },
    {
      id: "3",
      title: "String Replacement Program",
      type: "Data Structures",
      lang: "C",
      status: "Completed",
      dateStart: "2022-10-11",
      dateEnd: "2022-12-28",
      image: "imgs/proj/strrplcproj.png",
      description: "This project implements a string replacement program in C that allows users to replace specified substrings within a larger string. It demonstrates fundamental data structure concepts and string manipulation techniques."
    },
    {
      id: "4",
      title: "Polynomial Operations",
      type: "Data Structures",
      lang: "C",
      status: "Completed",
      dateStart: "2022-08-03",
      dateEnd: "2022-12-15",
      image: "imgs/proj/polyproj.png",
      description: "This project implements polynomial operations such as addition, subtraction, and multiplication using linked lists in C. It showcases the use of data structures to efficiently manage polynomial representations."
    },
    {
      id: "5",
      title: "Wine Quality Analysis",
      type: "Data Analysis",
      lang: "Python",
      status: "Completed",
      dateStart: "2023-08-14",
      dateEnd: "2023-09-28",
      image: "imgs/proj/wineproj.png",
      description: "This project involves analyzing wine quality data using Python. It includes data cleaning, exploratory data analysis, and visualization to understand the factors affecting wine quality."
    },
    {
      id: "6",
      title: "Co2 Forecasting & Sustainable Event Planning",
      type: "Machine Learning",
      lang: "Python",
      status: "Completed",
      dateStart: "2023-08-14",
      dateEnd: "2024-12-28",
      image: "imgs/proj/co2proj.png",
      description: "This project focuses on forecasting CO2 emissions and planning sustainable events. It utilizes Python for data analysis and modeling to predict emissions and suggest eco-friendly event planning strategies."
    },
    {
      id: "7",
      title: "Library Management System with OOP",
      type: "Data Structures",
      lang: "Python",
      status: "Completed",
      dateStart: "2024-11-01",
      dateEnd: "2024-12-10",
      image: "imgs/proj/libraryproj.png",
      description:" This project focused on developing a digital library management system designed to streamline book tracking, borrowing activity, and user management."
    },
  ];

  function displayProjects(filtered = projects) {
    const container = document.getElementById("project-list");
    container.innerHTML = "";

    filtered.forEach(project => {
      const div = document.createElement("div");
      div.className = "project-card";
      div.innerHTML = `
        <div class="project-img">
          <img src="${project.image}" alt="${project.title} thumbnail" />
          <span class="project-status">${project.status}</span>
        </div>
        <div class="project-info">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-lang">Lang: ${project.lang}</p>
          <p class="project-date">Date: ${project.dateStart} to ${project.dateEnd}</p>
          <p class="project-type">Type: ${project.type}</p>
        </div>
      `;
      div.addEventListener("click", () => openModal(project));
container.appendChild(div);

    });
  }

  function applyFilters() {
    const type = document.getElementById("type-select").value;
    const status = document.getElementById("status").value;
    const checkedLangs = Array.from(document.querySelectorAll('input[name="language"]:checked')).map(el => el.value);

    let filtered = projects;

    if (type !== "ALL") {
      filtered = filtered.filter(p => p.type === type);
    }

    if (checkedLangs.length > 0) {
      filtered = filtered.filter(p => checkedLangs.includes(p.lang));
    }

    if (status) {
      filtered = filtered.filter(p => p.status === status);
    }

    displayProjects(filtered);
  }

  function resetFilters() {
    document.getElementById("type-select").value = "ALL";
    document.getElementById("status").value = "";
    document.querySelectorAll('input[name="language"]').forEach(el => el.checked = false);
    displayProjects();
  }

  function sortProjects() {
    const sortValue = document.getElementById("sort-date").value;
    const type = document.getElementById("type-select").value;
    const status = document.getElementById("status").value;
    const checkedLangs = Array.from(document.querySelectorAll('input[name="language"]:checked')).map(el => el.value);
  
    let filtered = projects;
  
    if (type !== "ALL") {
      filtered = filtered.filter(p => p.type === type);
    }
  
    if (checkedLangs.length > 0) {
      filtered = filtered.filter(p => {
        if (checkedLangs.includes("Others")) {
          return !["Python", "JavaScript", "C"].includes(p.lang) || checkedLangs.includes(p.lang);
        }
        return checkedLangs.includes(p.lang);
      });
    }
  
    if (status) {
      filtered = filtered.filter(p => p.status === status);
    }
  
    filtered.sort((a, b) => {
      return sortValue === "latest"
        ? new Date(b.dateStart) - new Date(a.dateStart)
        : new Date(a.dateStart) - new Date(b.dateStart);
    });
  
    displayProjects(filtered);
  }
  

  document.querySelectorAll('input[name="language"], select').forEach(el =>
    el.addEventListener("change", applyFilters)
  );

  window.onload = () => {
    displayProjects();
  
    const hash = window.location.hash;
    if (hash) {
      const targetId = hash.replace("#", "");
      const targetProject = projects.find(p => p.id === targetId);
      if (targetProject) {
        openModal(targetProject);
      }
    }
  };
  

  function toggleFilter() {
    const sidebar = document.querySelector('.project-sidebar');
    sidebar.classList.toggle('collapsed');
  }


// Modal functionality
function openModal(project) {
  const modal = document.getElementById("project-modal");
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
    <h2 class="modal-title">${project.title}</h2>
    <p class="modal-date">Ended on: ${project.dateEnd}</p>
    <img src="${project.image}" alt="${project.title}" class="modal-img">
    <div class="modal-info">
      <p><strong>Language:</strong> ${project.lang}</p>
      <p><strong>Type:</strong> ${project.type}</p>
      <p><strong>Description:</strong> ${project.description || "No description available."}</p>
    </div>
  `;
  modal.classList.remove("hidden");
}

  
  function closeModal() {
    document.getElementById("project-modal").classList.add("hidden");
  }

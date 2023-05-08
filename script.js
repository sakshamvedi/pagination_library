function createTeasePagination(containerName,teasesPerPage) {
  const containers = document.querySelectorAll(containerName);

    containers.forEach((container) => {
        let teases;

      if (container.querySelectorAll(".cmp-container > .aem-Grid").length != 0) {
          console.log("aem grid present ")
     teases = container.querySelectorAll(".cmp-container > .aem-Grid > *:not(.separator)");

      }
      else if (container.querySelectorAll(".cmp-container > .aem-Grid").length == 0)  {
          console.log("aem grid not present ")
          teases = container.querySelectorAll(".cmp-container  > *:not(.separator)");

        }
      else {
          container.querySelectorAll(container + "> *");
          console.log(container)
        }
        
     const children = container.querySelectorAll(".cmp-container > .aem-Grid > *:not(.separator)");

      console.dir(children);
    const totalPages = Math.ceil(teases.length / teasesPerPage);
    let currentPage = 1;
    const pagination = document.createElement('div');
    pagination.classList.add('pagination');

    const prevButton = document.createElement('button');
    prevButton.textContent = '';
    prevButton.classList.add("prevButton");
    prevButton.disabled = true;
    pagination.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      button.classList.add("pagenumber")
      button.textContent = i;
      if (i === currentPage) {
        button.classList.add("active");
      }
      pagination.appendChild(button);
    }

    const nextButton = document.createElement('button');
    nextButton.classList.add("nextButton");
    nextButton.textContent = '';
    if (totalPages === 1) {
      nextButton.disabled = true;
    }
    pagination.appendChild(nextButton);

    container.appendChild(pagination);
    const buttons = pagination.querySelectorAll('button');
    let index = 0;

    function showTeases(start, end) {
      teases.forEach((tease, teaseIndex) => {
        if (teaseIndex >= start && teaseIndex < end) {
          tease.style.display = 'block';
        } else {
          tease.style.display = 'none';
        }
      });
    }

    showTeases(0, teasesPerPage);

    buttons.forEach((button, buttonIndex) => {
      button.addEventListener('click', () => {
        if (buttonIndex === 0) {
          currentPage--;
        } else if (buttonIndex === totalPages + 1) {
          currentPage++;
        } else {
          currentPage = buttonIndex;
        }

        buttons.forEach((button) => {
          button.classList.remove("active");
        });
        buttons[currentPage].classList.add("active");

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;

        const start = (currentPage - 1) * teasesPerPage;
        const end = start + teasesPerPage;
        showTeases(start, end);
      });
    });
  });
}

createTeasePagination('.cmp-container--pagination', 2);


let catArray = new Array();

function start() {
  const btnGetCatInfo = document.getElementById('btn_get_cat_info');
  btnGetCatInfo.onclick = handleButtonClick;

  loadCats();
}

function loadCats() {
  const catList = document.getElementById('cat_list');

  let newOption;

  fetch(
    'https://api.thecatapi.com/v1/breeds?api_key=live_8HMXvw3IxivwVHaNYtQbDHhPHacRvk82omvbSVbL5C4PzyMKrKspGBheC84vwTVu'
  )
    .then((response) => response.json())
    .then((data) => {
      data.forEach((cat) => {
        newOption = document.createElement('option');
        newOption.value = cat.name;
        newOption.text = cat.name;

        catList.appendChild(newOption);
        catArray.push(cat);
      });
    });
}

function handleButtonClick() {
  const catList = document.getElementById('cat_list');
  const index = catList.selectedIndex;

  const outputSpan = document.getElementById('output');

  const cat = catArray[index];

  const indexOfLastSlash = cat.wikipedia_url.lastIndexOf('/');

  let wikiSearchTerm = cat.wikipedia_url.slice(indexOfLastSlash + 1);

  let output = `<h2>${catArray[index].name}</h2>`;
  output += `<img src="${cat.image.url}"><br>`;
  output += `<h3>Description</h3><p>${cat.description}</p>`;
  output += `<br>Click to learn about <a href="${cat.wikipedia_url}">${cat.name}</a>`;

  outputSpan.innerHTML = output;

  showTotalPageviews(wikiSearchTerm, outputSpan);
}

function showTotalPageviews(searchTerm, outputSpan) {
  let totalPageViews = 0;

  let searchDate = '2023-10-01/2023-11-01';
  fetch(
    `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/${searchTerm}/daily/${searchDate.replace(
      /-/g,
      ''
    )}`
  )
    .then((response) => response.json())
    .then((data) => {
      const dataArray = data.items;

      dataArray.forEach((dayData) => {
        totalPageViews += parseInt(dayData.views);
      });

      outputSpan.innerHTML += `<br>TotalPageViews for ${searchDate}: <strong>${totalPageViews}</strong><br>`;
    });
}

window.onload = start;

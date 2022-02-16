const detailCountry = document.querySelector(".detail-country")
let arrNames = []
const idCountry = localStorage.getItem("id")
const btnMode = document.getElementById("btn-mode")

document.addEventListener("DOMContentLoaded", function () {
  let theme = localStorage.getItem("theme")
  document.documentElement.setAttribute("data-theme", theme)
  changeMoon(theme)
  btnMode.addEventListener("click", function () {
    let currentTheme = document.documentElement.getAttribute("data-theme")
    let switchToTheme = currentTheme === "dark" ? "light" : "dark"
    document.documentElement.setAttribute("data-theme", switchToTheme);
    localStorage.setItem("theme", switchToTheme)
    changeMoon(switchToTheme)
  })
})

async function getCodeCountries() {
  const response = await fetch("countries.json")
  const data = await response.json()
  return data
}

async function getCountries() {
  const response = await fetch("https://restcountries.com/v2/all")
  const data = await response.json()
  return data
}

function changeMoon(theme) {
  if (theme === "light") {
    document.querySelector(".fas").style.opacity = 0
    document.querySelector(".far").style.opacity = 1
  } else {
    document.querySelector(".fas").style.opacity = 1
    document.querySelector(".far").style.opacity = 0
  }
}


function convertCodeCountry(index) {
  getCountries()
    .then(data => {
      console.log(data[index])
      let arrBorders = data[index].borders
      getCodeCountries()
        .then(data => {
          for (let i = 0; i < arrBorders.length; i++) {
            for (let j = 0; j < data.length; j++) {
              if (arrBorders[i].includes(data[j].code)) {
                arrNames.push(data[j].name)
              }
            }
          }
          displayNames(arrNames)
        })
    })
  arrNames = []
}

function displayNames(arr) {

  for (let i = 0; i < arr.length; i++) {
    let html = `
      <a class="btn border-name">${arr[i]}</a>
    `
    document.querySelector(".borders-name").insertAdjacentHTML("beforeend", html)
  }
  let borderName = document.querySelectorAll(".border-name")
  console.log(borderName)
  borderCountry(borderName)

}

getCountries()
  .then(data => {
    let populationValue = (data[idCountry].population).toLocaleString(
      undefined, { minimumFractionDigits: 2 })
    let html = `
          <div class="detail-img">
            <img src="${data[idCountry].flag}" alt="${data[idCountry].name}">
          </div>
          <div class="detail-body flow" style="--flow-space: 2rem;">
            <h2>${data[idCountry].name}</h2>
            <div class="detail-info grid">
              <div class="flow" style="--flow-space: .5rem;">
                <p>Native Name: <span>${data[idCountry].nativeName}</span></p>
                <p>Population: <span>${populationValue}</span></p>
                <p>Region: <span>${data[idCountry].region}</span></p>
                <p>Sub-Region: <span>${data[idCountry].subregion}</span></p>
                <p>Capital: <span>${data[idCountry].capital}</span></p>
              </div>
              <div class="flow" style="--flow-space: .5rem;">
                <p>Top Level Domain: <span>${data[idCountry].topLevelDomain}</span></p>
                <p>Currencies: <span>${data[idCountry].currencies.map(el => el.name)}</span></p>
                <p>Languages: <span>${data[idCountry].languages.map(el => el.name)}</span></p>
              </div>
            </div>
            <div class="detail-border">
              Border Countries:
              <div class="borders-name flex"></div>
            </div>
          </div>
        `
    detailCountry.insertAdjacentHTML("beforeend", html)
    convertCodeCountry(idCountry)
  })


function borderCountry(borderName) {

  for (let i = 0; i < borderName.length; i++) {
    borderName[i].addEventListener("click", function () {
      console.log(borderName[i].innerText)
      let country = borderName[i].innerText.toLowerCase()
      borderName.forEach(el => el.remove())
      getCountries()
        .then(data => {
          for (let j = 0; j < data.length; j++) {
            let currentName = data[j].name.toLowerCase()
            if (currentName.includes(country)) {
              let populationValue = (data[j].population).toLocaleString(
                undefined, { minimumFractionDigits: 2 })
              let html = `
              <div class="detail-img">
                <img src="${data[j].flag}" alt="${data[j].name}">
              </div>
              <div class="detail-body flow" style="--flow-space: 2rem;">
                <h2>${data[j].name}</h2>
                <div class="detail-info grid">
                  <div class="flow" style="--flow-space: .5rem;">
                    <p>Native Name: <span>${data[j].nativeName}</span></p>
                    <p>Population: <span>${populationValue}</span></p>
                    <p>Region: <span>${data[j].region}</span></p>
                    <p>Sub-Region: <span>${data[j].subregion}</span></p>
                    <p>Capital: <span>${data[j].capital}</span></p>
                  </div>
                  <div class="flow" style="--flow-space: .5rem;">
                    <p>Top Level Domain: <span>${data[j].topLevelDomain}</span></p>
                    <p>Currencies: <span>${data[j].currencies.map(el => el.name)}</span></p>
                    <p>Languages: <span>${data[j].languages.map(el => " " + el.name)}</span></p>
                  </div>
                </div>
                <div class="detail-border">
                  Border Countries:
                  <div class="borders-name flex"></div>
                </div>
              </div>
            `
              detailCountry.innerHTML = html
              convertCodeCountry(j)

            }

          }
        })

    })
  }

}


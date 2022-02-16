let x, j, l, ll, selectEl, a, b, c
const customSelect = document.getElementsByClassName("custom-select")
const select = document.getElementById("select")

for (let i = 0; i < customSelect.length; i++) {
  // select = customSelect[i].getElementsByTagName("select")[0]
  ll = select.length
  // console.log(select)
  // console.log(ll)
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("div")
  a.setAttribute("class", "select-selected")
  a.innerHTML = select.options[select.selectedIndex].innerHTML
  customSelect[i].appendChild(a)
  // console.log(a)
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("div")
  b.setAttribute("class", "select-items select-hide")
  // console.log(b)
  for (let j = 1; j < select.length; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("div")
    c.innerHTML = select.options[j].innerHTML
    // console.log(c)
    c.addEventListener("click", function (e) {
      /*when an item is clicked, update the original select box,
        and the selected item:*/
      let y, s, h, sl, yl
      s = this.parentNode.parentNode.getElementsByTagName("select")[0]
      sl = s.length
      // console.log(s)
      // console.log(sl)
      h = this.parentNode.previousSibling
      for (let i = 0; i < s.length; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = 1
          h.innerHTML = this.innerHTML
          y = this.parentNode.getElementsByClassName("same-as-selected")
          yl = y.length
          for (let k = 0; k < yl; k++) {
            y[k].removeAttribute("class")
          }
          this.setAttribute("class", "same-as-selected")
          break
        }
      }
      h.click()
    })
    b.appendChild(c)
  }
  customSelect[i].appendChild(b)
  a.addEventListener("click", function (e) {
    /*when the select box is clicked, close any other select boxes,
    and open/close the current select box:*/
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);

// country api

const countries = document.querySelector(".countries")

const input = document.querySelector(".input")
const selectItem = document.querySelector(".select-items")
const selectItems = selectItem.getElementsByTagName("div")
const btnMode = document.getElementById("btn-mode")

async function getCountries() {
  const response = await fetch("https://restcountries.com/v2/all")
  const data = await response.json()
  return data
}

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("theme")) {
    let theme = localStorage.getItem("theme")
    document.documentElement.setAttribute("data-theme", theme)
    changeMoon(theme)
  } else {
    document.documentElement.setAttribute("data-theme", "light")
  }

  btnMode.addEventListener("click", function () {
    let currentTheme = document.documentElement.getAttribute("data-theme")
    let switchToTheme = currentTheme === "dark" ? "light" : "dark"
    document.documentElement.setAttribute("data-theme", switchToTheme);
    localStorage.setItem("theme", switchToTheme)
    changeMoon(switchToTheme)
  })
})

function changeMoon(theme) {
  if (theme === "light") {
    document.querySelector(".fas").style.opacity = 0
    document.querySelector(".far").style.opacity = 1
  } else {
    document.querySelector(".fas").style.opacity = 1
    document.querySelector(".far").style.opacity = 0
  }
}

getCountries()
  .then(data => {
    console.log(data[2])
    for (let i = 0; i < data.length; i++) {
      let populationValue = (data[i].population).toLocaleString(
        undefined, { minimumFractionDigits: 2 })
      let html = `
        <div class="card">
          <div class="card-img">
            <img src="${data[i].flag}" alt="${data[i].name}" />
          </div>
          <div class="card-body">
            <h3>${data[i].name}</h3>
            <p>Population: <span>${populationValue}</span></p>
            <p>Region: <span>${data[i].region}</span></p>
            <p>Capital: <span>${data[i].capital}</span></p>
          </div>
        </div>
      `
      countries.insertAdjacentHTML("beforeend", html)
    }
  })

getCountries()
  .then(data => {
    for (let i = 0; i < data.length; i++) {
      let allCards = document.querySelectorAll(".card")
      allCards[i].addEventListener("click", function () {
        console.log(`cliked ${i}`)
        localStorage.setItem("id", i)
        window.open('detail-page.html', '_self');
      })
    }
  })

input.addEventListener("keyup", function (e) {
  document.querySelector(".countries").classList.add("countries-search")
  let searchQuery = e.target.value.toLowerCase()
  let allCards = document.querySelectorAll(".card")
  getCountries()
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        const currentName = data[i].name.toLowerCase()
        if (currentName.includes(searchQuery)) {
          allCards[i].hidden = false
        } else {
          allCards[i].hidden = true
        }
      }
    })
  if (!input.value) {
    document.querySelector(".countries").classList.remove("countries-search")
  }
})

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedRegion = selectItems[i].innerText
    let allCards = document.querySelectorAll(".card")
    getCountries()
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          const currentRegion = data[i].region
          if (currentRegion.includes(selectedRegion)) {
            allCards[i].hidden = false
          } else {
            allCards[i].hidden = true
          }
        }
      })
  })
}






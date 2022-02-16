const btnOpenNav = document.getElementById("open-nav")
const navigation = document.getElementById("navigation")
const btnCloseNav = document.getElementById("close-nav")
const overlay = document.querySelector(".overlay")
const shortenBtn = document.getElementById("shorten-btn")
const shortenInput = document.getElementById("shorten-input")
const shortenResult = document.querySelector(".shorten-result")
const clearBtn = document.getElementById("clear-btn")

let tabLinks = []

let linksLocalStorage = JSON.parse(localStorage.getItem("myLinks"))

if (linksLocalStorage) {
  tabLinks = linksLocalStorage
  renderHistory()
  clearBtn.style.display = "inline-block"
}

clearBtn.addEventListener("click", () => {
  localStorage.clear()
  tabLinks = []
  shortenResult.innerHTML = ""
  clearBtn.style.display = "none"
})


function renderHistory() {
  // let reverseTabLinks = tabLinks.slice().reverse()
  tabLinks.forEach(el => {
    renderHTML(el.html)
  })
}

shortenBtn.addEventListener("click", () => {

  const inputUrl = shortenInput.value
  errorInput(inputUrl)

  fetch(`https://api.shrtco.de/v2/shorten?url=${inputUrl}`)
    .then(response => {
      if (!response.ok) { throw Error(response) }
      return response.json()
    })
    .then(data => {
      const shortLink = data.result.short_link
      const id = shortLink.substring(shortLink.lastIndexOf('/') + 1)
      let html = ""
      html = `
        <div class="shorten-links flex">
          <div>
            <p class="shorten-links-main-link">${data.result.original_link}</p>
          </div>
          <div class="flex" style="align-items: center;">
            <p><a class="shorten-links-new-link" href="${data.result.full_short_link}" target="_blank">${data.result.short_link}</a></p>
            <a id="${id}" class="btn btn-input" onclick="copyLink('${shortLink}', '${id}')">Copy</a>
          </div>
        </div>
      `


      addToHistory(html)
      renderHTML(html)

      shortenInput.value = ""
    })
    .catch(error => console.log(error))
})

function renderHTML(html) {

  shortenResult.insertAdjacentHTML("beforeend", html)
  // tabLinks = []
  // shortenLinks.insertAdjacentHTML("beforeend", el.html)
  clearBtn.style.display = "inline-block"
}

function addToHistory(html) {
  let newTab = { html: html }
  tabLinks.push(newTab)
  localStorage.setItem("myLinks", JSON.stringify(tabLinks))
}

function errorInput(inputUrl) {
  if (!inputUrl) {
    document.querySelector(".error-message").style.display = "block"
    shortenInput.classList.add("error-input")
  } else {
    document.querySelector(".error-message").style.display = "none"
    shortenInput.classList.remove("error-input")
  }
}

function copyLink(link, id) {
  navigator.clipboard.writeText(link).then(
    () => {
      document.getElementById(id).innerText = "Copied!"
      document.getElementById(id).style.background = "hsl(257, 27%, 26%)"
    },
    () => {
      window.alert('Opps! Your browser does not support the Clipboard API')
    })
}

btnOpenNav.addEventListener("click", () => {
  navigation.classList.add("nav-open")
  document.body.classList.add("no-scroll")
  overlay.style.visibility = "visible"
})

btnCloseNav.addEventListener("click", () => {
  navigation.classList.remove("nav-open")
  document.body.classList.remove("no-scroll")
  overlay.style.visibility = "hidden"
})
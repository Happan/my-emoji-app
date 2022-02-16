const btnInfo = document.getElementById("btn-info")
const extraInfo = document.querySelector(".extra-info")
const quote = document.getElementById("quote")
const quoteAuthor = document.getElementById("quote-author")
const quoteBtn = document.getElementById("quote-btn")


// more info button
btnInfo.addEventListener("click", () => {
  if (extraInfo.hidden) {
    extraInfo.removeAttribute('hidden')
    const reflow = extraInfo.offsetHeight;
    extraInfo.classList.add("is-open")
    document.getElementById("btn-inner-text").textContent = "Less"
    document.getElementById("info-svg").style.transform = "rotate(0deg)"
  } else {
    extraInfo.hidden = true
    document.getElementById("btn-inner-text").textContent = "More"
    document.getElementById("info-svg").style.transform = "rotate(180deg)"
  }
}, false)

// random quote
async function randomQuote() {
  const response = await fetch("https://api.quotable.io/random/")
  const data = await response.json()
  return data
}

randomQuote()
  .then(data => {
    quote.textContent = data.content
    quoteAuthor.textContent = data.author
  })

quoteBtn.addEventListener("click", () => {
  randomQuote()
    .then(data => {
      quote.textContent = data.content
      quoteAuthor.textContent = data.author
    })
})

// current time, change greeting, icon and background
function getCurrentTime() {
  const date = new Date()
  const currentTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const time = date.toLocaleTimeString([], { hour: '2-digit' })
  console.log(time)
  document.getElementById("current-time").textContent = currentTime
  if (5 <= time && time < 12) {
    document.getElementById("greeting").textContent = "Good morning,"
    document.querySelector("html").style.backgroundImage = "url(assets/desktop/bg-image-daytime.jpg)"
    document.getElementById("icon").innerHTML = `
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M11.78 19.417c.594 0 1.083.449 1.146 1.026l.006.125v1.842a1.152 1.152 0 01-2.296.125l-.007-.125v-1.842c0-.636.516-1.151 1.152-1.151zM6.382 17.18a1.15 1.15 0 01.09 1.527l-.09.1-1.302 1.303a1.152 1.152 0 01-1.718-1.528l.09-.1 1.302-1.302a1.15 1.15 0 011.628 0zm12.427 0l1.303 1.303a1.15 1.15 0 11-1.628 1.627L17.18 18.81a1.15 1.15 0 111.628-1.628zM11.781 5.879a5.908 5.908 0 015.901 5.902 5.908 5.908 0 01-5.901 5.902 5.908 5.908 0 01-5.902-5.902 5.908 5.908 0 015.902-5.902zm10.63 4.75a1.151 1.151 0 110 2.303h-1.843a1.151 1.151 0 110-2.303h1.842zm-19.418 0a1.151 1.151 0 01.126 2.296l-.125.007H1.15a1.151 1.151 0 01-.125-2.296l.125-.007h1.842zm1.985-7.268l.1.09 1.303 1.302a1.151 1.151 0 01-1.528 1.718l-.1-.09L3.45 5.08A1.15 1.15 0 014.978 3.36zm15.133.09c.45.449.45 1.178 0 1.628L18.808 6.38a1.151 1.151 0 11-1.628-1.628l1.303-1.303c.449-.449 1.178-.449 1.628 0zM11.781 0c.636 0 1.151.515 1.151 1.151v1.843a1.152 1.152 0 01-2.303 0V1.15C10.63.515 11.145 0 11.781 0z" fill="#FFF" fill-rule="nonzero"/></svg>
    `
    extraInfo.style.color = "hsl(0, 0%, 17%)"
    extraInfo.style.background = "rgba(255, 255, 255, 0.45)"
    Array.from(extraInfo.getElementsByTagName("p")).forEach(el => el.style.color = "hsl(0, 0%, 39%)")

  } else if (12 <= time && time < 18) {
    document.getElementById("greeting").textContent = "Good afternoon,"
  } else {
    document.getElementById("greeting").textContent = "Good evening,"
    document.querySelector("html").style.backgroundImage = "url(assets/desktop/bg-image-nighttime.jpg)"
    document.getElementById("icon").innerHTML = `
      <svg width="23" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M22.157 17.366a.802.802 0 00-.891-.248 8.463 8.463 0 01-2.866.482c-4.853 0-8.8-3.949-8.8-8.8a8.773 8.773 0 013.856-7.274.801.801 0 00-.334-1.454A7.766 7.766 0 0012 0C5.382 0 0 5.382 0 12s5.382 12 12 12c4.2 0 8.02-2.134 10.218-5.709a.805.805 0 00-.061-.925z" fill="#FFF" fill-rule="nonzero"/></svg>
    `
    extraInfo.style.color = "rgba(255, 255, 255, 0.85)"
    extraInfo.style.background = "rgba(255, 255, 255, 0.05)"
    Array.from(extraInfo.getElementsByTagName("p")).forEach(el => el.style.color = "rgba(255, 255, 255, 0.35)")
  }
}

setInterval(getCurrentTime, 1000)

// time data fetch
async function timeIP() {
  const response = await fetch("http://worldtimeapi.org/api/ip")
  const data = await response.json()
  return data
}

timeIP()
  .then(data => {
    document.getElementById("abbreviation").textContent = data.abbreviation
    document.getElementById("timezone").textContent = data.timezone
    document.getElementById("day-year").textContent = data.day_of_year
    document.getElementById("day-week").textContent = data.day_of_week
    document.getElementById("week-number").textContent = data.week_number
  })

// location fetch
async function getLocation() {
  const response = await fetch("https://freegeoip.app/json/")
  const data = await response.json()
  return data
}

getLocation()
  .then(data => {
    document.getElementById("location").textContent = `In ${data.city}, ${data.country_name}`
  })

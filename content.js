console.log("content.js loaded")

function waitForElm(selector) {
  console.log("waiting for:", selector)
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector))
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        console.log("found:", selector)

        resolve(document.querySelector(selector))
        observer.disconnect()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })
}

setInterval(() => {
  renderImages()
}, 500)

waitForElm("#flight_board-departures_table").then(() => {
  console.log("found element #flight_board-departures_table")
  // add change listener to element
  document
    .getElementById("flight_board-departures_table")
    .addEventListener("change", () => {
      console.log("auto update changed")
    })
})

function renderImages() {
  const allFlightsNumberElements = document.querySelectorAll(
    ".field--wrapper .td-flight"
  )

  allFlightsNumberElements.forEach((element) => {
    // check if the element already has an image
    if (element.querySelector("img")) return

    const airlineCode = element.innerHTML.split(" ")?.[0]
    // create an image logo with the flight number
    const flightNumElement = document.createElement("img")
    flightNumElement.src = `https://www.gstatic.com/flights/airline_logos/70px/dark/${airlineCode}.png`
    flightNumElement.style = "width: 30px; height: 30px;margin-right: 10px;"

    element.appendChild(flightNumElement)
  })
}

waitForElm("#toggleAutoUpdate").then((element) => element.click())

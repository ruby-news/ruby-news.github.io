---
layout: null
---

{% include google_analytics.js.html %}
{% include disqus.js.html %}

document.addEventListener('DOMContentLoaded', function() {
  const cookieContainer = document.getElementById('cookieContainer')

  if (cookieContainer) cookieContainer.style.display = 'none'

  setTimeout(() => {
    if (cookieContainer) cookieContainer.style.display = 'block'
  }, 2000)

  if(localStorage.cookieAccept == 1) {
    if(cookieContainer) cookieContainer.remove()
  }

  const accept = document.getElementById('cookieAccept')
  const reject = document.getElementById('cookieReject')
  const custom = document.getElementById('cookieSettings')

  const dismissCookie = () => {
    cookieContainer.style.animation = 'fade-out-bottom 1s ease forwards'
    setTimeout(() => { if(cookieContainer) cookieContainer.remove() }, 1500)
  }

  ;(() => {
    if(!cookieContainer || !accept || !custom || !reject) return

    reject.addEventListener('touchstart', () => {
      dismissCookie()
    })

    reject.onclick = () => {
      dismissCookie()
    }

    const basic = document.getElementById('basicCookie')
    const google = document.getElementById('googleAnalyticsCookieToggler')
    const disqus = document.getElementById('disqusCookieToggler')
    let services = [google, disqus]

    let acceptEvent = () => {
      localStorage.cookieAccept = basic && basic.checked ? 1 : 0

      if(localStorage.cookieAccept == 1) {
        localStorage.googleAnalyticsCookie = google && google.checked ? 1 : 0
        localStorage.disqusCookie = disqus && disqus.checked ? 1 : 0
      }

      if(localStorage.googleAnalyticsCookie == 1) { loadAnalytics() }
      if(localStorage.disqusCookie == 1) { loadDisqus() }

      dismissCookie()
    }

    accept.addEventListener('touchstart',  () => { acceptEvent() })
    accept.onclick = () => { acceptEvent() }


    // Show the cookie options
    custom.collapsed = true

    let customEvent = () => {
      if(reject) reject.remove()

      let cookieSettings = document.getElementById("moreCookieSettings")
      if(!cookieSettings) return

      if (custom.collapsed) {
        cookieSettings.style.height = 'auto'
        cookieSettings.style.opacity = '1'
        cookieSettings.style.padding = '16px 32px 0 32px'
        custom.collapsed = false
      } else {
        cookieSettings.style.height = '0'
        cookieSettings.style.opacity = '0'
        cookieSettings.style.padding = '0'
        custom.collapsed = true
      }
    }

    custom.addEventListener('touchstart', () => { customEvent() })
    custom.onclick = () => { customEvent() }

    ;(() => {
      for(let service of services) {
        service.onchange = () => {
          if(service.checked) {
            basic.checked = true
            let parent = basic.parentNode
            parent.classList.add('is-checked')
          }
        }

        basic.onchange = () => {
          if(!basic.checked) {
            for(let service of services) {
              service.checked = false
              let parent = service.parentNode
              parent.classList.remove('is-checked')
            }
          }
        }
      }
    })()

  })()

  if (cookieContainer) {
    // Draw particles on cookie bar
    const PARTICLES = 15
    const bgColors = ['#f55', '#f33', '#f88']

    for(let i = 0 ; i < PARTICLES ; ++i) {
      let div = document.createElement('div')
      div.setAttribute('class', 'cookie-background')
      div.style.position = 'absolute'
      div.style.zIndex = '-1'
      div.style.opacity = `${Math.random() * 0.35 + 0.15}`
      div.style.top = `${Math.random() * 100}%`
      div.style.left = `${Math.random() * 100}%`
      div.style.backgroundColor = bgColors[Math.floor(Math.random() * bgColors.length)]
      div.style.padding = `${Math.ceil(Math.random() * 2) + 1}px`
      cookieContainer.appendChild(div)
    }
  }
})

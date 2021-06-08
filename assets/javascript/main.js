---
layout: null
---
'use strict'

// loadAnalytics()
{% include google_analytics.js.html %}

// loadDisqus()
{% include disqus.js.html %}

document.addEventListener('DOMContentLoaded', function() {
  /*
    > Load Google analytics and disqus and other cookie related stuff
    > Make sure to have some sort of branching to ensure that cookies only load
    when the user wants that, and it strictly complies to GDPR
  */

  ;(() => {
    if(!localStorage.cookieAccept == 1) return

    if(localStorage.googleAnalyticsCookie == 1) {
      loadAnalytics()
    }

    if(localStorage.disqusCookie == 1) {
      loadDisqus()
    }
  })()

  /*
    Trim all pre tags
  */
  for(let i of document.querySelectorAll('pre')) {
    let html = i.innerHTML
    i.innerHTML = html.split("\n").map(x => x.trim() + "\n").join('').trim()
  }

  /*
    Lazy loading animation on images with .lazyload class
  */
  const lazyLoads = document.querySelectorAll('.lazyload')

  for(let i in lazyLoads) {
    let lazyload = lazyLoads[i]
    if (!lazyload) continue

    let children = lazyload.children
    if(!children) continue

    // Inject image div
    let img = children[0]
    if(!img) continue

    let animObj = children[1]
    if(!animObj) continue

    animObj.style.animation = 'lazyloadAnim 2s linear infinite'
    let image = new Image()

    image.addEventListener('load', () => {
      if (img.getAttribute('full-background') != 'false') {
        image.setAttribute('class', 'preview-img-1 cover')
        img.appendChild(image)
      } else {
        img.appendChild(image)
        image.setAttribute('class', 'preview-img-1')

        if (img.getAttribute('blur-bg') == 'true') {
          let clonedImg = image.cloneNode(true)
          clonedImg.setAttribute('class', 'preview-img-2')
          img.appendChild(clonedImg)
        }

        image.setAttribute('class', 'preview-img-1')
      }

      animObj.style.animation = 'fade-out 0.5s ease'
      setTimeout(() => { animObj.remove() }, 500)
    }, false)

    image.src = img.getAttribute('src')
  }

  // Inject years
  const injectYears = Array.from(document.getElementsByClassName('insert-current-year'))
  for (let i of injectYears) { i.innerText = new Date().getFullYear() }

  // Navbar close on escape button on small desktops
  const navButton = document.getElementById('nav-check')
  document.onkeydown = function(evt) {
    evt = evt || window.event

    if(
      (navButton.checked && "key" in evt) &&
      (evt.key == 'Escape' || evt.key == 'Esc')
    ) navButton.checked = false
  }

  // Scroll elements into view when the element is intersecting
  function observeComponents(direction) {
    for(let i of document.querySelectorAll(`.appear-${direction}`)) {
      let delay = i.getAttribute('slide-delay') || 125

      if(typeof(IntersectionObserver) != "undefined") {
        i.observer = new IntersectionObserver(e => {
          if(e[0].isIntersecting) {
            if(!i.observed) {
              i.observed = true
              i.style.animation = `appear-${direction} 0.5s ease forwards ${delay}ms`
              if(i.observer) i.observer.unobserve(i)
            }
          }
        })

        i.observer.observe(i)
      } else {
        i.style.animation = `appear-${direction} 0.5s ease forwards ${delay}ms`
      }
    }
  }

  observeComponents('up')
  observeComponents('down')
  observeComponents('right')
  observeComponents('left')

  // Copy text to clipboard when any element has class "copy"
  const copyButtons = document.querySelectorAll('.copy')
  for(let copyButton of copyButtons) {
    let text = copyButton.getAttribute('text')
    let copyFunc = () => {
      let textArea = document.createElement('textarea')
      textArea.style.position = 'fixed'
      textArea.style.top = '0'
      textArea.style.left = '0'
      textArea.style.opacity = '0'

      textArea.value = text

      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      let snackbarContainer = document.querySelector('#copy-snackbar');

      try {
        document.execCommand('copy')

        if (snackbarContainer) {
            snackbarContainer.MaterialSnackbar.showSnackbar({
              message: 'Link Copied', timeout: 1000
          })
        }

      } catch(err) {
        alert('Text cannot be copied')
      }

      document.body.removeChild(textArea)
    }

    copyButton.addEventListener('touchStart', () => { copyFunc() })
    copyButton.onclick = () => { copyFunc() }
  }

  // Total posts counter
  const postCounter = document.getElementById('postCounter')

  ;(() => {
    if(!postCounter) return
    let innerHtml = postCounter.innerHTML
    let count = postCounter.getAttribute('count')
    let counter = 0
    let numStr = count.toString()
    let digits = numStr.length

    let counterIncInterval = setInterval(() => {
      if (counter < count) counter += Math.ceil(5 * count / 100)
      if (counter > count) counter = count

      let counterStr = counter.toString()
      let counterStrLen = counterStr.length
      let counterValStr = counterStrLen < digits ? '0'.repeat(digits - counterStrLen) + counter : counter

      postCounter.innerHTML = `${innerHtml}${counterValStr}`

      if (counter == count) {
        clearInterval(counterIncInterval)
      }
    }, 100)
  })()

  if(localStorage.googleAnalyticsCookie) {
    loadAnalytics()
  }

  // Show delaunay only when the user intersects it (makes scrolling better on mobile devices)
  const delaunay = document.getElementById('delaunay')

  if(delaunay && typeof(IntersectionObserver)) {
    new IntersectionObserver(e => {
      if(e[0].isIntersecting) {
        delaunay.style.visibility = 'visible'

        let delaunayCanvas = document.querySelector('#delaunay canvas')
        if(delaunayCanvas) delaunayCanvas.style.display = 'block'
      }
      else {
        delaunay.style.visibility = 'hidden'
        let delaunayCanvas = document.querySelector('#delaunay canvas')
        if(delaunayCanvas) delaunayCanvas.style.display = 'none'
      }
    }).observe(delaunay)
  }

  /*
    TODO
    // Show the subscription modal only when the user spends > 1 minute on the website
    // And also, don't show the modal for 2 weeks when the user dismisses it
  */

  // Alter google custom search look and feel
  function gscInputMod() {
    const gscInput = document.querySelector('input.gsc-input')
    if(gscInput) gscInput.placeholder = 'Search Ruby News'
  }

  let mutationObserver = new MutationObserver(() => {
    gscInputMod()
  })

  let observe = document.getElementById('observeSearch')

  if (observe) {
    mutationObserver.observe(observe, {
      childList: true,
      substree: false,
      attributes: false,
      characterData: false
    })
  }

  // Remove classes with esc-remove, esc-collapse to close with escape key press
  const escapeRemove = document.querySelectorAll('.esc-remove')
  const escapeCollapse = document.querySelectorAll('.esc-collapse')

  document.onkeydown = function(evt) {
    evt = evt || window.event

    // Remove classes with esc-remove to close with escape key press
    for(let i of escapeRemove) {
      if((i && "key" in evt) && (evt.key == 'Escape' || evt.key == 'Esc'))
        i.remove()
    }

    // Remove classes with esc-collapse to close with escape key press
    for(let i of escapeCollapse) {
      if((i && "key" in evt) && (evt.key == 'Escape' || evt.key == 'Esc')) {
        i.style.opacity = 0

        setTimeout(() => { if(i) i.remove() }, 3000)
      }
    }

  }


})

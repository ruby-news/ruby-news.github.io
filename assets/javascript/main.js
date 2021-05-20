window.addEventListener('load', function() {
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

    animObj.style.animation = 'lazyloadAnim 1s linear alternate infinite'
    let image = new Image()

    image.addEventListener('load', function(event) {
      setTimeout(() => { animObj.remove() }, 3000)
      img.appendChild(image)
    }, false)

    image.src = img.getAttribute('src')
    image.setAttribute('loading', 'lazy')
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

  // Copy text to clipboard when any element has class "copy"
  const copyButtons = document.querySelectorAll('.copy')
  for(let copyButton of copyButtons) {
    let text = copyButton.getAttribute('text')

    copyButton.onclick = () => {
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
  }
})
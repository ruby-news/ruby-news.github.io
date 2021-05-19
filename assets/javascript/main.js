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

    let img = children[0]
    if(!img) continue

    let animObj = children[1]
    if(!animObj) continue

    animObj.style.animation = 'lazyloadAnim 1s linear alternate infinite'
    img.display = 'none'

    img.onload = () => {
      setInterval(() => {
        if(img.complete) {
          setTimeout(() => { img.display = 'block' }, 500)
          setTimeout(() => { animObj.remove() }, 3000)
        }
      }, 100)
    }
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
      (evt.key == 'Escape' || evt.key == 'esc')
    ) navButton.checked = false
  }
})

'use strict'

document.addEventListener('DOMContentLoaded', function() {
  // Make navbar white and shadowed when scrolled
  const navbar = document.querySelector('.css-navbar')

  ;(() => {
    if (!navbar) return

    navbar.shadowed = false
    let style = navbar.style

    window.addEventListener('scroll', () => {
      if(window.scrollY > navbar.offsetHeight) {
        if (!navbar.shadowed) {
          navbar.shadowed = true
          style.boxShadow = '2px 2px 6px #0005'
        }
      } else if(navbar.shadowed) {
        navbar.shadowed = false
        style.boxShadow = 'none'
      }
    })
  })()
})

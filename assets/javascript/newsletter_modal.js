'use strict'

document.addEventListener('DOMContentLoaded', function()  {
  // Close modal when clicked on X
  const modal = document.getElementById('subscribeModal')
  const closeBtn = document.getElementById('closeSubscribeModal')

  closeBtn.onclick = () => {
    modal.style.opacity = 0
    modal.style.transform = 'translate(-50%, -50%) scale(0)'

    setTimeout(() => {
      let parentNode = modal.parentNode
      if(parentNode) parentNode.removeChild(modal)
    }, 2000)
  }

  // Dealing with scrolling text in the modal
  const item = document.getElementById('scrollingItems')

  ;(() => {
    if (!item) return
    let items = document.querySelectorAll('#scrollingItems .scrolling-item')

    item.innerHTML = ''
    let itemContainer = document.createElement('div')
    itemContainer.setAttribute('id', 'itemContainer')
    item.appendChild(itemContainer)

    let i = 0
    itemContainer.innerHTML = items[0].innerHTML

    setInterval(() => {
      if (i == items.length - 1) {
        i = -1
        itemContainer.style.animation = 'slide-out-down 0.5s ease forwards'
      } else {
        itemContainer.style.animation = 'slide-out-left 0.5s ease forwards'
      }

      ++i;
      let itm = items[i]

      setTimeout(() => {
        if(itm) {
          itemContainer.innerHTML = itm.innerHTML
          itemContainer.style.animation = i == 0 ? 'slide-in-up 0.5s ease forwards' : 'slide-in-right 0.5s ease forwards'
          }
        }, 500)
    }, 2500)
  })()

})

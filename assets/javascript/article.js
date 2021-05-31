'use strict'

document.addEventListener('DOMContentLoaded', function() {
  // Start time the page is loaded, which is used to determine the time user
  // Spent reading the article!
  const startTime = Date.now()

  // Handle subscribe modal
  const sM = document.getElementById('subscribeModal')
  const sMC = document.getElementById('closeSubscribeModal')

  // Article read progress
  const articleContent = document.getElementById('articleContent')
  const progressBar = document.getElementById('progress')

  if (sM && sMC) {
    let sMCRemove = () => {
      sM.style.opacity = 0
      sM.style.transform = 'translate(-50%, -50%) scale(0)'

      setTimeout(() => {
        if(sM) sM.remove()
      }, 3000)
    }

    sMC.addEventListener('touchstart', () => { sMCRemove() })
    sMC.onclick = () => { sMCRemove() }
  }

  ;(() => {
    if(!articleContent) return
    if(!progressBar) return

    let endTime = null

    window.onscroll = () => {
      let contentHeight = articleContent.clientHeight
      let offsetTop = articleContent.offsetTop

      console.log(contentHeight, offsetTop)

      let bottom = contentHeight + offsetTop - window.innerHeight
      // console.log(bottom)
      let percentComplete = (window.scrollY * 100) / (bottom + 80)
      // console.log(percentComplete)


      percentComplete = percentComplete < 0 ? 0 : percentComplete > 100 ? 100 : percentComplete
      progressBar.style.width = `${percentComplete}%`

      sM.visible = false

      if (sM && !sM.visible && percentComplete === 100) {
        sM.visible = true
        if(!endTime) endTime = Date.now()

        if (endTime - startTime > 60000) {
          setTimeout(() => {
            sM.style.transform = 'translate(-50%, -50%) scale(1)'
            sM.style.opacity = 1
          }, 2000)
        }
      }
    }
  })()
})

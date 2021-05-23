document.addEventListener('DOMContentLoaded', function() {
	// Start time the page is loaded, which is used to determine the time user
	// Spent reading the article!
	const startTime = Date.now()

	// Handle subscribe modal
	const sM = document.getElementById('subscribeModal')
	const sMC = document.getElementById('closeSubscribeModal')
	sM.style.transform = 'translate(-50%, -50%) scale(0)'

	// Article read progress
	const articleContent = document.getElementById('articleContent')
	const progressBar = document.getElementById('progress')

	if (sM && sMC) {
		sMC.onclick = () => {
			sM.style.opacity = 0
			sM.style.transform = 'translate(-50%, -50%) scale(0)'

			setTimeout(() => {
				let parentNode = sM.parentNode
				if(parentNode) parentNode.removeChild(sM)
			}, 3000)
		}
	}

	;(() => {
		if(!articleContent) return
		if(!progressBar) return

		let endTime = null

		window.onscroll = () => {
			let bcr = articleContent.getBoundingClientRect()

			let contentHeight = articleContent.clientHeight
			let offsetTop = articleContent.offsetTop

			let bottom = contentHeight + offsetTop - window.innerHeight
			let percentComplete = (window.scrollY * 100) / (bottom + 80)

			percentComplete = percentComplete < 0 ? 0 : percentComplete > 100 ? 100 : percentComplete
			progressBar.style.width = `${percentComplete}%`

			if (sM && percentComplete === 100) {
				endTime ??= Date.now()

				if (endTime - startTime > 600) {
					setTimeout(() => {
						sM.style.transform = 'translate(-50%, -50%) scale(1)'
						sM.style.opacity = 1
					}, 3000)
				}
			}
		}
	})()
})

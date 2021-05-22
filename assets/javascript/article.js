document.addEventListener('DOMContentLoaded', function() {
	const articleContent = document.getElementById('articleContent')
	const progressBar = document.getElementById('progress')

	;(() => {
		if(!articleContent) return
		if(!progressBar) return


		window.onscroll = () => {
			let bcr = articleContent.getBoundingClientRect()

			let contentHeight = articleContent.clientHeight
			let offsetTop = articleContent.offsetTop

			let bottom = contentHeight + offsetTop - window.innerHeight
			let percentComplete = (window.scrollY * 100) / (bottom + 80)

			percentComplete = percentComplete < 0 ? 0 : percentComplete > 100 ? 100 : percentComplete
			progressBar.style.width = `${percentComplete}%`
		}
	})()
})

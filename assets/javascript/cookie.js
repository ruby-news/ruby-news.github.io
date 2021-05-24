document.addEventListener('DOMContentLoaded', function() {
	const cookieContainer = document.getElementById('cookieContainer')
	const close = document.getElementById('cookieClose')

	;(() => {
		if(!cookieContainer || !close) return

		close.onclick = () => {
			cookieContainer.style.animation = 'fade-out-bottom 1s ease forwards'

			setTimeout(() => {
				let parent = cookieContainer.parentNode
				if(parent) parent.removeChild(cookieContainer)
			}, 1500)
		}
	})()

})

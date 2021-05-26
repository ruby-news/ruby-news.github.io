document.addEventListener('DOMContentLoaded', function() {
	const cookieContainer = document.getElementById('cookieContainer')

	if(localStorage.dismissedCookie == 1) {
		let parent = cookieContainer.parentNode
		if(parent) parent.removeChild(cookieContainer)
	}

	const close = document.getElementById('cookieClose')

	;(() => {
		if(!cookieContainer || !close) return

		close.onclick = () => {
			cookieContainer.style.animation = 'fade-out-bottom 1s ease forwards'
			localStorage.dismissedCookie = 1

			setTimeout(() => {
				let parent = cookieContainer.parentNode
				if(parent) parent.removeChild(cookieContainer)
			}, 1500)
		}	})()

})

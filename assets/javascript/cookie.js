document.addEventListener('DOMContentLoaded', function() {
	const cookieContainer = document.getElementById('cookieContainer')

	if(localStorage.cookieAccept == 1) {
		let parent = cookieContainer.parentNode
		if(parent) parent.removeChild(cookieContainer)
	}

	const accept = document.getElementById('cookieAccept')
	const reject = document.getElementById('cookieReject')
	const custom = document.getElementById('cookieSettings')

	const dismissCookie = () => {
		cookieContainer.style.animation = 'fade-out-bottom 1s ease forwards'

		setTimeout(() => {
			let parent = cookieContainer.parentNode
			if(parent) parent.removeChild(cookieContainer)
		}, 1500)
	}

	;(() => {
		if(!cookieContainer || !accept || !custom || !reject) return

		reject.onclick = () => {
			// dismissCookie()
		}

		accept.onclick = () => {
			// localStorage.cookieAccept = 1
			// dismissCookie()
		}

		// Show the cookie options
		custom.collapsed = true

		custom.onclick = () => {
			let cookieSettings = document.getElementById("moreCookieSettings")
			if(!cookieSettings) return

			if (custom.collapsed) {
				cookieSettings.style.height = 'auto'
				cookieSettings.style.opacity = '1'
				cookieSettings.style.padding = '16px 32px 0 32px'
				custom.collapsed = false
			} else {
				cookieSettings.style.height = '0'
				cookieSettings.style.opacity = '0'
				cookieSettings.style.padding = '0'
				custom.collapsed = true
			}
		}

		// Disable google analytics when button is disabled
		const google = document.getElementById('googleAnalyticsCookieToggler')
		if (google) {
			google.onchange = () => {
				localStorage.googleAnalyticsCookie = google.checked ? 1 : 0
			}
		}

		// Disable disqus when button is disabled
		const disqus = document.getElementById('disqusCookieToggler')
		if (disqus) {
			disqus.onchange = () => {
				localStorage.disqusCookie = disqus.checked ? 1 : 0
			}
		}
	})()

		const PARTICLES = 10
		const bgColors = ['#f55', '#f33', '#f88']

		for(let i = 0 ; i < PARTICLES ; ++i) {
			let div = document.createElement('div')
			div.setAttribute('class', 'cookie-background')
			div.style.position = 'absolute'
			div.style.zIndex = '-1'
			div.style.opacity = '0.35'
			div.style.top = `${Math.random() * 100}%`
			div.style.left = `${Math.random() * 100}%`
			div.style.backgroundColor = bgColors[Math.floor(Math.random() * bgColors.length)]
			div.style.padding = `${Math.ceil(Math.random() * 2) + 1}px`
			cookieContainer.appendChild(div)
		}
})

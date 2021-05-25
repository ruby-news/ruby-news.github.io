document.addEventListener('DOMContentLoaded', function() {
	// Make navbar white and shadowed when scrolled
	const navbar = document.querySelector('.css-navbar')

	;(() => {
		if (!navbar) return
		navbar.shadowed = false

		window.addEventListener('scroll', () => {
			console.log(navbar.shadowed)

			if(window.scrollY > navbar.offsetHeight) {
				if (!navbar.shadowed) {
					navbar.shadowed = true
					navbar.style.boxShadow = '2px 2px 6px #0002'
					navbar.style.backgroundColor = '#fff'
				}
			} else if(navbar.shadowed) {
				navbar.shadowed = false
				navbar.style.boxShadow = 'none'
				navbar.style.backgroundColor = 'transparent'
			}
		})
	})()
})

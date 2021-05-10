window.addEventListener('load', function() {
	for(let i of document.querySelectorAll('pre')) {
		let html = i.innerHTML
		i.innerHTML = html.split("\n").map(x => x.trim() + "\n").join('').trim()
	}

})

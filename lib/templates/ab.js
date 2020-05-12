const AB = {
	// Check every X milliseconds if the element exists | Returns Promise
	waitForElement: (e, initialStyle) => {
		// Hide element
		let css = `${e} { display: none; }`
		let s = document.createElement('style')
		s.innerHTML = css
		document.querySelector('head').append(s)

		var counter = 0
		return new Promise((resolve, reject) => {
			var myInv = setInterval(function () {
				if (counter > 100) {
					reject()
					clearInterval(myInv)
				} else {
					if (document.querySelector(e)) {
						document.querySelector(e).style.display = initialStyle
						resolve(document.querySelector(e))
						clearInterval(myInv)
					} else {
						counter++
					}
				}
			}, 10)
		})
	},

	whenDomReady: () => {
		return new Promise((resolve, reject) => {
			document.addEventListener('DOMContentLoaded', (event) => {
				resolve()
			})
		})
	},

	placeBefore: (newNode, referenceNode) => {
		referenceNode.parentNode.insertBefore(newNode, referenceNode)
	},

	placeAfter: (newNode, referenceNode) => {
		referenceNode.parentNode.insertBefore(
			newNode,
			referenceNode.nextSibling,
		)
	},

	makeNode: (html) => {
		let e = document.createRange().createContextualFragment(html)
		return e
	},

	addCss: (css) => {
		var s = document.createElement('style')
		s.innerHTML = css
		var h = document.querySelector('head')
		h.append(s)
	},

	domReady: () => {
		return new Promise((resolve) => {
			document.addEventListener('DOMContentLoaded', fn)
			if (
				document.readyState === 'interactive' ||
				document.readyState === 'complete'
			) {
				resolve()
			}
		})
	},

	removeThis: (e) => {
		e.parentElement.removeChild(e)
	},
}

export default AB

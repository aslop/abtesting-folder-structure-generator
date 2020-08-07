const AB = {
	// Check every X milliseconds if the element exists | Returns Promise
	waitForElement: function (e, initialStyle) {
		const s = this.addCss(`${e} { display: none; };`)
		var counter = 0
		return new Promise((resolve, reject) => {
			var myInv = setInterval(() => {
				if (counter > 100) {
					reject('took too long')
					clearInterval(myInv)
				} else {
					if (document.querySelectorAll(e)) {
						this.removeThis(s)
						if (document.querySelectorAll(e).length > 1) {
							resolve(document.querySelectorAll(e))
						} else {
							resolve(document.querySelector(e))
						}
						clearInterval(myInv)
					} else {
						counter++
					}
				}
			}, 10)
		})
	},

	addErrorListener: function (experimentId) {
		window.addEventListener('error', function ({ message }) {
			AB.sendErrorToLogger(experimentId, message)
			return false
		})
	},

	sendErrorToLogger: function (experiment, error) {
		const loggerUrl = `https://experiment-error-logger.vercel.app/newLog`
		const xhr = new XMLHttpRequest()
		xhr.open('POST', loggerUrl, true)
		xhr.setRequestHeader('Content-Type', 'application/json')
		xhr.send(
			JSON.stringify({
				experiment: experiment,
				error: error,
			}),
		)
	},

	parseHtmlTemplate: function (myHtml, toReplace) {
		const regex = /({{.*?}})/g
		let tmpHtml = myHtml
		let m

		for (let [key, value] of Object.entries(toReplace)) {
			while ((m = regex.exec(myHtml)) !== null) {
				if (m.index === regex.lastIndex) {
					regex.lastIndex++
				}

				m.forEach((match, groupIndex) => {
					let tmpStr = match.replace('{{', '')
					let tmpStr2 = tmpStr.replace('}}', '')

					if (tmpStr2 == key) {
						tmpHtml = tmpHtml.replace(`${match}`, value)
					}
				})
			}
		}
		return tmpHtml
	},

	whenDomReady: function () {
		return new Promise((resolve, reject) => {
			document.addEventListener('DOMContentLoaded', (event) => {
				resolve()
			})
		})
	},

	placeBefore: function (newNode, referenceNode) {
		referenceNode.parentNode.insertBefore(newNode, referenceNode)
	},

	placeAfter: function (newNode, referenceNode) {
		referenceNode.parentNode.insertBefore(
			newNode,
			referenceNode.nextSibling,
		)
	},

	makeNode: function (html) {
		let e = document.createRange().createContextualFragment(html)
		return e
	},

	addCss: function (css) {
		var s = document.createElement('style')
		s.innerHTML = css
		var h = document.querySelector('head')
		h.appendChild(s)
		return s
	},

	domReady: function () {
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

	removeThis: function (e) {
		e.parentElement.removeChild(e)
	},
}

export default AB

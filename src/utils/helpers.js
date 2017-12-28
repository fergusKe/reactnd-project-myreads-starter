export const randomString = () => {
  return Math.random().toString(36).substring(5)
}

export function preloadImage(images, options) {
	let count = 0

	images.forEach((img, idx) => {
		let imgObj = new Image()

		imgObj.onload = function() {
			loaded()
		}

		imgObj.onerror = function() {
			loaded()
		}

		imgObj.src = img
	})

	function loaded() {
		count += 1
		options.each && options.each(count)

		if (count === images.length) {
			options.all && options.all(count)
		}
	}
}

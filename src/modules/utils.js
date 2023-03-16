export function getUpdateDate(date) {
	const d = new Date(date)

	const monthNames = [
		'Январь',
		'Февраль',
		'Март',
		'Апрель',
		'Май',
		'Июнь',
		'Июль',
		'Август',
		'Сентябрь',
		'Октябрь',
		'Ноябрь',
		'Декабрь'
	]

	const day = d.getDate()
	const month = monthNames[d.getMonth()].slice(0, 3)
	const year = d.getFullYear()

	const result = `${month} ${day} ${year}`

	return result
}

export function createNothingFoundBlock() {
	const nothingFoundBlock = document.createElement('div')
	nothingFoundBlock.textContent = 'Ничего не найдено 😒'
	nothingFoundBlock.setAttribute('id', 'repos-nothing')

	return nothingFoundBlock.outerHTML
}

export function createRepoBlock(avatar, author, repoName, repoLink, stars, updatedDate) {
	const repoBlock = `<div class="repo__block">
    <div class="repo__top">
      <img src="${avatar}" alt="avatar" />
      <div class="repo__author">${author}</div>
    </div>
    <div class="repo__content"><a href="${repoLink}" target="_blank">${repoName}</a></div>
    <div class="repo__bottom">
      <div class="repo__stars">
        <img src="./img/star.svg" alt="star" />
        <span>${stars}</span>
      </div>
      <div class="repo__update">Обновлено ${updatedDate}</div>
    </div>
  </div>`

	return repoBlock
}

export function createError(input, text) {
	input.classList.add('error')

	const parent = input.parentElement
	const errorLabel = document.createElement('label')

	errorLabel.classList.add('error__label')
	errorLabel.textContent = text
	errorLabel.style.top = input.offsetHeight + 'px'

	parent.append(errorLabel)
}

export function removeError(input) {
	if (input.classList.contains('error')) {
		input.classList.remove('error')
		input.parentElement.querySelector('.error__label').remove()
	}
}

export function clearForm(...inputs) {
	inputs.forEach((input) => {
		removeError(input)
		input.value = ''
	})
}

export async function getRemoteData(endPoint) {
	try {
		const apiUrl = 'https://api.github.com/search/repositories?q='

		// const token = ''

		// const myHeaders = new Headers({
		// 	'Content-Type': 'application/json',
		// 	Authorization: token
		// })

		// const response = await fetch(apiUrl + endPoint, {
		// 	method: 'GET',
		// 	headers: myHeaders
		// })

		const response = await fetch(apiUrl + endPoint)

		const result = await response.json()
		return result
	} catch (error) {
		console.error(error)
	}
}

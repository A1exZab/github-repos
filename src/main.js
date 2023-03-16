import { validation } from './modules/validation.js'
import { clearForm, removeError } from './modules/utils.js'
import { showRepos } from './modules/repos-block.js'

document.addEventListener('DOMContentLoaded', function () {
	const form = document.querySelector('#form')
	const searchInput = document.querySelector('#formSearch')

	form.addEventListener('submit', function (e) {
		e.preventDefault()
		this[0].focus()

		if (validation(this)) {
			showRepos(searchInput.value)
			clearForm(searchInput)
			this[0].blur()
		}
	})

	form.addEventListener('input', function (e) {
		const input = e.target

		if (input.dataset.required === 'true' && input.value.trim() !== '') {
			removeError(input)
		}
	})

	document.querySelector('.cancel-btn').addEventListener('click', () => clearForm(searchInput))
})

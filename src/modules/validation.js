import { createError, removeError } from './utils'

export function validation(form) {
	let result = true

	const allInputs = form.querySelectorAll('.form__input')

	allInputs.forEach((input) => {
		if (input.dataset.required === 'true') {
			removeError(input)
			if (input.value.trim() === '') {
				createError(input, 'Поле не заполнено!')
				result = false
			} else if (input.value.trim().length < 3) {
				createError(input, 'Минимальное количество символов для поиска - 3!')
				result = false
			}
		}
	})

	return result
}

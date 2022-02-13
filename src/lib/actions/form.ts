// https://github.com/sveltejs/kit/blob/master/packages/create-svelte/templates/default/src/lib/form.ts
export function enhance(form: HTMLFormElement, { result }) {
	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault()

		try {
			const response = await fetch(form.action, {
				method: form.method,
				headers: { accept: 'application/json' },
				body: new FormData(form)
			})

			if (response.ok) {
				// console.log('API response', await response.json())
				result(response, form)
			}
		} catch (error) {
			console.error(`Something went wrong: ${error}`)
		}
	}

	form.addEventListener('submit', handleSubmit)

	return {
		destroy() {
			form.removeEventListener('submit', handleSubmit)
		}
	}
}

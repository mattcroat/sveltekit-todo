import type { RequestHandler } from '@sveltejs/kit'

const todos: Todo[] = []

export const get: RequestHandler = () => {
	return {
		status: 200,
		body: todos
	}
}

export const post: RequestHandler = async ({ request }) => {
	const form = await request.formData()
	const text = form.get('text') as string

	todos.push({
		created_at: new Date(),
		text,
		done: false
	})

	/* avoid form redirect */
	return {
		status: 303,
		headers: {
			location: '/'
		}
	}
}

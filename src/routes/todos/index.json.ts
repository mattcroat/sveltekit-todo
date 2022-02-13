import type { RequestHandler } from '@sveltejs/kit'
import { api } from './_api'

export const get: RequestHandler = ({ request }) => {
	return api(request)
}

export const post: RequestHandler = async ({ request }) => {
	const form = await request.formData()
	const text = form.get('text') as string
	const todo = { text, done: false }
	return api(request, todo)
}

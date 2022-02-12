import type { RequestHandler } from '@sveltejs/kit'
import { api } from './_api'

export const del: RequestHandler = ({
	params,
	request
}) => {
	return api(request, null, params)
}

export const patch: RequestHandler = async ({
	request,
	params
}) => {
	const form = await request.formData()
	const text = form.get('text') as string
	const done = form.has('done')
		? !!form.get('done')
		: undefined
	return api(request, { text, done }, params)
}

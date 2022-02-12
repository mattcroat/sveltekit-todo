import type { RequestHandler } from '@sveltejs/kit'
import { api } from './_api'

export const del: RequestHandler = ({
	params,
	request
}) => {
	return api(request, null, params)
}

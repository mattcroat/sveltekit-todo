import PrismaClient from '$lib/prisma'

const prisma = new PrismaClient()

// this is gross, _api should be refactored
// https://github.com/sveltejs/kit/blob/master/packages/create-svelte/templates/default/src/routes/todos/_api.ts

// https://developer.mozilla.org/en-US/docs/Web/API/Request
export async function api(
	request: Request,
	data?: Record<string, unknown>,
	params?: Record<string, string>
) {
	let body = {}
	let status = 500

	switch (request.method) {
		case 'GET':
			body = await prisma.todo.findMany()
			status = 200
			break
		case 'POST':
			body = await prisma.todo.create({
				data: {
					text: data.text as string,
					done: data.done as boolean
				}
			})
			status = 201
			break
		case 'DELETE':
			body = await prisma.todo.delete({
				where: { uid: params.uid }
			})
			status = 200
			break
		case 'PATCH':
			body = await prisma.todo.update({
				where: { uid: params.uid },
				data: { text: data.text, done: data.done }
			})
			status = 200
			break
		default:
			break
	}

	// we need to differentiate who made the request
	// browser does "GET" and "POST" and rest we redirect
	// but for JavaScript we send a special "accept" header
	if (
		request.method !== 'GET' &&
		request.headers.get('accept') !== 'application/json'
	) {
		// avoid form redirect
		return {
			status: 303,
			headers: {
				location: '/'
			}
		}
	}

	return {
		status,
		body
	}
}

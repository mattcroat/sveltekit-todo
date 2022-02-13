let todos: Todo[] = []

// this is gross, _api should be refactored
// https://github.com/sveltejs/kit/blob/master/packages/create-svelte/templates/default/src/routes/todos/_api.ts

// https://developer.mozilla.org/en-US/docs/Web/API/Request
export function api(
	request: Request,
	data?: Record<string, unknown>,
	params?: Record<string, string>
) {
	let body = {}
	let status = 500

	switch (request.method) {
		case 'GET':
			body = todos
			status = 200
			break
		case 'POST':
			todos.push(data as Todo)
			body = data
			status = 201
			break
		case 'DELETE':
			todos = todos.filter(
				(todo) => todo.uid !== params.uid
			)
			status = 200
			break
		case 'PATCH':
			todos = todos.map((todo) => {
				if (todo.uid === params.uid) {
					if (data.text) {
						todo.text = data.text as string
					}
					if (!data.text) {
						todo.done = data.done as boolean
					}
				}
				return todo
			})
			status = 200
			body = todos.find((todo) => todo.uid === params.uid)
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

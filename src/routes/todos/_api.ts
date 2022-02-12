let todos: Todo[] = []

// https://developer.mozilla.org/en-US/docs/Web/API/Request
export function api(
	request: Request,
	todo?: Todo,
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
			todos.push(todo)
			body = todo
			body = 201
			break
		case 'DELETE':
			todos = todos.filter(
				(todo) => todo.uid !== params.uid
			)
			status = 200
			break
		default:
			break
	}

	if (request.method !== 'GET') {
		/* avoid form redirect */
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

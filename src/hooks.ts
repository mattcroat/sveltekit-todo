import type { Handle } from '@sveltejs/kit'

// this is no longer required
// https://kit.svelte.dev/docs/routing#endpoints-http-method-overrides
export const handle: Handle = async ({
	event,
	resolve
}) => {
	console.log(`METHOD: ${event.request.method}`)
	const response = await resolve(event)
	return response
}

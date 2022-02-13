/// <reference types="@sveltejs/kit" />

// please don't use a global.d.ts file
// or "magically available interfaces"
// for code that you are writing

type Todo = {
	uid: string
	created_at: Date
	text: string
	done: boolean
}

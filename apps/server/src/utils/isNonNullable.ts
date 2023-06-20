export function isNonNullable<T>(val: T): asserts val is NonNullable<T> {
	// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
	if (!val) {
		throw Error(`Expected 'val' to be defined, but received ${String(val)}`)
	}
}

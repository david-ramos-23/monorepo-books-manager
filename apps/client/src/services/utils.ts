export async function fetchData(input: RequestInfo, init?: RequestInit) {
  return await fetch(input, init).then(async (res) => {
    if (!res.ok) {
      throw Error(`Error HTTP: ${res.status}`, { cause: res.statusText })
    }

    return await res.json()
  })
}

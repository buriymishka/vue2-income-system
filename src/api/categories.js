import server from './http'

export async function load() {
  return await server.get('category')
}

export async function create(data) {
  return await server.post('category', data)
}

export async function remove(id) {
  return await server.delete(`category/${id}`)
}

export async function loadById(id) {
  return await server.get(`category/${id}`)
}

export async function update(data) {
  return await server.put('category', data)
}

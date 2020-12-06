import server from './http'

export async function load() {
  return await server.get('category/load')
}

export async function create(data) {
  return await server.post('category/create', data)
}

export async function remove(id) {
  return await server.delete(`category/remove/${id}`)
}

export async function loadById(id) {
  return await server.get(`category/loadById/${id}`)
}

export async function update(data) {
  return await server.put('category/update', data)
}

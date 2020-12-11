import server from './http'

export async function load() {
  return await server.get('record')
}

export async function create(data) {
  return await server.post('record', data)
}

export async function update(data) {
  return await server.put('record', data)
}

export async function remove(id) {
  return await server.delete(`record/${id}`)
}

export async function loadById(id) {
  return await server.get(`record/${id}`)
}
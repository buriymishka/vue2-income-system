import server from './http'

export async function load() {
  return await server.get('record/load')
}

export async function create(data) {
  return await server.post('record/create', data)
}

export async function update(data) {
  return await server.put('record/update', data)
}

export async function remove(id) {
  return await server.delete(`record/remove/${id}`)
}

export async function loadById(id) {
  return await server.get(`record/loadById/${id}`)
}
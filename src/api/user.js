import server from './http'

export async function login(data) {
  return await server.post('user/signIn', data)
}

export async function signUp(data) {
  return await server.post('user/signUp', data)
}

export async function recover(data) {
  return await server.post('user/recover', data)
}

export async function load() {
  return await server.get('user/load')
}

export async function update(data) {
  return await server.put('user/update', data)
}

export async function loadIncome() {
  return await server.get('user/loadIncome')
}

export async function loadOutcome() {
  return await server.get('user/loadOutcome')
}

export async function logout() {
  return await server.post('user/logout')
}

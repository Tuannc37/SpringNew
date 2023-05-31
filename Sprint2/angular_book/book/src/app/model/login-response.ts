export interface LoginResponse {
  jwt?: string,
  username?: string,
  roles?: string[],
  name?: string,
  id: number
}

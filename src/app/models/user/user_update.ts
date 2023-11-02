export interface UserUpdate {
  id: number,
  email: string,
  name: string,
  password: string,
  newPassword?: string,
  confirmPassword?: string,
}

import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import UserPermission from './user_permission.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare role_name: 'ADMIN' | 'USER'

  @hasMany(() => UserPermission, { foreignKey: 'role_id' })
  declare permission: HasMany<typeof UserPermission>
}
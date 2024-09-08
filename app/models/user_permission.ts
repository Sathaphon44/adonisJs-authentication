import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Role from './role.js'

export default class UserPermission extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare role_id: number

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>
}
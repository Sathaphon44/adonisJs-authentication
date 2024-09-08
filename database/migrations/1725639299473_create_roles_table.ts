import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enum('role_name', ['ADMIN', 'USER'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
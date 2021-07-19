import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.integer('role_id')
        .unsigned()

      table.foreign('role_id')
        .references('roles.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropForeign('role_id')
    })
  }
}

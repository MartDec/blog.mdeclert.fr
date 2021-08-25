import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Posts extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.boolean('active').defaultTo(false)
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('active')
    })
  }
}

import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Role extends BaseModel {
  public static readonly ROLE_READER = 1
  public static readonly ROLE_ADMIN = 2

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string
}

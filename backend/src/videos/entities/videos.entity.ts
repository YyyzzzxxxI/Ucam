import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({
  name: "videos"
})
export class Videos {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column({
    unique: true
  })
  videoName: string
}
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'videos'
})
export class Videos {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: string

  @Column({
    unique: true
  })
  videoName: string
}
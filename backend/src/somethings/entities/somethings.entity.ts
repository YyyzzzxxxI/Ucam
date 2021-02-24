import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'somethings',
})
export class Somethings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  isNice: boolean
}

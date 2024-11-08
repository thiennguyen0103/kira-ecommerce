import { AutoMap } from '@automapper/classes';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'file',
})
export class FileEntity extends AbstractEntity {
  @AutoMap()
  @Column({ type: String })
  path: string;
}

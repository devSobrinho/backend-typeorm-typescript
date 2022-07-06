import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('categories')
class Category {
    @PrimaryColumn()
    id?: string;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @CreateDateColumn({ name: 'createdAt' })
    created_at!: Date;

    // @UpdateDateColumn({ name: 'updatedAt' })
    // updated_at!: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Category };

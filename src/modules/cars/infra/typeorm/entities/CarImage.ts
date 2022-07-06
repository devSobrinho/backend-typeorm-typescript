import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Car } from './Car';

@Entity('cars_image')
class CarImage {
    @PrimaryColumn()
    id?: string;

    @Column()
    image_name!: string;

    @CreateDateColumn()
    created_at!: Date;

    // @ManyToOne(() => Car)

    @Column()
    car_id!: string;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { CarImage };

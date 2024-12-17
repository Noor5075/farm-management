import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { FarmLocation } from 'src/farm_location/Enties/farm_location.entity';
import { Planting } from 'src/planting/entities/planting.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const SECRET_KEY = crypto
  .createHash('sha256')
  .update('Hello_key')
  .digest('base64')
  .substring(0, 32); // Ensure the key is 32 bytes
const IV_LENGTH = 16;

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: number;

  @Column()
  username: string;

  @Column({ default: '' })
  email: string;

  @Column()
  password: string;

  @Column()
  admin: boolean;

  @OneToMany(() => FarmLocation, (farmLocation) => farmLocation.user)
  farmLocations: FarmLocation[];

  @OneToMany(() => Planting, (planting) => planting.user)
  planting: Planting[];

  @BeforeInsert()
  @BeforeUpdate()
  async encryptPassword() {
    if (this.password) {
      const iv = crypto.randomBytes(IV_LENGTH);
      const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
      let encrypted = cipher.update(this.password, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      this.password = `${iv.toString('hex')}:${encrypted}`; // Store as IV:EncryptedPassword
    }
  }

  async decryptPassword(): Promise<string> {
    const parts = this.password.split(':');
    if (parts.length !== 2) {
      throw new Error('Invalid password format');
    }
    const [ivHex, encryptedPassword] = parts;
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
    let decrypted = decipher.update(encryptedPassword, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
  
  async validatePassword(password: string): Promise<boolean> {
    try {
      const decryptedPassword = await this.decryptPassword();
      return password === decryptedPassword;
    } catch (err) {
      console.error('Error decrypting password:', err.message);
      // Fallback for plaintext passwords (if applicable)
      return password === this.password; 
    }
  }  
}

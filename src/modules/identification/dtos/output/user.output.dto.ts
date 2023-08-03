import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserOutputDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  validateAt: Date | null;

  @Expose()
  createdAt: Date;
}

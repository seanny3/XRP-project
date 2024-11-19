import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetPolicyDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  url: string;

  @Expose()
  required: boolean;

  @Expose()
  type: string;
}

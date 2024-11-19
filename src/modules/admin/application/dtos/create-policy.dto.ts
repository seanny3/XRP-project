export class CreatePolicyDto {
  constructor(
    public readonly title: string,
    public readonly description: string | null,
    public readonly url: string,
    public readonly required: boolean,
    public readonly type: string,
  ) {}
}

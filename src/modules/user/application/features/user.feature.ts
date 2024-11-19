import { Injectable } from '@nestjs/common';
import { UserAgentDto } from '@user/interface/dtos/common/user-agent.dto';
import { CreateUserTokenPayloadDto } from '@user/interface/dtos/common/create-user-token-payload.dto';
import { RegisterRequestBodyDto } from '@user/interface/dtos/request/register.body.dto';
import { ConflictException } from '@exception/custom/conflict.exception';
import { UserExceptionEnum } from '@exception/enum/user.enum';
import { UserService } from '@user/application/services/user.service';
import { PrismaService } from '@persistence/prisma/prisma.service';
import { AuthService } from '@user/application/services/auth.service';
import { TokenService } from '@user/application/services/token.service';
import { UserDeviceService } from '@user/application/services/user-device.service';
import { TpaService } from '@user/application/services/tpa.service';
import { UserPolicyAgreementService } from '@user/application/services/user-policy-agreement.service';
import { GetAuthTokensDto } from '@user/application/dtos/get-auth-tokens.dto';
import { PolicyService } from '@user/application/services/policy.service';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from '@user/application/dtos/create-user.dto';
import { CreateTpaDto } from '@user/application/dtos/create-tpa.dto';

@Injectable()
export class UserFeature {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly policyService: PolicyService,
    private readonly userDeviceService: UserDeviceService,
    private readonly thirdPartyAccountService: TpaService,
    private readonly userPolicyAgreementService: UserPolicyAgreementService,
  ) {}

  async register(
    ip: string,
    userAgent: UserAgentDto,
    signupTokenPayloadDto: CreateUserTokenPayloadDto,
    registerRequestBodyDto: RegisterRequestBodyDto,
  ): Promise<GetAuthTokensDto> {
    const { email, oauthInfo } = signupTokenPayloadDto;
    let result: GetAuthTokensDto;

    const foundUser = await this.userService.getUserByEmail(email);
    if (foundUser) {
      throw new ConflictException(UserExceptionEnum.UserAlreadyExist);
    }

    await this.prisma.$transaction(async (tx) => {
      const { agreedPolicies, ...registerInfo } = registerRequestBodyDto;

      // 유저 생성
      const createUserDto = plainToInstance(CreateUserDto, {
        handle: await this.userService.getRandomHandle(
          registerRequestBodyDto.name,
        ),
        ...registerInfo,
      });
      const createdUser = await this.userService.createUser(createUserDto, tx);

      // 인증 생성
      await this.authService.createAuth(createdUser.id, email, tx);

      // 디바이스 생성
      const createdDevice = await this.userDeviceService.createUserDevice(
        createdUser.id,
        ip,
        userAgent,
        tx,
      );
      if (oauthInfo) {
        // 소셜가입자면 TPA 생성
        const createTpaDto = plainToInstance(CreateTpaDto, oauthInfo);
        await this.thirdPartyAccountService.createTpa(
          createdUser.id,
          createTpaDto,
          tx,
        );
      }

      // 필수 약관 동의
      await this.policyService.isAgreedRequiredPolicies(agreedPolicies);
      for (const policyType of agreedPolicies) {
        await this.userPolicyAgreementService.createUserPolicyAgreement(
          createdUser.id,
          policyType,
          tx,
        );
      }

      // 액세스토큰, 리프레시토큰 생성
      result = await this.tokenService.createAuthToken(
        email,
        createdUser,
        createdDevice,
      );
    });
    return result;
  }

  async checkDuplicateHandle(handle: string): Promise<void> {
    await this.userService.checkDuplicateHandle(handle);
  }

  async checkDuplicateEmail(email: string): Promise<void> {
    await this.userService.checkDuplicateEmail(email);
  }

  async updateHandle(userId: string, handle: string): Promise<void> {
    await this.userService.updateHandle(userId, handle);
  }
}

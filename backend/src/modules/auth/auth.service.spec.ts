import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ForbiddenException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

jest.mock('argon2');

describe('AuthService', () => {
  let service: AuthService;

  const mockPrismaService = {
    user: {
      create: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  const mockJwtService = {
    signAsync: jest.fn().mockResolvedValue('signedToken'),
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === 'TOKEN_COOKIE_MODE') return 'false';
      if (key === 'FRONTEND_DOMAIN') return 'localhost';
      if (key === 'JWT_ACCESS_TOKEN_SECRET') return 'access_secret';
      if (key === 'JWT_REFRESH_TOKEN_SECRET') return 'refresh_secret';
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTokens', () => {
    it('should return access and refresh tokens', async () => {
      const result = await service.getTokens(1, 'test@example.com');
      expect(result).toEqual({ accessToken: 'signedToken', refreshToken: 'signedToken' });
    });
  });

  describe('signIn', () => {
    it('should throw if user is not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);
      const dto: AuthDto = { email: 'test@example.com', password: 'pass' };
      await expect(service.signIn(dto, {} as any)).rejects.toThrow(ForbiddenException);
    });

    it('should throw if password does not match', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({ email: 'test@example.com', hash: 'hashedpw' });
      (argon2.verify as jest.Mock).mockResolvedValue(false);
      const dto: AuthDto = { email: 'test@example.com', password: 'wrongpass' };
      await expect(service.signIn(dto, {} as any)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('signUp', () => {
    it('should return tokens after successful signup', async () => {
      (argon2.hash as jest.Mock).mockResolvedValue('hashedpw');
      mockPrismaService.user.create.mockResolvedValue({ id: 1, email: 'test@example.com' });
      mockPrismaService.user.update.mockResolvedValue({});
      const dto: AuthDto = { email: 'test@example.com', password: 'pass' };
      const result = await service.signUp(dto, { cookie: jest.fn() } as any);
      expect(result).toEqual({ accessToken: 'signedToken', refreshToken: 'signedToken' });
    });

    it('should throw if email already exists (P2002)', async () => {
      (argon2.hash as jest.Mock).mockResolvedValue('hashedpw');
      const prismaError = new PrismaClientKnownRequestError('Email already exists', {
        code: 'P2002',
        clientVersion: '4.15.0',
      } as any);
      mockPrismaService.user.create.mockRejectedValue(prismaError);
      const dto: AuthDto = { email: 'test@example.com', password: 'pass' };
      await expect(service.signUp(dto, {} as any)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('refreshTokens', () => {
    it('should throw if user is not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);
      await expect(service.refreshTokens(1, 'token', {} as any)).rejects.toThrow(ForbiddenException);
    });

    it('should throw if token does not match', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({ refreshToken: 'hashedToken', email: 'test@example.com', id: 1 });
      (argon2.verify as jest.Mock).mockResolvedValue(false);
      await expect(service.refreshTokens(1, 'wrongToken', {} as any)).rejects.toThrow(ForbiddenException);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CsrfService } from './csrf.service';
import { ConfigService } from '@nestjs/config';

jest.mock('csrf-csrf', () => ({
  doubleCsrf: jest.fn(() => ({
    generateToken: jest.fn().mockReturnValue('mock-csrf-token')
  }))
}));

describe('CsrfService', () => {
  let service: CsrfService;
  let configService: Partial<ConfigService>;

  beforeEach(async () => {
    configService = {
      get: jest.fn((key: string) => {
        if (key === 'CSRF_SECRET') return 'test-secret';
        if (key === 'CSRF_COOKIE_NAME') return 'csrf-cookie';
        return undefined;
      })
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CsrfService,
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    service = module.get<CsrfService>(CsrfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getToken', () => {
    it('should return a CSRF token and set cookie', () => {
      const req = {} as any;
      const res = {
        cookie: jest.fn()
      } as any;

      const result = service.getToken(req, res);

      expect(result).toEqual({ token: 'mock-csrf-token' });
      expect(res.cookie).toHaveBeenCalledWith('csrf-cookie', 'mock-csrf-token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        path: '/',
      });
    });
  });
});

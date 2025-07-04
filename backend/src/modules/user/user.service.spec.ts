import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common';
import { ModifyUserDto } from './dto/modify-user.dto';

describe('UserService', () => {
  let service: UserService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserById', () => {
    it('should return user if found', async () => {
      const user = { id: 1, firstName: 'John', lastName: 'Doe' };
      mockPrismaService.user.findUnique.mockResolvedValue(user);

      const result = await service.getUserById(1);
      expect(result).toEqual(user);
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw ForbiddenException if user not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.getUserById(1)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('updateUser', () => {
    it('should update and return user if found', async () => {
      const inputs: ModifyUserDto = { userId: 1, firstName: 'Jane', lastName: 'Smith' };
      const updatedUser = { id: 1, firstName: 'Jane', lastName: 'Smith' };
      mockPrismaService.user.update.mockResolvedValue(updatedUser);

      const result = await service.updateUser(inputs);
      expect(result).toEqual(updatedUser);
      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: inputs.userId },
        data: { firstName: inputs.firstName, lastName: inputs.lastName },
      });
    });

    it('should throw ForbiddenException if update fails', async () => {
      const inputs: ModifyUserDto = { userId: 1, firstName: 'Jane', lastName: 'Smith' };
      mockPrismaService.user.update.mockResolvedValue(null);

      await expect(service.updateUser(inputs)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('findAll', () => {
    it('should return array of users', async () => {
      const users = [
        { id: 1, firstName: 'John', lastName: 'Doe' },
        { id: 2, firstName: 'Jane', lastName: 'Smith' },
      ];
      mockPrismaService.user.findMany.mockResolvedValue(users);

      const result = await service.findAll();
      expect(result).toEqual(users);
      expect(mockPrismaService.user.findMany).toHaveBeenCalled();
    });
  });
});

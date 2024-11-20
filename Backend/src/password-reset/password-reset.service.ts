import { Injectable, BadRequestException } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordResetToken } from '../models/password-reset-token.entity';
import { User } from '../models/User.entity';

@Injectable()
export class PasswordResetService {
  constructor(
    @InjectRepository(PasswordResetToken)
    private readonly passwordResetTokenRepository: Repository<PasswordResetToken>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailService: MailService,
  ) {}

  async createPasswordResetToken(email: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user)
      throw new BadRequestException('User with this email does not exist.');

    const token = await bcrypt.hash(user.email + Date.now().toString(), 10);
    const passwordResetToken = this.passwordResetTokenRepository.create({
      user,
      token,
      createdAt: new Date(),
    });

    await this.passwordResetTokenRepository.save(passwordResetToken);
    return token;
  }

  async sendPasswordResetEmail(email: string) {
    const token = await this.createPasswordResetToken(email);
    await this.mailService.sendEmailForgotPassword(email, token);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const resetToken = await this.passwordResetTokenRepository.findOne({
      where: { token },
      relations: ['user'],
    });

    if (!resetToken) {
      throw new BadRequestException('Invalid or expired token');
    }

    // Хэшируем новый пароль
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Обновляем пароль пользователя
    const user = resetToken.user;
    user.password = hashedPassword;
    await this.userRepository.save(user);

    // Удаляем токен после успешного сброса пароля
    await this.passwordResetTokenRepository.delete(resetToken.id);
  }
}

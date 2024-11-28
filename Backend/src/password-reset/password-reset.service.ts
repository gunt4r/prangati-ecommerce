import { Injectable, BadRequestException } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordResetToken } from '../models/password-reset-token.entity';
import { User } from '../models/User.entity';

@Injectable()
export class PasswordResetService {
  TOKEN_EXPIRATION_MINUTES: number;
  constructor(
    @InjectRepository(PasswordResetToken)
    private readonly passwordResetTokenRepository: Repository<PasswordResetToken>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailService: MailService,
  ) {}

  private async isTokenRequestAllowed(email: string): Promise<boolean> {
    const recentToken = await this.passwordResetTokenRepository.findOne({
      where: { user: { email } },
      order: { createdAt: 'DESC' },
    });

    if (recentToken) {
      const now = new Date();
      const diff =
        (now.getTime() - recentToken.createdAt.getTime()) / 1000 / 60;
      return diff > this.TOKEN_EXPIRATION_MINUTES;
    }

    return true;
  }

  async sendPasswordResetEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('User with this email does not exist.');
    }

    const isAllowed = await this.isTokenRequestAllowed(email);

    if (!isAllowed) {
      throw new BadRequestException(
        'You can request a password reset only once every 20 minutes.',
      );
    }

    const token = await bcrypt.hash(user.email + Date.now().toString(), 10);
    const passwordResetToken = this.passwordResetTokenRepository.create({
      user,
      token,
      createdAt: new Date(),
    });

    await this.passwordResetTokenRepository.save(passwordResetToken);
    await this.mailService.sendResetPasswordLink(email, token);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const resetToken = await this.passwordResetTokenRepository.findOne({
      where: { token },
      relations: ['user'],
    });

    if (!resetToken) {
      throw new BadRequestException('Invalid or expired token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = resetToken.user;

    user.password = hashedPassword;
    await this.userRepository.save(user);

    await this.passwordResetTokenRepository.delete(resetToken.id);
  }
}

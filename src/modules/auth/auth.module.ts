import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginDetailsService } from './entities/provider/logindetail.service';
import { LoginDetail } from './entities/auth.entity';
@Module({
  imports: [TypeOrmModule.forFeature([LoginDetail])],
  providers: [LoginDetailsService],
  exports: [LoginDetailsService],
})
export class AuthModule {}

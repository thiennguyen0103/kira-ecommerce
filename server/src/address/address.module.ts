import { Module } from '@nestjs/common';
import { CityModule } from 'src/city/city.module';
import { DatabaseModule } from 'src/database/database.module';
import { DistrictModule } from 'src/district/district.module';
import { ProvinceModule } from 'src/province/province.module';
import { UserModule } from 'src/user/user.module';
import { WardModule } from 'src/ward/ward.module';
import { AddressController } from './address.controller';
import { AddressProfile } from './address.profile';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/address.entity';

@Module({
  imports: [
    DatabaseModule.forFeature([AddressEntity]),
    UserModule,
    CityModule,
    ProvinceModule,
    DistrictModule,
    WardModule,
  ],
  controllers: [AddressController],
  providers: [AddressService, AddressProfile],
})
export class AddressModule {}

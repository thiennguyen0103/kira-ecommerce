import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityService } from 'src/city/city.service';
import { DistrictService } from 'src/district/district.service';
import { ProvinceService } from 'src/province/province.service';
import { UserService } from 'src/user/user.service';
import { WardService } from 'src/ward/ward.service';
import { Repository } from 'typeorm';
import { AddressResponseDto } from './dto/address-response.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressEntity } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
    private readonly provinceService: ProvinceService,
    private readonly districtService: DistrictService,
    private readonly wardService: WardService,
  ) {}

  async create(createAddressDto: CreateAddressDto, userId: string) {
    const {
      cityId,
      provinceCode,
      districtCode,
      wardCode,
      addressLine,
      isDefault,
    } = createAddressDto;
    const addresses = await this.findAll(userId);
    const isAddressDefault = addresses.length === 0 || isDefault ? true : false;

    const city = await this.cityService.findOne(cityId);
    const province = await this.provinceService.findOne(provinceCode);
    const district = await this.districtService.findOne(districtCode);
    const ward = await this.wardService.findOne(wardCode);

    const address = await this.addressRepository.save(
      this.addressRepository.create({
        addressLine,
        city,
        province,
        district,
        ward,
        userId,
        isDefault: isAddressDefault,
      }),
    );

    return this.mapper.map(address, AddressEntity, AddressResponseDto);
  }

  async findAll(userId: string) {
    const user = await this.userService.findById(userId);
    const addresses = await this.addressRepository.findBy({
      userId: user.id,
    });

    return this.mapper.mapArray(addresses, AddressEntity, AddressResponseDto);
  }

  async update(id: string, userId: string, updateAddressDto: UpdateAddressDto) {
    const user = await this.userService.findById(userId);
    const address = await this.addressRepository.findOneBy({
      id,
      userId: user.id,
    });

    if (!address) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Address not found',
      });
    }
    await this.addressRepository.update(id, updateAddressDto);
    const updatedAddress = await this.addressRepository.findOneBy({
      id,
      userId: user.id,
    });
    return this.mapper.map(updatedAddress, AddressEntity, AddressResponseDto);
  }

  async remove(id: string, userId: string) {
    const user = await this.userService.findById(userId);
    const address = await this.addressRepository.findOneBy({
      id,
      userId: user.id,
    });
    if (!address) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Address not found',
      });
    }
    return this.mapper.map(address, AddressEntity, AddressResponseDto);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/utils/decorators/role.decorator';
import { RoleEnum } from 'src/utils/enums/roles.enum';
import { CardService } from './card.service';
import { AddToCardDto } from './dto/add-to-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@ApiBearerAuth()
@Roles(RoleEnum.Client)
@UseGuards(JwtAuthGuard, RoleGuard)
@ApiTags('Card')
@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  create(@Body() addToCard: AddToCardDto, @Req() req) {
    return this.cardService.addToCard(addToCard, req.user?.id);
  }

  @Get()
  findAll(@Req() req) {
    return this.cardService.findAll(req.user?.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardService.remove(id);
  }
}

import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()  // Asegura que el nombre no esté vacío
  @IsString()    // Asegura que el nombre sea una cadena
  name: string;

  @IsNotEmpty()  // Asegura que la descripción no esté vacía
  @IsString()    // Asegura que la descripción sea una cadena
  description: string;

  @IsNotEmpty()  // Asegura que el precio no esté vacío
  @IsNumber()    // Asegura que el precio sea un número
  price: number;

  @IsNotEmpty()  // Asegura que el stock no esté vacío
  @IsBoolean()    // Asegura que el stock sea un número
  stock: number;

  @IsNotEmpty()  // Esta propiedad es opcional
  @IsString()    // Asegura que sea una cadena
  imgUrl: string; // URL de la imagen
}
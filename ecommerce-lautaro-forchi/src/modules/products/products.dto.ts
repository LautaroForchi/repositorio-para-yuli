import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {

  /**
     * string de maximo 50 caracteres
     * @example 'test name producto'
     */
  @IsNotEmpty()  // Asegura que el nombre no esté vacío
  @IsString()    // Asegura que el nombre sea una cadena
  name: string;

  /**
     * debe ser un string
     * @example 'test descripcion producto'
     */
  @IsNotEmpty()  // Asegura que la descripción no esté vacía
  @IsString()    // Asegura que la descripción sea una cadena
  description: string;

  /**
     * debe ser un numero con dos decimales
     * @example 'test precio 8.99
     */
  @IsNotEmpty()  // Asegura que el precio no esté vacío
  @IsNumber()    // Asegura que el precio sea un número
  price: number;

  /**
     * debe ser un number
     * @example '10'
     */
  @IsNotEmpty()  // Asegura que el stock no esté vacío
  @IsBoolean()    // Asegura que el stock sea un número
  stock: number;
  /**
     * debe ser un string
     * @example 'test url'
     */
  @IsNotEmpty()  // Esta propiedad es opcional
  @IsString()    // Asegura que sea una cadena
  imgUrl: string; // URL de la imagen
}
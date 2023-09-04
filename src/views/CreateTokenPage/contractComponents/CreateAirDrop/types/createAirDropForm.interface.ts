import { IAirDropOptions } from '@cryptodo/contracts';

export interface CreateAirDropForm {
  name: string;
  initialOwner: string;
  options: IAirDropOptions;
}

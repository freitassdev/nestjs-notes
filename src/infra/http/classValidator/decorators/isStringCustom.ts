import { registerDecorator, ValidationOptions, ValidationArguments, isString } from 'class-validator';
import { ExceptionMessage } from '../data/exceptionsMessage';

export function IsStringCustom(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isStringCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return isString(value)
        },
        defaultMessage(validationArguments: ValidationArguments) {
            return ExceptionMessage.IsString(validationArguments.property)
        }
      },
    });
  };
}
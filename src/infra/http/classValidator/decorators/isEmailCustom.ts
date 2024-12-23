import { registerDecorator, ValidationOptions, ValidationArguments, isEmail } from 'class-validator';
import { ExceptionMessage } from '../data/exceptionsMessage';

export function IsEmailCustom(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isEmailCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return isEmail(value)
        },
        defaultMessage(validationArguments: ValidationArguments) {
            return ExceptionMessage.IsEmail(validationArguments.property)
        }
      },
    });
  };
}
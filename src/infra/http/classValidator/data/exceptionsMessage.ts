export const ExceptionMessage = {
    IsNotEmpty: (prop: string) => `${prop} eh obrigatório.`,
    IsEmail: (prop: string) => `${prop} deve ser um email.`,
    IsString: (prop: string) => `${prop} deve ser uma string`,
    MinLength: (prop: string, min: number) => `${prop} deve ter no mínimo ${min} caracteres.`

}
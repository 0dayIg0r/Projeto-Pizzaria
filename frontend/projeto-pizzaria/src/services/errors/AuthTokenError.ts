export class AuthTokenError extends Error{
    constructor(){
        super('Erro na autorização do token.')
    }
}
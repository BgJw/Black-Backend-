/* eslint-disable prettier/prettier */
export const login: IAuth[] = [
    {
        name: 'Metropolia',
        password: 'password'
    },
    {
        name: 'Zaspa',
        password: 'password'
    },
];




export interface IAuth {
    name: string,
    password: string,
} 
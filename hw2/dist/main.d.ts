declare const form: HTMLFormElement;
interface IInput {
    name: HTMLInputElement;
    age: HTMLInputElement;
}
interface IUserForm {
    name: string;
    age: number;
}
interface IUser extends IUserForm {
    id: number;
}
declare class UserService {
    private static readonly _usersKey;
    private static _setToLS;
    private static _getUsers;
    static createUser(user: IUserForm): void;
    private static _deleteUserById;
    private static _updateUserById;
    static renderUsersHTML(): void;
}
declare const createService: () => void;

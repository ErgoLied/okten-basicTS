const form = document.forms['userForm'] as HTMLFormElement;

form.onsubmit = (ev: SubmitEvent) => {
    ev.preventDefault();
    createService();
}

interface IInput {
    name: HTMLInputElement;
    age: HTMLInputElement;
}

interface IUserForm {
    name: string,
    age: number
}

interface IUser extends IUserForm {
    id: number;
}

class UserService {
    private static readonly _usersKey = 'users';

    private static _setToLS(users: IUser[]): void {
        localStorage.setItem(this._usersKey, JSON.stringify(users));
        this.renderUsersHTML();
    }

    private static _getUsers(): IUser[] {
        return JSON.parse(localStorage.getItem(this._usersKey)) || [];
    }

    static createUser(user: IUserForm): void {
        const users = this._getUsers();
        const id = users.length ? users.slice(-1)[0].id + 1 : 1;
        users.push({id, ...user});
        this._setToLS(users);
    }

    private static _deleteUserById(id: number): void {
        this._setToLS(this._getUsers().filter(user => user.id !== id));
    }

    private static _updateUserById(id: number) {
        const users = this._getUsers();
        const user = users.find(user => user.id === id);

        const {name: nameInput, age: ageInput} = form as any as IInput;
        nameInput.value = user.name;
        ageInput.value = String(user.age);

        form.formBtn.innerText = 'update';

        form.onsubmit = (ev) => {
            ev.preventDefault();
            if (!nameInput.value || !ageInput.value) {
                alert('SET NAME and AGE!!!!!!')
            } else {
                user.name = nameInput.value;
                user.age = +ageInput.value;
                this._setToLS(users);
                this.renderUsersHTML();

                form.reset();
                form.onsubmit = (ev): void => {
                    ev.preventDefault();
                    createService();
                }
                form.formBtn.innerText = 'create';
            }
        }
    }

    static renderUsersHTML(): void {
        const usersDiv = document.querySelector('#usersBox') as HTMLDivElement;
        usersDiv.innerHTML = '';

        const users = this._getUsers();

        const usersHTML = users.map(user => {
            const userP = document.createElement('p');
            userP.innerText = `id: ${user.id}, name: ${user.name}, age: ${user.age}`;

            const delBtn = document.createElement('button');
            delBtn.innerText = 'del';

            delBtn.onclick = () => {
                this._deleteUserById(user.id);
            }

            const updBtn = document.createElement('button');
            updBtn.innerText = 'upd';

            updBtn.onclick = () => {
                this._updateUserById(user.id);
            }

            userP.append(delBtn, updBtn);
            return userP;
        });

        users.length ? usersDiv.append(...usersHTML) : usersDiv.innerText = 'add new user';
    }
}

UserService.renderUsersHTML();

const createService = (): void => {
    const {name: nameInput, age: ageInput} = form as any as IInput;
    (!nameInput.value || !ageInput.value)
        ? alert('SET NAME and AGE!!!!!!')
        : UserService.createUser({name: nameInput.value, age: +ageInput.value});

    form.reset();
}
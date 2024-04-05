const form = document.forms['userForm'];
form.onsubmit = (ev) => {
    ev.preventDefault();
    createService();
};
class UserService {
    static _setToLS(users) {
        localStorage.setItem(this._usersKey, JSON.stringify(users));
        this.renderUsersHTML();
    }
    static _getUsers() {
        return JSON.parse(localStorage.getItem(this._usersKey)) || [];
    }
    static createUser(user) {
        const users = this._getUsers();
        const id = users.length ? users.slice(-1)[0].id + 1 : 1;
        users.push({ id, ...user });
        this._setToLS(users);
    }
    static _deleteUserById(id) {
        this._setToLS(this._getUsers().filter(user => user.id !== id));
    }
    static _updateUserById(id) {
        const users = this._getUsers();
        const user = users.find(user => user.id === id);
        const { name: nameInput, age: ageInput } = form;
        nameInput.value = user.name;
        ageInput.value = String(user.age);
        form.formBtn.innerText = 'update';
        form.onsubmit = (ev) => {
            ev.preventDefault();
            if (!nameInput.value || !ageInput.value) {
                alert('SET NAME and AGE!!!!!!');
            }
            else {
                user.name = nameInput.value;
                user.age = +ageInput.value;
                this._setToLS(users);
                this.renderUsersHTML();
                form.reset();
                form.onsubmit = (ev) => {
                    ev.preventDefault();
                    createService();
                };
                form.formBtn.innerText = 'create';
            }
        };
    }
    static renderUsersHTML() {
        const usersDiv = document.querySelector('#usersBox');
        usersDiv.innerHTML = '';
        const users = this._getUsers();
        const usersHTML = users.map(user => {
            const userP = document.createElement('p');
            userP.innerText = `id: ${user.id}, name: ${user.name}, age: ${user.age}`;
            const delBtn = document.createElement('button');
            delBtn.innerText = 'del';
            delBtn.onclick = () => {
                this._deleteUserById(user.id);
            };
            const updBtn = document.createElement('button');
            updBtn.innerText = 'upd';
            updBtn.onclick = () => {
                this._updateUserById(user.id);
            };
            userP.append(delBtn, updBtn);
            return userP;
        });
        users.length ? usersDiv.append(...usersHTML) : usersDiv.innerText = 'add new user';
    }
}
UserService._usersKey = 'users';
UserService.renderUsersHTML();
const createService = () => {
    const { name: nameInput, age: ageInput } = form;
    (!nameInput.value || !ageInput.value)
        ? alert('SET NAME and AGE!!!!!!')
        : UserService.createUser({ name: nameInput.value, age: +ageInput.value });
    form.reset();
};
//# sourceMappingURL=main.js.map
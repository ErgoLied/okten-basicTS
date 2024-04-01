class User{
    constructor(
        public name: string,
        public username: string,
        public email: string,
        public address: {
            street: string,
            suite: string,
            city: string,
            zipcode: string,
            geo: {
                lat: number,
                lng: number
            }
        },
        public phone: string,
        public website: string,
        public company: {
            name: string,
            catchPhrase: string,
            bs: string
        }
    ) {}
}

let user:User = {
    name: 'Nei ONeill',
    username: '7pies',
    email: 'yaneznayu@lol.kek',
    address: {
        street: 'valley of wisdom',
        suite: 'mid',
        city: 'orgrimmar',
        zipcode: '1234567',
        geo: {
            lat: 0,
            lng: 0
        }
    },
    phone: '2283604206934',
    website: 'twitch.com',
    company: {
        name: 'zelenogradskieigrushki',
        catchPhrase: 'game interesting logic deep learning',
        bs: 'real-time e-markets'
    }
}

fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})
    .then((response: Response) => response.json())
    .then((response) => console.log(response));
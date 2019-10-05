const environment = require('./environment');
console.log(environment.host);

module.exports = [
    {
        name:"EmailService",
        host: "http://jsonplaceholder.typicode.com",//environment.host,
        authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMjIyYTA4ODRhYmUwMzdkY2I4MTdlNiIsIm5hbWUiOiJ3YW5nIHhpbmciLCJpYXQiOjE1NDYxNjYxMTAsImV4cCI6MTU0NjE2OTcxMH0.3c3VF0ap8Nh2jzrBPp7RBz8xliHms6Ws9EzyDNK6DXk",
        resources: [
            {
                name: "Send",
                value: "/users"
            }
        ]
    }
]
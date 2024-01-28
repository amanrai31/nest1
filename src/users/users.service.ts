import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users=[
        {
            "id":1,
            "name":"Aman",
            "email":"aman@gmail.com",
            "role":"INTERN",
        },
        {
            "id":2,
            "name":"Rahul",
            "email":"ry@gmail.com",
            "role":"ENGINEER",
        },
        {
            "id":3,
            "name":"Sahil",
            "email":"ss@gmail.com",
            "role":"ADMIN",
        }
    ]

    findAll(role?:'INTERN'|'ENGINEER'|'ADMIN'){
        if(role){
            return this.users.filter(user=> user.role === role)       // callback--- return this.users.filter((user)=> user.role === role) 
        }
        return this.users
    }

    findById(id:number){
        const user = this.users.find(user => user.id === id)
        return user;
    }

    createUser(user:{name:string,email:string,role:'INTERN'|'ENGINEER'|'ADMIN'}){
        const usersByHighestId = [...this.users].sort((a,b)=> b.id - a.id)
        const newUser = {
            id: usersByHighestId[0].id +1,
            ...user
        }
        this.users.push(newUser)
        return newUser
    }

    updateUser(id:number, userUpdate:{ name?:string,email?:string,role?:'INTERN'|'ENGINEER'|'ADMIN'}){    // Mking optional update by ?
        this.users = this.users.map(user => {
            if(user.id === id){
                return {...user, ...userUpdate}
            }
            return user
        })
        return this.findById(id);
    }

    delete(id:number){
        const removedUser = this.findById(id)
        this.users=this.users.filter(user => user.id !==id)
        return removedUser
    }
}

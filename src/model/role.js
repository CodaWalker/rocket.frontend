
export class Role {
    roles = Array();
    name = name;
    id = id;

    constructor() {
    }

    getRoles(){
       return this.roles;
    }

    setRoles(Role) {
        this.roles = Role
    }

    addOne(id,name){
        this.name = name;
        this.id = id;
    }
}

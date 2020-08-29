
export class User {
    constructor(login, password, firstName,lastName, middleName,email,typeUser, specialization, creationDate, roles, locked, accepted, activationCode, id) {
        this.email = email;
        this.login = login;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.typeUser = typeUser;
        this.specialization = specialization;
        this.creationDate = creationDate;
        this.activationCode = activationCode;
        this.roles = roles;
        this.locked = locked;
        this.accepted = accepted;
        this.id = id;
    }
}
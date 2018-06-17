export class User {
    private userId: number;
    private name: string;
    private gender: string;
    private roles: Array<RoleMenu>;
    private mobile: string;
    private email: string;
    private password: string;
    private location: LocationMenu;
    private languages: Array<Language>;

    constructor() {
    }

    public setUserId(userId: number) {
        this.userId = userId;
    }

    public getUserId() {
        return this.userId;
    }

    public setLocation(location: LocationMenu) {
        this.location = location;
    }

    public getLocation() {
        return this.location;
    }

    public setLanguages(languages: Array<Language>) {
        this.languages = languages;
    }

    public getLanguages() {
        return this.languages;
    }

    public setPhone(mobile: string) {
        this.mobile = mobile;
    }

    public getPhone() {
        return this.mobile;
    }

    public setRoles(roles: Array<RoleMenu>) {
        this.roles = roles;
    }

    public getRole() {
        return this.roles;
    }

    public setGender(gender: string) {
        this.gender = gender;
    }

    public getGender() {
        return this.gender;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getName() {
        return this.name;
    }

    public setEmail(email: string) {
        this.email = email;
    }

    getEmail() {
        return this.email;
    }

    setPassword(password: string) {
        this.password = password;
    }

    getPassword() {
        return this.password;
    }
}

export interface RoleMenu {
    roleId: number;
    roleName: string;
}

export interface LocationMenu {
    locationId: number;
    name: string;
    latitude: number;
    longitude: number;
}

export interface Language {
    languageId: number;
    language: string;
}

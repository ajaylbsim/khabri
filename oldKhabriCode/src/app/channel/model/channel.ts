import { Language } from './../../user/model/user';
import { LocationMenu } from './../../user/model/user';
import { User } from './../../user/model/user';
export class Channel {

    private channelId: number;
    private dateAdded: Date;
    private dateModified: Date;
    private title: string;
    private description: string;
    private imageUrl: string;
    private language: Language;
    private homeLocation: LocationMenu;
    private channelOwner: User;

    constructor() {

    }


    setDateModified(dateModified: Date) {
        this.dateModified = dateModified;
    }

    getDateModified() {
        return this.dateModified;
    }

    setDateAdded(dateAdded: Date) {
        this.dateAdded = dateAdded;
    }

    getDateAdded() {
        return this.dateAdded;
    }

    setChannelOwner(channelOwner: User) {
        this.channelOwner = channelOwner;
    }

    getChannelOwner() {
        return this.channelOwner;
    }

    setLocation(homeLocation: LocationMenu) {
        this.homeLocation = homeLocation;
    }

    getLocation() {
        return this.homeLocation;
    }

    setLanguage(language: Language) {
        this.language = language;
    }

    getLanguage() {
        return this.language;
    }

    setImageUrl(imageUrl: string) {
        this.imageUrl = imageUrl;
    }

    getImageUrl() {
        return this.imageUrl;
    }

    setDescription(description: string) {
        this.description = description;
    }

    getDiscription() {
        return this.description;
    }

    setTitle(title: string) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }

    setChannelId(channelId: number) {
        this.channelId = channelId;
    }

    getChannelId() {
        return this.channelId;
    }
}

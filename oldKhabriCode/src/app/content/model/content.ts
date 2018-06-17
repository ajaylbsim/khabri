import { User, LocationMenu } from './../../user/model/user';
import { Channel} from './../../channel/model/channel';
export class Content {
    private contentId: number;
    private dateAdded: Date;
    private dateModified: Date;
    private sourceUrl: string;
    private audioUrl: string;
    private imageUrl: string;
    private source: string;
    private priority: number;
    private title: string;
    private description: string;
    private audioDuration: string;
    private isSponsored: boolean;
    private creator: User;
    private reviewer: User;
    private status: StatusMenu;
    private channel: Channel;
    private tags: Array<TagMenu>;
    private contentLocationRelation: Array<ContentLocationRelation>;

    public setContentLocationRelation(contentLocationRelation: Array<ContentLocationRelation>) {
        this.contentLocationRelation = contentLocationRelation;
    }

    public getContentLocationRelation() {
        return this.contentLocationRelation;
    }

    public setTags(tags: Array<TagMenu>) {
        this.tags = tags;
    }

    public getTags() {
        return this.tags;
    }

    public setChannel(channel: Channel) {
        this.channel = channel;
    }

    public getChannel() {
        return this.channel;
    }

    public setStatus(status: StatusMenu) {
        this.status = status;
    }

    public getStatus() {
        return this.status.statusName;
    }

    public setReviewer(reviewer: User) {
        this.reviewer = reviewer;
    }

    public getReviewer() {
        return this.reviewer;
    }

    public setCreator(creator: User) {
        this.creator = creator;
    }

    public getCreator() {
        return this.creator;
    }

    public setIsSponsered(isSponsered: boolean) {
        this.isSponsored = isSponsered;
    }

    public getIsSponsered() {
        return this.isSponsored;
    }

    public setAudioDuration(audioDuration: string) {
        this.audioDuration = audioDuration;
    }

    public getAudioDuration() {
        return this.audioDuration;
    }

    public setDescription(description: string) {
        this.description = description;
    }

    public getDescription() {
        return this.description;
    }

    public setTitle(title: string) {
        this.title = title;
    }

    public getTitle() {
        return this.title;
    }

    public setPriority(priority: number) {
        this.priority = priority;
    }

    public getPriority() {
        return this.priority;
    }
    public setSource(source: string) {
        this.source = source;
    }

    public getSource() {
        return this.source;
    }

    public setAudioUrl(audioUrl: string) {
        this.audioUrl = audioUrl;
    }

    public getAudioUrl() {
        return this.audioUrl;
    }

    public setImageUrl(imageUrl: string) {
        this.imageUrl = imageUrl;
    }

    public getImageUrl() {
        return this.imageUrl;
    }

    public setSourceUrl(sourceUrl: string) {
        this.sourceUrl = sourceUrl;
    }

    public getSourceUrl() {
        return this.sourceUrl;
    }

    public setDateModified(dateModified: Date) {
        this.dateModified = dateModified;
    }

    public getDateModified() {
        return this.dateModified;
    }


    public setDateAdded(dateAdded: Date) {
        this.dateAdded = dateAdded;
    }

    public getDateAdded() {
        return this.dateAdded;
    }

    public setContentId(contentId: number) {
        this.contentId = contentId;
    }

    public getContentId() {
        return this.contentId;
    }

}

export class ContentLocationRelation {
    id: ContentLocationId;
    proximity: number;
}

export class ContentLocationId {
    content: Content;
    location: LocationMenu;
}

export interface StatusMenu {
    statusId: number;
    statusName: string;
}

export class TagMenu {
    tagId: number;
    tagName: string;
    description: string;
    category: TagCategoryMenu;
}

export interface TagCategoryMenu {
    categoryId: number;
    categoryName: string;
    description: string;
}

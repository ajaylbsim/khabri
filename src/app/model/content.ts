
export class Content {
  private contentId: number;
  status: StatusMenu;
  private dateAdded: Date;
  private dateModified: Date;
  private sourceUrl: string;
  private audioUrl: string;
  private imageUrl: string;
  private source: string;
  priority: number;
  private title: string;
  description: string;
  channel: object;
  private audioDuration: string;
  private isSponsored: boolean;
   tags: Array<TagMenu>;

  public setTags(tags: Array<TagMenu>) {
    this.tags = tags;
  }

  public getTags() {
    return this.tags;
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

  // public setPriority(priority: number) {
  //   this.priority = priority;
  // }
  //
  // public getPriority() {
  //   return this.priority;
  // }
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

export class Package {
    category: string;
    img: string;    // ruta relativa en public/packages/images
    words: string[];
    description?: string;
    title?: string;

    constructor(category: string, img: string, words: string[], description?: string, title?: string) {
        this.category = category;
        this.img = img;
        this.words = words;
        this.description = description;
        this.title = title;
    }
}

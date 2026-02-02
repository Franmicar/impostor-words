export class Package {
    category: string;
    img: string;    // ruta relativa en public/packages/images
    words: string[];
    text?: string;

    constructor(category: string, img: string, words: string[]) {
        this.category = category;
        this.img = img;
        this.words = words;
    }
}

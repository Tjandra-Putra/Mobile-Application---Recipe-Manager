export class RecipeModel{
    constructor
    (
        public id: string,
        public title: string,
        public description: string,
        public imageUrl: string,
        public isFavourite: boolean
    ) {}
}
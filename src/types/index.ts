export interface Image {
    id: string;
    title: string;
    url: string;
    description?: string;
    tags?: string[];
}

export interface SearchQuery {
    query: string;
    page?: number;
    perPage?: number;
}
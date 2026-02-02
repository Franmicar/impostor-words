export interface Item {
    id: string;
    icon: string;
    title: string;
    info?: string;
    amount?: number;
    buttons?: boolean;
    settings?: boolean;
}
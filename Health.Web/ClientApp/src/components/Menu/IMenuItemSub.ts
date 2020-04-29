export interface IMenuItemSub {
    title: string;
    icon?: string;
    color?: string;
    layout?: string;
    hovered: boolean;
    active?: boolean;
    disabled?: boolean;
    routing?: string;
    externalLink?: string;
    sub?: IMenuItemSub[];
}

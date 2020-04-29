export interface IPageData {
    title?: string;
    loaded?: boolean;
    breadcrumbs?: IBreadcrumb[];
    fullFilled?: boolean;
}

export interface IBreadcrumb {
    title: string;
    route?: string;
    icon?: string;
}

export interface IPageProps {
    onSetPage: (data: IPageData) => void;
    getPageData: (url: string) => Promise<any>;
}
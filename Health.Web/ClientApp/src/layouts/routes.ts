import NotFound from "~/pages/NotFound";

export interface IRoute {
    path: string;
    component: any;
    exact?: boolean;
    children?: IRoute[];
}

export const defaultRoutes: IRoute[] = [
    {
        path: "/404",
        component: NotFound
    },
    {
        path: "/dashboard",
        component: NotFound
    }
];
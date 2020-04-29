import { IPageData } from "../BaseLayout/IPageData";
import { IAppSettings } from "../BaseLayout/IAppSettings";
import React, { useState, useEffect } from "react";
import { defaultRoutes } from "~/layouts/routes";
import Axios from "axios";
import Navbar from "~/components/Navbar/NavBar";
import Logo from "~/components/Logo/Logo";
import Menu from "~/components/Menu/Menu";
import NavbarSkeleton from "~/components/NavbarSkeleton/NavbarSkeleton";
import { IMenuItem } from "~/components/Menu/IMenuItem";
import Search from "~/components/Search/Search";
import Actions from "~/components/Actions/Actions";
import BaseLayout from "../BaseLayout/BaseLayout";
import { Route } from "react-router";
import BasePage from "~/components/BasePage/BasePage";

const getGradientString = (firstColor: string, secondColor: string): string =>
    `linear-gradient(188deg, ${firstColor}, ${secondColor} 65%)`;

interface IVerticalLayoutProps {
    pageData: IPageData;
    settings: IAppSettings;
    onSidebarToggle: () => void;
    onSettingsReset: () => void;
    onSettingsSet: (data: IAppSettings) => void;
    onSettingsUpdate: (data: IAppSettings) => void;
    onSetPage: (data: IPageData) => void;
    onPageReset: () => void;
}

const VerticalLayout: React.FunctionComponent<IVerticalLayoutProps> = props => {
    const { pageData, settings, onSidebarToggle, onPageReset, onSetPage } = props;
    const {
        sidebarAccentColor,
        sidebarColor,
        topbarColor,
        topbarBg,
        sidebarBg2,
        sidebarBg,
        sidebarAccentContrastColor,
        sidebarOpened,
        layout,
        boxed
    } = settings;
    const [menuData, setMenuData] = useState<IMenuItem[]>([]);
    const [settingsVisibility, setSettingsVisibility] = useState(false);
    const routes = defaultRoutes;

    useEffect(() => {
        async function fetchData() {
            const result = await Axios("./data/menu.json");
            setMenuData(result.data);
        }
        // tslint:disable-next-line: no-console
        fetchData().catch(err => console.log("Server error:", err));
    }, []);

    const handleToggleSidebar = () => {
        onSidebarToggle();
    };

    const handleSettingsModalClose = () => {
        setSettingsVisibility(false);
    };

    const handleSettingsClick = () => setSettingsVisibility(true);

    return (
        <div className="layout vertical">
            <div className={`app-container ${boxed && "boxed"}`}>
                <Navbar
                    style={{ backgroundImage: getGradientString(sidebarBg, sidebarBg2) }}
                    orientation="vertical"
                    opened={sidebarOpened}
                    onCloseNavbar={handleToggleSidebar}
                    className=""
                >
                    <button
                        className="no-style navbar-close icofont-close-line d-lg-none"
                        onClick={onSidebarToggle}
                    />
                    <Logo style={{ backgroundColor: topbarBg }} height={33} width={147} />
                    <Menu
                        color={sidebarColor}
                        accentContrast={sidebarAccentContrastColor}
                        accentColor={sidebarAccentColor}
                        data={menuData}
                        layout={"vertical"}
                        contrast=""
                    />
                    <NavbarSkeleton type="vertical" loaded={props.pageData.fullFilled ?? false} />
                </Navbar>

                <Navbar
                    boxed={boxed}
                    style={{ backgroundColor: topbarBg, color: topbarColor, minHeight: 60 }}
                    orientation="horizontal"
                    className="horizontal-nav"
                    onCloseNavbar={() => { /*donothing*/ }}
                >
                    <button className="navbar-toggle d-lg-none" onClick={handleToggleSidebar}>
                        <span />
                        <span />
                        <span />
                    </button>

                    <Search
                        style={{ color: topbarColor }}
                        data={menuData}
                        dataKey="title"
                        className="d-none d-md-block"
                    />

                    <Actions />

                    <NavbarSkeleton type="horizontal" loaded={props.pageData.fullFilled ?? false} />
                </Navbar>

                <BaseLayout
                    pageData={pageData}
                    settings={settings}
                    onPageReset={onPageReset}
                    onSidebarToggle={onSidebarToggle}>
                    {routes.map((route, i) => {
                        return (
                            <Route
                                key={i}
                                path={`/vertical${route.path}`}
                                render={() => (
                                    <BasePage>
                                        <route.component onSetPage={onSetPage} />
                                    </BasePage>
                                )}
                            />
                        );
                    })}
                </BaseLayout>

                <button className="no-style settings-btn" onClick={handleSettingsClick}>
                    <span className="pulse" />
                    <span className="icofont-bucket2" />
                </button>
            </div>
        </div>
    );
};
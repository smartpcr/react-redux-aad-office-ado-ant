import { IPageData } from "../BaseLayout/IPageData";
import { IAppSettings } from "../BaseLayout/IAppSettings";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Navbar from "~/components/Navbar/NavBar";
import Logo from "~/components/Logo/Logo";
import Menu from "~/components/Menu/Menu";
import NavbarSkeleton from "~/components/NavbarSkeleton/NavbarSkeleton";
import { IMenuItem } from "~/components/Menu/IMenuItem";
import Actions from "~/components/Actions/Actions";
import BaseLayout from "../BaseLayout/BaseLayout";
import { RootState } from "~/store/RootReducer";
import { Dispatch } from "redux";
import { connect } from "react-redux";

const getGradientString = (firstColor: string, secondColor: string): string =>
    `linear-gradient(188deg, ${firstColor}, ${secondColor} 65%)`;

interface IVerticalLayoutProps {
    pageData: IPageData;
    settings: IAppSettings;
    onSidebarToggle(): void;
    onSettingsReset(): void;
    onSettingsSet(data: IAppSettings): void;
    onSettingsUpdate(data: IAppSettings): void;
    onSetPage(data: IPageData): void;
    onPageReset(): void;
}

const VerticalLayout: React.FunctionComponent<IVerticalLayoutProps> = props => {
    const { pageData, settings, onSidebarToggle, onPageReset } = props;
    const {
        sidebarAccentColor,
        sidebarColor,
        topbarColor,
        topbarBg,
        sidebarBg2,
        sidebarBg,
        sidebarAccentContrastColor,
        sidebarOpened,
        boxed
    } = settings;
    // tslint:disable-next-line: typedef
    const [menuData, setMenuData] = useState<IMenuItem[]>([]);
    // tslint:disable-next-line: typedef
    const [, setSettingsVisibility] = useState(false);

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

                    <Actions />

                    <NavbarSkeleton type="horizontal" loaded={props.pageData.fullFilled ?? false} />
                </Navbar>

                <BaseLayout
                    pageData={pageData}
                    settings={settings}
                    onPageReset={onPageReset}
                    onSidebarToggle={onSidebarToggle}
                >
                    <span>hello</span>
                </BaseLayout>

                <button className="no-style settings-btn" onClick={handleSettingsClick}>
                    <span className="pulse" />
                    <span className="icofont-bucket2" />
                </button>
            </div>
        </div>
    );
};


const mapStateToProps = (state: RootState) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VerticalLayout);
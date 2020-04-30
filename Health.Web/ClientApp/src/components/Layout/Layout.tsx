import React from "react";
import { Consumer as ThemeConsumer } from "~/components/Theme/ThemeContext";
import Navbar from "../Navbar/Navbar";
import { NavItem } from "reactstrap";
import { LogoThemed } from "../LogoThemed/LogoThemed";
import { Nav } from "../Nav/Nav";

export const Layout: React.FunctionComponent = () => (
    <ThemeConsumer>
        {
            ({ style, color }) => (
                <React.Fragment>
                    <Navbar
                        light={true}
                        expand={true}
                        fluid={true}
                        className="bg-white pb-0 pb-lg-2"
                        themed={true}
                    >
                        <Nav navbar={true}>
                            <NavItem>
                                <LogoThemed />
                            </NavItem>
                        </Nav>

                        <h1
                            className="h5 mb-0 mr-auto ml-2 d-none d-lg-block"
                        >
                            Sidebar with Navbar
                        </h1>
                    </Navbar>

                    <Navbar
                        shadow={true}
                        expand={true}
                        light={true}
                        color={color}
                        fluid={true}
                        className="pt-0 pt-lg-2"
                        themed={true}
                    >
                        <h1 className="h5 mb-0 py-2 mr-auto d-lg-none">
                            Sidebar with Navbar
                        </h1>
                    </Navbar>
                </React.Fragment>
            )
        }
    </ThemeConsumer>
);
import "./Actions.scss";
import React from "react";
import { Menu, Dropdown, Avatar, Badge } from "antd";
import * as userIcon from "~/assets/content/user-50-3.jpg";

const Actions: React.FunctionComponent = () => {
    const notificationsMenu = (
        <Menu style={{ minWidth: "280px" }}>
            <h3 className="dropdown-title">Notifications</h3>
            <Menu.Item key="0">
                <div className="d-flex">
                    <Avatar className="mr-4" style={{ color: "#fff", backgroundColor: "#fc8b37" }}>
                        <span className="icofont-heart" />
                    </Avatar>

                    <div className="text d-flex flex-column">
                        <a target="_blank" rel="noopener noreferrer" href="#/">
                            Amanda Lie shared your post
            </a>

                        <span className="sub-title">25 minutes ago</span>
                    </div>
                </div>
            </Menu.Item>

            <Menu.Item key="1">
                <div className="d-flex">
                    <Avatar className="mr-4" style={{ color: "#fff", backgroundColor: "#805aff" }}>
                        <span className="icofont-external-link" />
                    </Avatar>

                    <div className="text d-flex flex-column">
                        <a target="_blank" rel="noopener noreferrer" href="#/" role="">
                            New user registered
                        </a>

                        <span className="sub-title">23 minutes ago</span>
                    </div>
                </div>
            </Menu.Item>

            <Menu.Item key="2">
                <div className="d-flex">
                    <Avatar className="mr-4" style={{ color: "#fff", backgroundColor: "#f741b5" }}>
                        <span className="notification-icon icofont-notification" />
                    </Avatar>

                    <div className="text d-flex flex-column">
                        <a target="_blank" rel="noopener noreferrer" href="#/">
                            Sara Crouch liked your photo
            </a>

                        <span className="sub-title">15 minutes ago</span>
                    </div>
                </div>
            </Menu.Item>
        </Menu>
    );

    const accountMenu = (
        <Menu style={{ minWidth: "220px" }}>
            <Menu.Item key={"0"}>
                <a href="#/">Add account</a>
            </Menu.Item>

            <Menu.Item key={"1"}>
                <a href="#/">Reset password</a>
            </Menu.Item>

            <Menu.Item key={"2"}>
                <a href="#/">Help</a>
            </Menu.Item>

            <Menu.Divider />

            <Menu.Item key={"3"}>
                <span className="d-flex d-flex justify-content-between align-item-center">
                    <a className="d-flex w-100" href="#/">
                        Log out
                    </a>
                    <span className="d-flex align-items-center icofont-logout" />
                </span>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="actions">
            <Dropdown className="item mr-3" overlay={notificationsMenu} trigger={["click"]}>
                <Badge
                    style={{
                        alignItems: "center",
                        background: "linear-gradient(250deg,#cd5447,#b3589c 65%,#9d5ce5)",
                        boxShadow: "none",
                        display: "flex",
                        justifyContent: "center",
                        height: 18,
                        minWidth: 18
                    }}
                    count={3}>
                    <span
                        className="icon notification-icon icofont-notification"
                        style={{ fontSize: "24px" }}
                    />
                </Badge>
            </Dropdown>

            <Dropdown overlay={accountMenu} trigger={["click"]}>
                <div className="item">
                    <Avatar className="mr-1" src={userIcon} />
                    <span className="icofont-simple-down" />
                </div>
            </Dropdown>
        </div>
    );
};

export default Actions;

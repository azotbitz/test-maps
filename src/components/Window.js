import React, {createContext, useEffect, useState} from 'react';
import {Button, Layout, Menu, theme} from 'antd';
import MapCard from "./MapCard";
import {fetchRoute} from "../redux/actionsCreators/Actions";
import {useDispatch, useSelector} from "react-redux";
import {error, loader, data} from "../redux/selectors/RouteSelector";
const { Header, Content, Footer, Sider } = Layout;

export const RouteContext = createContext('')

const Window = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [selectedMenuItem, setSelectedMenuItem]= useState('route1');
    const dispatch = useDispatch();
    const loading = useSelector(loader);
    const err = useSelector(error);
    const dataWindow = useSelector(data);

    const point1 = [13.682632, 47.393753];
    const point2 = [13.6849281, 47.3935649];
    const point3 = [13.388860, 52.517037];
    const point4 = [13.397634, 52.529407];
    const point5 = [13.428555, 52.523219];
    const point6 = [13.683632, 47.394653];
    const routes = [
        `${point3};${point4}`,
        `${point4};${point5}`,

        `${point1};${point2}`,
        `${point2};${point6}`,

        `${point4};${point3}`,
        `${point3};${point5}`
    ];


    useEffect(() => {
        dispatch(fetchRoute(routes))
    },[])



    const handleClickFirstRoute = () => {

    }
    const handleClickSecondRoute = () => {

    }
    const handleClickThirdRoute = () => {

    }

    return (
        <Layout style={{height: '100vh'}}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={selectedMenuItem}
                    onClick={(e) =>
                        setSelectedMenuItem(e.key)}
                    >
                    <Menu.Item
                        key="route1"
                        onClick={handleClickFirstRoute}>Маршрут 1</Menu.Item>
                    <Menu.Item
                        key="route2"
                        onClick={handleClickSecondRoute}>Маршрут 2</Menu.Item>
                    <Menu.Item
                        key="route3"
                        onClick={handleClickThirdRoute}>Маршрут 3</Menu.Item>

                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                />
                <Content
                    style={{
                        margin: '24px 16px 0',
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            minHeight: 660,
                            background: colorBgContainer,
                        }}
                    >

                        {
                            dataWindow ?
                                loading
                                    ? <p>Loading...</p>
                                    : err
                                        ? <p>Error, try again</p>
                                        :
                                        <RouteContext.Provider value={selectedMenuItem}>
                                        <MapCard />
                                        </RouteContext.Provider>
                            :
                                <Button onClick={handleClickFirstRoute}>Let's Start</Button>
                        }

                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©2023 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};
export default Window;

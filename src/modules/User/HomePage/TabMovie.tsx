import {
  VideoCameraOutlined,
  StarOutlined,
  CarryOutOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { ConfigProvider, Tabs } from "antd";
import MovieList from "./MovieList";

export default function TabMovie() {
  type Tab = {
    key: string;
    label: string;
    children: any;
    icon: any;
  };

  const tabs: Tab[] = [
    {
      key: "phim",
      label: "Phim",
      children: <MovieList tabname={"phim"}></MovieList>,
      icon: <AppstoreOutlined />,
    },
    {
      key: "dangchieu",
      label: "Đang Chiếu",
      children: <MovieList tabname={"dangchieu"}></MovieList>,
      icon: <VideoCameraOutlined />,
    },
    {
      key: "sapchieu",
      label: "Sắp Chiếu",
      children: <MovieList tabname={"sapchieu"}></MovieList>,
      icon: <CarryOutOutlined />,
    },
    {
      key: "hot",
      label: "Hot",
      children: <MovieList tabname={"hot"}></MovieList>,
      icon: <StarOutlined />,
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 2,
        },
        components: {
          Tabs: {
            fontSize: 20,
            itemHoverColor: "rgb(242, 107, 56)",
            itemSelectedColor: "rgb(242, 107, 56)",
            inkBarColor: "rgb(242, 107, 56)",
          },
        },
      }}
    >
      <Tabs
        defaultActiveKey="2"
        items={tabs?.map((t) => {
          return {
            key: t.key,
            label: t.label,
            children: t.children,
            icon: t.icon,
          };
        })}
      />
    </ConfigProvider>
  );
}

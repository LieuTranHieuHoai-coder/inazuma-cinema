import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import MovieList from './MovieList';
export default function TabMovie() {
    type Tab = {
        key: string;
        label: string;
        children: any;
        icon: any;
    }
    const tabs: Tab[] = [
        {
            key: 'phim',
            label: 'Phim',
            children: <MovieList></MovieList>,
            icon: <AndroidOutlined/>,
        },
        {
            key: 'dangchieu',
            label: 'Đang Chiếu',
            children: 'phimcontent2',
            icon: <AndroidOutlined/>,
        },
        {
            key: 'sapchieu',
            label: 'Sắp Chiếu',
            children: 'phimcontent3',
            icon: <AndroidOutlined/>,
        },

    ]

    function renderTab(tab: Tab){
        return (
            <Tabs.TabPane tab={tab.label} key={tab.key}>
                {tab.children}
            </Tabs.TabPane>
        )
    }
    return (
        <Tabs
            defaultActiveKey="2"
            items={tabs?.map((t) => {
                return {
                    key: t.key,
                    label: t.label,
                    children: t.children,
                    icon: t.icon,
                };
            }
            )
            }

        />
    )
}

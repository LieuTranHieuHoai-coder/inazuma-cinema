import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import MovieList from './MovieList';
import { AiFillCalendar, AiFillGold, AiFillStar, AiFillVideoCamera } from "react-icons/ai";
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
            children: <MovieList tabname={'phim'}></MovieList>,
            icon: <AiFillGold />,
        },
        {
            key: 'dangchieu',
            label: 'Đang Chiếu',
            children: <MovieList tabname={'dangchieu'}></MovieList>,
            icon: <AiFillVideoCamera  />,
        },
        {
            key: 'sapchieu',
            label: 'Sắp Chiếu',
            children: <MovieList tabname={'sapchieu'}></MovieList>,
            icon: <AiFillCalendar />,
        },
        {
            key: 'hot',
            label: 'Hot',
            children: <MovieList tabname={'hot'}></MovieList>,
            icon: <AiFillStar/>,
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

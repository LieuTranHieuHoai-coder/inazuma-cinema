import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, DownOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { FaTicketAlt } from "react-icons/fa";
const items = [
  {
    label: 'Mua vé',
    key: 'ticket',
    icon: <FaTicketAlt/>,
  },
  {
    label: 'Góc điện ảnh',
    key: 'app',
    icon: <AppstoreOutlined />,
  },
  {
    label: 'Phim',
    key: 'movie',
    icon: <DownOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    key: 'event',
    label: (
      <a target="_blank" rel="noopener noreferrer">
        Sự kiện
      </a>
    ),
  },
];
const Header = () => {
  const [current, setCurrent] = useState('mail');
  const onClick = (e:any) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} className='mt-5 mb-5'/>;
};
export default Header;
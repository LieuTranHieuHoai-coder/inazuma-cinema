import { Layout } from 'antd';


export default function Footer() {

  const { Footer } = Layout;
  return <>
    <Footer style={{ textAlign: 'center'}}>
      Inazuma Cinema ©{new Date().getFullYear()} Created by LieuHoai
    </Footer></>
}

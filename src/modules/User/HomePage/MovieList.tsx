import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { getListMovieApi } from '../../../apis/movie';
import { PAGE_SIZE } from "../../../constants";
import { Button, Card, Col, Row } from 'antd';
import Meta from 'antd/es/card/Meta';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
export default function MovieList() {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading, error } = useQuery({
        queryKey: ["list-movie-user", 1],
        queryFn: () => getListMovieApi(1),
    });
    const dataSource = data?.items || [];
    const style: React.CSSProperties = {
        marginTop: 8,
        position: 'relative'
    };
    const MovieItem = ({ item }: { item: any }) => {
        const [isHover, setIsHover] = useState(false);

        const handleMouseEnter = () => {
            setIsHover(true);
        };

        const handleMouseLeave = () => {
            setIsHover(false);
        };

        const [isHover2, setIsHover2] = useState(false);

        const handleMouseEnter2 = () => {
            setIsHover2(true);
        };

        const handleMouseLeave2 = () => {
            setIsHover2(false);
        };

        const [isHover3, setIsHover3] = useState(false);

        const handleMouseEnter3 = () => {
            setIsHover3(true);
        };

        const handleMouseLeave3 = () => {
            setIsHover3(false);
        };
        return (
            <Col className="gutter-row" span={6} key={item.maPhim}>
                <div
                    style={style}
                    className='hoverCard'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <Card
                        hoverable
                        style={{ width: "100%", position: "relative" }}
                        cover={<img alt="example" src={item.hinhAnh} />}
                    >
                        <Meta title={item.tenPhim} />
                    </Card>
                    <div
                        className='showBtn'
                        key={item.maPhim}
                        style={{
                            width: '100%',
                            height: '100%',
                            display: isHover ? 'block' : 'none',
                            backgroundColor: 'rgba(0, 0, 0, .5)',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}>
                            <Button onMouseEnter={handleMouseEnter2}
                                onMouseLeave={handleMouseLeave2} icon={<AndroidOutlined />} style={{ width: 150, height: 50, background: isHover2 ? 'rgb(251 148 64)' : 'rgb(242 107 56)', border: 'none', color: isHover2 ? 'white' : 'white'}}>Mua vé</Button>
                            <br />
                            <br />
                            <Button onMouseEnter={handleMouseEnter3}
                                onMouseLeave={handleMouseLeave3} icon={<AndroidOutlined />} style={{ width: 150, height: 50, background: isHover3 ? 'rgba(251, 148 ,64, .8)': 'transparent' , border: 'solid 1px white', color: isHover3 ? 'white' : 'white'}}>Trailer</Button>
                        </div>

                    </div>
                </div>
            </Col>
        );
    };

    return (
        <div>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {dataSource.map((item: any) => (
                    <MovieItem item={item} key={item.maPhim} />
                ))}
            </Row>
        </div>
    );
}

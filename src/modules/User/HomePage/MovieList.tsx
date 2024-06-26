import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getAllMovieApi, getListMovieApi } from "../../../apis/movie";
import { PAGE_SIZE } from "../../../constants";
import { Button, Card, Col, Pagination, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
interface Props {
  tabname: string;
}
export default function MovieList(props: Props) {
  const { tabname } = props;
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["list-movie", { currentPage }],
  //   queryFn: () => getListMovieApi(currentPage),
  // });

  const { data: dataAll} = useQuery({
    queryKey: ["list-movie-all"],
    queryFn: () => getAllMovieApi(),
  });

  // const dataSource = data?.items || [];
  // let totalCount = data?.totalCount || 0;

  const dataSource = dataAll || [];
  let totalCount = dataAll?.length || 0;
  function getdataSource():any {
    switch (tabname) {
      case "phim":
        return dataSource.slice((currentPage-1)*PAGE_SIZE,((currentPage-1)*PAGE_SIZE)+PAGE_SIZE) || [];
      case "dangchieu":
        const clone1 = dataAll?.filter((item) => item.dangChieu !== false ) || [];
        totalCount = clone1.length;
        return dataSource.filter((item:any) => item.dangChieu !== false )
        .slice((currentPage-1)*PAGE_SIZE,((currentPage-1)*PAGE_SIZE)+PAGE_SIZE) || [];
      case "sapchieu":
        const clone2 = dataAll?.filter((item:any) => item.sapChieu !== false ) || [];
        totalCount = clone2.length;
        return dataSource.filter((item:any) => item.sapChieu !== false )
        .slice((currentPage-1)*PAGE_SIZE,((currentPage-1)*PAGE_SIZE)+PAGE_SIZE) || [];
      case "hot":
        const clone3 = dataAll?.filter((item:any) => item.hot !== false ) || [];
        totalCount = clone3.length;
        return dataSource.filter((item:any) => item.hot !== false )
        .slice((currentPage-1)*PAGE_SIZE,((currentPage-1)*PAGE_SIZE)+PAGE_SIZE) || [];
      default:
        return dataSource.slice((currentPage-1)*PAGE_SIZE,((currentPage-1)*PAGE_SIZE)+PAGE_SIZE) || [];
    }
  }
  const style: React.CSSProperties = {
    marginTop: 8,
    position: "relative",
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
    const goDetails = (item:number) => {
      navigate(`/details/${item}`);
    };
    return (
      <Col className="gutter-row" span={6} key={item.maPhim}>
        <div
          style={style}
          className="hoverCard"
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
            className="showBtn"
            key={item.maPhim}
            style={{
              width: "100%",
              height: "100%",
              display: isHover ? "block" : "none",
              backgroundColor: "rgba(0, 0, 0, .5)",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Button
                onMouseEnter={handleMouseEnter2}
                onMouseLeave={handleMouseLeave2}
                onClick={() => goDetails(item.maPhim)}
                icon={<AndroidOutlined />}
                style={{
                  width: 150,
                  height: 50,
                  background: isHover2 ? "rgb(251 148 64)" : "rgb(242 107 56)",
                  border: "none",
                  color: isHover2 ? "white" : "white",
                }}
              >
                Mua vé
              </Button>
              <br />
              <br />
              <Button
                onMouseEnter={handleMouseEnter3}
                onMouseLeave={handleMouseLeave3}
                icon={<AndroidOutlined />}
                style={{
                  width: 150,
                  height: 50,
                  background: isHover3
                    ? "rgba(251, 148 ,64, .8)"
                    : "transparent",
                  border: "solid 1px white",
                  color: isHover3 ? "white" : "white",
                }}
              >
                Trailer
              </Button>
            </div>
          </div>
        </div>
      </Col>
    );
  };
  return (
    <div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {getdataSource().map((item: any) => (
          <MovieItem item={item} key={item.maPhim} />
        ))}
      </Row>

      <div className="flex float-end mt-4 pb-4">
          <Pagination
            defaultCurrent={currentPage} // khi user thao tác sẽ lấy đươch currentPage
            total={totalCount} // lấy từ api
            pageSize={PAGE_SIZE}
            onChange={(page: number) => {
              setCurrentPage(page);
            }}
          />
        </div>
    </div>
  );
}

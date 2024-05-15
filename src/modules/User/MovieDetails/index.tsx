import { Avatar, Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import { useParams } from "react-router-dom";
import { getThongTinLichChieuPhim, getThongTinPhim } from "../../../apis/movie";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { CalendarOutlined, YoutubeOutlined } from "@ant-design/icons";
import LichChieuComponent from "./lichchieu";

export default function MovieDetails() {
  let { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["ThongTinPhim", id],
    queryFn: () => id ? getThongTinLichChieuPhim(id) : Promise.reject("Movie ID is undefined"),
  });
  const movies = {
    ...data
  };
  function renderMovieDetails() {
    console.log(isLoading);
    if (isLoading) {
      return (<>
        <Card style={{ width: 300, marginTop: 16 }} loading={isLoading}>
          <Meta

            title="Card title"
            description="This is the description"
          />
        </Card>
      </>)
    }
    else {
      return (
        <div>
          <Card
            hoverable
            className="col-md-6"
            cover={<img alt="example" src={movies.hinhAnh} />}
          >
            <div className="m-5 p-3">
              <h1>{movies.tenPhim}</h1>
              <h3>{movies.moTa}</h3>
              <h2 className="m-5 p-3"><CalendarOutlined /> Ngày khởi chiếu: {dayjs(movies.ngayKhoiChieu).format('DD/MM/YYYY')}</h2>
              <h1 className="m-5 p-3"><YoutubeOutlined /> <a target="_blank" href={movies.trailer}>Trailer</a></h1>
              <h1 className="inline-flex items-baseline"> <span className="mr-2" style={{width:10 , height: 25, background: "blue", display: "block"}}></span> Lịch Chiếu</h1>
              <LichChieuComponent></LichChieuComponent>
            </div>
          </Card>

        </div>
      );
    }

  }

  return (

    <div>{renderMovieDetails()}</div>
  );
}

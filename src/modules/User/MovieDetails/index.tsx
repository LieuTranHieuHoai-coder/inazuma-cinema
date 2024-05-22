import { Avatar, Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import { useParams } from "react-router-dom";
import { getThongTinLichChieuPhim, getThongTinPhim } from "../../../apis/movie";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { CalendarOutlined, YoutubeOutlined } from "@ant-design/icons";
import LichChieuComponent from "./lichchieu";
import { useCallback, useMemo } from "react";

export default function MovieDetails() {
  let { id } = useParams();
  console.log(id);
  const { data, isLoading, error } = useQuery({
    queryKey: ["ThongTinPhim", id],
    queryFn: () =>
      id
        ? getThongTinLichChieuPhim(id)
        : Promise.reject("Movie ID is undefined"),
  });
  console.log(data);
  function renderMovieDetails(){
    return (
      <div>
        <Card loading={isLoading}>
          <div className="grid grid-cols-2">
            <div className="container">
              <img alt="example" src={data?.hinhAnh} className="m-3 container" />
            </div>
            <div className="container ml-5">
              <div className="m-0 p-3">
                <h1>{data?.tenPhim}</h1>
                <h3>{data?.moTa}</h3>
                <h2 className="m-0 p-3">
                  <CalendarOutlined /> Ngày khởi chiếu:{" "}
                  {dayjs(data?.ngayKhoiChieu).format("DD/MM/YYYY")}
                </h2>
                <h1 className="m-0 p-3">
                  <YoutubeOutlined />{" "}
                  <a target="_blank" href={data?.trailer}>
                    Trailer
                  </a>
                </h1>
              </div>
            </div>
          </div>
          <div className="m-0 p-2">
            <h1 className="inline-flex items-baseline mb-5">
              {" "}
              <span
                className="mr-2"
                style={{
                  width: 10,
                  height: 25,
                  background: "blue",
                  display: "block",
                }}
              ></span>{" "}
              Chọn rạp chiếu
            </h1>
            {
             !id ? <LichChieuComponent marap=""></LichChieuComponent> : <LichChieuComponent marap={id}></LichChieuComponent>
            }
            
          </div>
        </Card>
      </div>
    );
  };

  return <div>{renderMovieDetails()}</div>;
}

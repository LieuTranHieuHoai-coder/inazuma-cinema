import "./bookingseat.css";
import { useQuery } from "@tanstack/react-query";
import { getGiaVePhim } from "../../../apis/movie";
import { useParams } from "react-router-dom";
import { DanhSachGhe, GiaVePhim } from "../../../types/movie.type";
import { Badge, Card, Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import dayjs from "dayjs";
import { useAppDispatch } from "../../../redux/hooks";
export default function BookSeat() {
  //const seats = data;
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["GIAVEPHIM"],
    queryFn: () => getGiaVePhim(id ?? ""),
  });
  const dispatch = useAppDispatch();
  function renderSeat() {
    let i = 1;
    if (isLoading) {
      return <p>Loading...</p>;
    } else {
      return data?.danhSachGhe.map((item: DanhSachGhe) => {
        if (item.daDat === true) {
          return (
            <div key={i++} className="td relative">
              <input
                id={item.maGhe.toString()}
                type="checkbox"
                className="checkbox-gray"
                style={{ backgroundColor: "#d1d5db" }}
                disabled
                checked={item.daDat}
                defaultValue={item.tenGhe}
              />
              <label
                htmlFor={item.maGhe.toString()}
                style={{
                  position: "absolute",
                  transform: "translate(-25%, 0%)",
                  zIndex: -1
                }}
              >
                {item.tenGhe.toString()}
              </label>
            </div>
          );
        } else {
          if (item.loaiGhe === "Vip") {
            if (item.daDat) {
              return (
                <div
                  key={i++}
                  className="td relative"
                  id={item.maGhe.toString()}
                >
                  <input
                    type="checkbox"
                    className="checkbox-vip"
                    style={{ backgroundColor: "#d1d5db" }}
                    disabled
                    checked={item.daDat}
                    defaultValue={item.tenGhe}
                  />
                  <label
                    htmlFor={item.maGhe.toString()}
                    style={{
                      position: "absolute",
                      transform: "translate(-25%, 0%)",zIndex: -1
                    }}
                  >
                    {item.tenGhe.toString()}
                  </label>
                </div>
              );
            } else {
              return (
                <div
                  key={i++}
                  className="td relative"
                  id={item.maGhe.toString()}
                >
                  <input
                    type="checkbox"
                    className="checkbox-vip"
                    content={item.tenGhe}
                  />
                  <label
                    htmlFor={item.maGhe.toString()}
                    style={{
                      position: "absolute",
                      transform: "translate(-25%, 0%)",zIndex: -1
                    }}
                  >
                    {item.tenGhe.toString()}
                  </label>
                </div>
              );
            }
          }
          return (
            <div key={i++} className="td relative">
              <input
                type="checkbox"
                className="checkbox"
                id={item.maGhe.toString()}
              />
              <label
                htmlFor={item.maGhe.toString()}
                style={{
                  position: "absolute",
                  transform: "translate(-25%, 0%)",zIndex: -1
                }}
              >
                {item.tenGhe.toString()}
              </label>
            </div>
          );
        }
      });
    }
  }
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Tên Phim",
      children: <b>{data?.thongTinPhim.tenPhim}</b>,
      span: 3,
    },

    {
      key: "4",
      label: "Giờ Chiếu",
      children: (
        <>
          <b>
            {data?.thongTinPhim.ngayChieu} {data?.thongTinPhim.gioChieu}
          </b>
        </>
      ),
      span: 3,
    },
    {
      key: "7",
      label: "Ghế Đã Đặt",
      children: (
        <>
          Ghế thường: 01
          <br />
          Ghế thường: 12
          <br />
          Ghế thường: 56
          <br />
          Ghế thường: 21
          <br />
          Ghế thường: 50
          <br />
          Ghế thường: 13
          <br />
        </>
      ),
      span: 3,
    },
    {
      key: "10",
      label: "Tổng tiền",
      children: <b>$80.00</b>,
      span: 3,
    },
  ];
  return (
    <div className="mb-5">
      <div className="center">
        <div className="tickets">
          <div className="ticket-selector">
            <div className="grid-cols-2 grid">
              <div>
                <div className="mx-5 flex flex-nowrap justify-evenly">
                  <div className="flex items-baseline">
                    <div className="box-white"></div> Available
                  </div>
                  <div className="flex items-baseline">
                    <div className="box-green"></div> Booked
                  </div>
                  <div className="flex items-baseline">
                    <div className="box-gray"></div> Selected
                  </div>
                </div>
                <div className="w-full grid grid-cols-10 gap-2 text-center">
                  {renderSeat()}
                </div>
              </div>
              <div className="grid grid-cols-2">
                <Card
                  hoverable
                  className="w-full"
                  cover={<img alt="example" src={data?.thongTinPhim.hinhAnh} />}
                >
                  <h2>{data?.thongTinPhim.tenPhim}</h2>
                  <h3>Ngày Chiếu: {data?.thongTinPhim.ngayChieu}</h3>
                  <h3 className="text-green-600">
                    Giờ Chiếu: {data?.thongTinPhim.gioChieu}
                  </h3>
                  <h3 className="text-red-600">{data?.thongTinPhim.tenRap}</h3>
                </Card>
                <div className="ml-5">
                  <Descriptions bordered items={items} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

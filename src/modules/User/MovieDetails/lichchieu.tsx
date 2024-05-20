import { Button, Flex, Select } from "antd";
import { useQuery } from "@tanstack/react-query";
import "./lichchieu.css";
import {
  getThongTinCumRapTheoHeThong,
  getThongTinHeThongRap,
  getThongTinLichChieuHeThongRap,
  getThongTinLichChieuPhim,
} from "../../../apis/movie";
import {
  CumRapChieu,
  HeThongRapChieu,
  LichChieuPhim,
  ShowMovie,
} from "../../../types/movie.type";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClockCircleOutlined, StarOutlined } from "@ant-design/icons";

interface MarapProps {
  marap: string;
}
export default function LichChieuComponent(props:MarapProps) {
  const [maRap, setMarap] = useState(props.marap);
  const navigate = useNavigate();
  let { id } = useParams();

  const { data: dataTTC, isLoading: isLoadingTTC } = useQuery({
    queryKey: ["ThongTinLichChieuPhim"],
    queryFn: () => getThongTinLichChieuPhim(id ?? ""),
  });

  const cloneTTC: ShowMovie | undefined = dataTTC;
  const rapDaChon = (maLichChieu:string) => {
    navigate("/bookingseat/"+ maLichChieu);
  };
  function renderRapToanQuoc() {
    if(isLoadingTTC) {
      return <div>Loading...</div>
    }
    else{
      const listFilter: any = useMemo(() => {
        if(!!maRap){
          return cloneTTC?.heThongRapChieu?.filter((item: HeThongRapChieu) => item.maHeThongRap === maRap);
        }
        else{
          return cloneTTC?.heThongRapChieu;
        }
      }, [maRap]);
      return listFilter?.map((item: HeThongRapChieu) => {
        return (
          <div>
            <h2 className="font-bold">{item.tenHeThongRap}</h2>
            {item.cumRapChieu?.map((cr) => {
              return (
                <div>
                  <h4 className="m-3">
                    <StarOutlined /> {cr.tenCumRap}
                  </h4>
                  <div className="grid-cols-3 grid">
                    {cr.lichChieuPhim.map((lc) => {
                      return (
                        <Button
                        onClick={() => {
                          rapDaChon(lc.maLichChieu);
                        }}
                          key={lc.maLichChieu}
                          className="button-lichchieu m-2 font-bold bg-white"
                        >
                          <p>
                            {dayjs(lc.ngayChieuGioChieu.toString()).format(
                              "DD/MM"
                            )}
                          </p>
                          <p>
                            {dayjs(lc.ngayChieuGioChieu.toString()).format(
                              "HH:mm"
                            )}
                          </p>
                          <i>
                            {" "}
                            {lc.thoiLuong} <ClockCircleOutlined />
                          </i>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      });
    }
    
  }

  const renderLichChieu = () => {
    return cloneTTC?.heThongRapChieu.map((item) => {
      return (
        <div key={item.maHeThongRap}>
          <img src={item.logo}  width={60} style={{ cursor: "pointer" }} onClick={() => setMarap(item.maHeThongRap)}/>
        </div>
      );
    });
  }
  return (
    <div>
      <Flex wrap gap="middle" justify="space-start" align="center">
        {renderLichChieu()}
      </Flex>
      <Flex
        wrap
        gap="middle"
        justify="space-between"
        align="baseline"
        className="mt-5"
      >

        { renderRapToanQuoc()}
      </Flex>
    </div>
  );
}

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

export default function LichChieuComponent() {
  const [maRap, setMarap] = useState("");
  const navigate = useNavigate();
  let { id } = useParams();
  const { data } = useQuery({
    queryKey: ["ThongTinLichChieuHeThongRap"],
    queryFn: () => getThongTinLichChieuHeThongRap("CGV", "GP01"),
  });
  const { data: dataRTQ } = useQuery({
    queryKey: ["ThongTinRapToanQuoc"],
    queryFn: () => getThongTinHeThongRap(),
  });
  const { data: dataCR, isLoading } = useQuery({
    queryKey: ["ThongTinCumRapTheoHeThong"],
    queryFn: () => getThongTinCumRapTheoHeThong(maRap),
    enabled: !!maRap,
    refetchInterval: 500,
  });
  const { data: dataTTC, isLoading: isLoadingTTC } = useQuery({
    queryKey: ["ThongTinLichChieuPhim"],
    queryFn: () => getThongTinLichChieuPhim(id ?? ""),
  });
  const cloneDataCR: any = dataCR;
  const [lstLCTheoRap, setlstLCTheoRap] = useState<LichChieuPhim[] | undefined>(
    []
  );
  const cloneTTC: ShowMovie | undefined = dataTTC;
  const rapDaChon = () => {
    navigate("/bookingseat");
  };
  function renderRapToanQuoc() {
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
                        rapDaChon();
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
  // function renderRapToanQuoc() {
  //   return cloneTTC?.heThongRapChieu?.map((item: HeThongRapChieu) => {
  //     return (
  //       <div>
  //         <h2 className="font-bold">{item.tenHeThongRap}</h2>
  //         {item.cumRapChieu?.map((cr) => {
  //           return (
  //             <div>
  //               <h4 className="m-3">
  //                 <StarOutlined /> {cr.tenCumRap}
  //               </h4>
  //               <div className="grid-cols-3 grid">
  //                 {cr.lichChieuPhim.map((lc) => {
  //                   return (
  //                     <Button
  //                       key={lc.maLichChieu}
  //                       className="button-lichchieu m-2 font-bold bg-white"
  //                     >
  //                       <p>
  //                         {dayjs(lc.ngayChieuGioChieu.toString()).format(
  //                           "DD/MM"
  //                         )}
  //                       </p>
  //                       <p>
  //                         {dayjs(lc.ngayChieuGioChieu.toString()).format(
  //                           "HH:mm"
  //                         )}
  //                       </p>
  //                       <i>
  //                         {" "}
  //                         {lc.thoiLuong} <ClockCircleOutlined />
  //                       </i>
  //                     </Button>
  //                   );
  //                 })}
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     );
  //   });
  // }
  function renderLichChieu() {
    return cloneTTC?.heThongRapChieu.map((item) => {
      return (
        <>
          <img src={item.logo} width={60} style={{ cursor: "pointer" }} onClick={() => setMarap(item.maHeThongRap)}/>
        </>
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
        {renderRapToanQuoc()}
      </Flex>
    </div>
  );
}

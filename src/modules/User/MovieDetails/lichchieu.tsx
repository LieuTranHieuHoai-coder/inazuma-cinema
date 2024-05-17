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
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ClockCircleOutlined, StarOutlined } from "@ant-design/icons";

export default function LichChieuComponent() {
  const [maRap, setMarap] = useState("");
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
  const rapDaChon = (e: any) => {
    const CRfound: HeThongRapChieu[] | undefined =
      cloneTTC?.heThongRapChieu?.filter(
        (item: HeThongRapChieu) => item.maHeThongRap === maRap
      );
    const founded: CumRapChieu[] | undefined = CRfound?.[0].cumRapChieu?.filter(
      (cr: CumRapChieu) => cr.maCumRap === e
    );
    setlstLCTheoRap(founded?.[0].lichChieuPhim);
  };
  function renderRapToanQuoc() {
    return cloneTTC?.heThongRapChieu?.map((item: HeThongRapChieu) => {
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
  function renderLichChieu() {
    return cloneTTC?.heThongRapChieu.map((item) => {
      return (
        <>
          <img src={item.logo} width={60} style={{ cursor: "pointer" }} />
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
        justify="space-start"
        align="baseline"
        className="mt-5"
      >
        {renderRapToanQuoc()}
      </Flex>
    </div>
  );
}

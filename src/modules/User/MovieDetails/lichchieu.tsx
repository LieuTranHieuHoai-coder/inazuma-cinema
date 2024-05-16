import { Button, Card, Flex, Select, Image } from 'antd';
import { useQuery } from '@tanstack/react-query';
import './lichchieu.css';
import { getThongTinCumRapTheoHeThong, getThongTinHeThongRap, getThongTinLichChieuHeThongRap, getThongTinLichChieuPhim } from '../../../apis/movie';
import { CumRapChieu, HeThongRapChieu, LichChieuPhim, ListRap, LstRapToanQuoc, ShowMovie } from '../../../types/movie.type';
import dayjs from "dayjs";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Meta from 'antd/es/card/Meta';
import { ClockCircleOutlined } from '@ant-design/icons';

export default function LichChieuComponent() {
    const [maRap, setMarap] = useState("");
    let { id } = useParams();
    const { data } = useQuery({
        queryKey: ["ThongTinLichChieuHeThongRap"],
        queryFn: () => getThongTinLichChieuHeThongRap("CGV", "GP01")
    });
    const { data: dataRTQ } = useQuery({
        queryKey: ["ThongTinRapToanQuoc"],
        queryFn: () => getThongTinHeThongRap()
    });
    const { data: dataCR, isLoading } = useQuery({
        queryKey: ["ThongTinCumRapTheoHeThong"],
        queryFn: () => getThongTinCumRapTheoHeThong(maRap),
        enabled: !!maRap,
        refetchInterval: 500,
    });
    const { data: dataTTC, isLoading: isLoadingTTC } = useQuery({
        queryKey: ["ThongTinLichChieuPhim"],
        queryFn: () => getThongTinLichChieuPhim(id ?? ''),
    });
    const cloneDataCR: any = dataCR;
    const [lstLCTheoRap, setlstLCTheoRap] = useState<LichChieuPhim[] | undefined>([]);
    const cloneTTC: ShowMovie | undefined = dataTTC;
    const rapDaChon = (e: any) => {
        const CRfound: HeThongRapChieu[] | undefined = cloneTTC?.heThongRapChieu?.filter((item: HeThongRapChieu) => item.maHeThongRap === maRap);
        const founded: CumRapChieu[] | undefined = CRfound?.[0].cumRapChieu?.filter((cr: CumRapChieu) => cr.maCumRap === e);
        setlstLCTheoRap(
            founded?.[0].lichChieuPhim
        );
        //lstLCTheoRap = founded?.[0].lichChieuPhim;

    }
    function renderRapToanQuoc() {
        return (
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Chọn Rạp Chiếu"
                onChange={(value: string) => setMarap(() => {
                    return value;
                })}
                options={cloneTTC?.heThongRapChieu?.map((item: HeThongRapChieu) => {
                    return {
                        value: item.maHeThongRap,
                        label: (item.tenHeThongRap as string) ?? ''
                    }
                })}
            />)
    }
    function renderCumRap() {
        if (maRap.length <= 0) {
            return (
                <Select
                    className='ml-3'
                    disabled
                    style={{ width: 200 }}
                    placeholder="Chọn Cụm Rạp"
                />)
        }
        else {
            const filterRap = cloneTTC?.heThongRapChieu.filter((item: HeThongRapChieu) =>
                item.maHeThongRap === maRap
            );
            return (
                <Select
                    className='ml-3'
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Chọn Cụm Rạp"
                    onSelect={(e) => rapDaChon(e)}
                    options={filterRap?.[0].cumRapChieu?.map((item: any) => {
                        return {
                            value: item.maCumRap,
                            label: (item.tenCumRap as string)
                        }
                    })}
                />
            )

        }

    }
    function renderLichChieu() {
        return cloneTTC?.heThongRapChieu.map((item) => {
            return (
                <>
                    <Image src={item.logo} />
                </>
            )
        });

    }
    function renderLichChieuTheoRap() {
        console.log(lstLCTheoRap);
        return lstLCTheoRap?.map((item) => {
            return (
                <>

                    <Button key={item.maLichChieu} type="primary" style={{ background: '#000' }} className='button-lichchieu'>
                        <p>{dayjs(item.ngayChieuGioChieu.toString()).format("DD/MM")}</p>
                        <p>{dayjs(item.ngayChieuGioChieu.toString()).format("HH:mm")}</p>
                        <i> {item.thoiLuong} <ClockCircleOutlined /></i>
                    </Button>

                </>
            )
        });
    }
    return (
        <div>
            <Flex wrap gap="middle" justify='space-start' align='center'>
                {renderLichChieu()}
            </Flex>
            <div className='m-3'>
                {renderRapToanQuoc()}

                {renderCumRap()}
                <Flex wrap gap="middle" justify='space-start' align='center' className='mt-3'>
                    {renderLichChieuTheoRap()}
                </Flex>

            </div>
        </div>
    )
}

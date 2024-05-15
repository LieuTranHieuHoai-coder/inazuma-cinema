import { Button, Flex, Select } from 'antd';
import "./lichchieu.css";
import { useQuery } from '@tanstack/react-query';
import { getThongTinCumRapTheoHeThong, getThongTinHeThongRap, getThongTinLichChieuHeThongRap } from '../../../apis/movie';
import { ListRap, LstRapToanQuoc } from '../../../types/movie.type';
import { useState } from 'react';

export default function LichChieuComponent() {
    const [maRap, setMarap] = useState("");

    const { data } = useQuery({
        queryKey: ["ThongTinLichChieuHeThongRap"],
        queryFn: () => getThongTinLichChieuHeThongRap("CGV", "GP01")
    });
    const { data: dataRTQ } = useQuery({
        queryKey: ["ThongTinRapToanQuoc"],
        queryFn: () => getThongTinHeThongRap()
    });
    const { data: dataCR } = useQuery({
        queryKey: ["ThongTinCumRapTheoHeThong"],
        queryFn: () => getThongTinCumRapTheoHeThong(maRap),
        enabled: !!maRap,
        refetchOnWindowFocus: true,
    });
    console.log(dataCR);
    function renderRapToanQuoc() {
        return (
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Chọn Rạp Chiếu"
                onChange={(value: string) => setMarap(value)}
                options={dataRTQ?.map((item: LstRapToanQuoc) => {
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
                    disabled
                    style={{ width: 200 }}
                    placeholder="Chọn Cụm Rạp"
                />)
        }
        else {
            return (
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Chọn Cụm Rạp"
                    options={dataCR?.map((item: ListRap) => {
                        return {
                            value: item.maCumRap,
                            label: (item.tenCumRap as string)
                        }
                    })}
                />
            )

        }

    }
    return (
        <div>
            <div className='m-3'>
                {renderRapToanQuoc()}
                {renderCumRap()}
            </div>

            <Flex wrap gap="middle" justify='space-between' >
                {Array.from({ length: 24 }, (_, i) => (
                    <Button key={i} type="primary" style={{ background: '#034ea2' }} className='button-lichchieu'>
                        <p>Ngày chiếu</p>
                        <p>01/01</p>
                    </Button>
                ))}
            </Flex>
        </div>
    )
}

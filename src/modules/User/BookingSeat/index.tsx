import React from 'react'
import "./bookingseat.css";
import data from './danhSachGhe.json';
export default function () {
    const seats = data;
    const renderLine = () => {
        return seats?.map((item, index) => {
            return (
                <tr key={index}>
                    <td className="td" key={index}>{item.hang}</td>
                    {renderSeat(item.danhSachGhe, item.hang)}
                </tr>
            );
        });

    };
    function renderSeat(data: any, hang: any) {
        let i = 1;
        return data.map((item: any) => {
            if (hang === "") {
                return (
                    <td key={i++} className="td">
                        {i}
                    </td>
                )
            } else {
                if (item.daDat === true) {
                    return (
                        <td key={i++} className="td">
                            <input
                                type="checkbox"
                                className="checkbox-gray"
                                style={{ backgroundColor: "#d1d5db" }}
                                disabled

                                checked={item.daDat}
                                defaultValue={item.soGhe}
                            />
                        </td>
                    );
                } else {
                    return (
                        <td key={i++} className="td">
                            <input
                                type="checkbox"
                                className="checkbox"
                            />
                        </td>
                    );
                }
            }

        });
    };
    return (
        <div>
            <div className="center">
                <div className="tickets">
                    <div className="ticket-selector">
                        <div className="grid-cols-2 grid">
                            <div>
                                <div className="mx-5 flex flex-nowrap justify-evenly">
                                    <div className='flex items-baseline'><div className="box-white"></div> Available</div>
                                    <div className='flex items-baseline'><div className="box-green"></div> Booked</div>
                                    <div className='flex items-baseline'><div className="box-gray"></div> Selected</div>
                                </div>
                                <table>
                                    <tbody>{renderLine()}</tbody>
                                </table>
                            </div>
                            <div>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

import React, { useEffect, useState } from 'react';

export default function TableBody({
    columns,
    data,
    numberEntries,
    currentPage,
    setMinIndex,
    setCurrentNumberOfEntries
}) {
    const [newData, setNewData] = useState(data);

    useEffect(() => {
        const index = numberEntries * (currentPage - 1);
        const maxIndex = index + Number(numberEntries);
        setMinIndex(index);
        const slicedData = data.slice(index, maxIndex);
        setNewData(slicedData);
        setCurrentNumberOfEntries(slicedData.length);
    }, [numberEntries, currentPage, data, setCurrentNumberOfEntries, setMinIndex]);

    const dateFormat = (date) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString('en-US');
    };

    return (
        <tbody>
            {newData.map((data, key) => {
                return (
                    <tr key={key}>
                        {columns.map(({ key }) => {
                            let tData;
                            if (key.includes('date'))
                                tData = data[key]
                                    ? dateFormat(data[key])
                                    : '--';
                            else tData = data[key] ? data[key] : '--';
                            return (
                                <td key={key}>
                                    <div className="cell-data">{tData}</div>
                                </td>
                            );
                        })}
                    </tr>
                );
            })}
        </tbody>
    );
}

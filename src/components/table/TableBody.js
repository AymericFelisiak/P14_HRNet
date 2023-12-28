import React from 'react';

export default function TableBody({ columns, data }) {
    return (
        <tbody>
            {data.map((data, key) => {
                return (
                    <tr key={key}>
                        {columns.map(({ key }) => {
                            const tData = data[key] ? data[key] : '--';
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

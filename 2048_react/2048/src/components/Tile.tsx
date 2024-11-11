import React from "react";

export type TileObject = {
    value: number;
    x: number;
    y: number;
    isMerging: boolean;
    isNew: boolean;
}

type TileProps = {
  TileObj: TileObject;
};

export function Tile({TileObj}: TileProps){
    let tileClass = `flex items-center justify-center font-bold rounded-md bg-tile-${TileObj.value}
    transition-transform duration-200 ease-in-out
    ${TileObj.isMerging ? 'scale-110' : ''}
    ${TileObj.isNew ? 'opacity-0 animate-fade-in' : ''}`;

    if (TileObj.value === 2 || TileObj.value === 4) {
        tileClass += 'text-gray';
    } else {
        tileClass += 'text-white';
    }
    if (TileObj.value <= 512) {
        tileClass += 'text-2xl';
    } else {
        tileClass += 'text-xl';
    }

    const tileStyle = {
        transform: `translate(${TileObj.x * 100}%, ${TileObj.y * 100}%)`,
    };

    if (TileObj.value === 0) {
        return (
            <div>
                ''
            </div>
        );
    } else {
        return (
            <div className = "tile">
                <div className = {tileClass} style = {tileStyle}>
                    {TileObj.value}
                </div>
            </div>
        );
    }
}
import React from "react";
import './index.css';

interface SquareProps {
    turn: string,
    color: string,
    onClick: Function
}

export default function Square(props: SquareProps) {

    return (
        <div>
            <button
                className="square"
                onClick={() => props.onClick({ value: props.turn })}
                style={{ backgroundColor: props.color }}
            >
                {props.turn}
            </button>
        </div>
    );

}
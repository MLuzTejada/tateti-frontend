import './index.css';
import Square from "./Square";

interface BoardProps {
    board: {
        squares: string[],
        colors: string[],
    };
    disabled: boolean;
    onClick: (i: number) => any;
}

export default function Board(props: BoardProps) {

    const renderSquare = (i: number) => {
        return <Square
            turn={props.board.squares[i]}
            color={props.board.colors[i]}
            onClick={() => props.onClick(i)}
        />;
    }

    return (
        <div style={props.disabled ? { pointerEvents: "none", opacity: "0.9" } : {}}>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    )

}
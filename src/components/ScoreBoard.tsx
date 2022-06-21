import './index.css';

interface ScoreBoardProps {
    scoreX: number,
    scoreO: number,
}

export default function ScoreBoard(props: ScoreBoardProps) {
    return (
        <div className="score-board">
            <div>{props.scoreO}</div>
            <div>{props.scoreX}</div>
        </div>
    )
}

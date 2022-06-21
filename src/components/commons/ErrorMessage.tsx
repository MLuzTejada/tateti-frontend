
interface ErrorProps {
    error: string;
}

export default function ErrorMessage(props: ErrorProps) {

    return (
        <text style={{ color: "red" }}>{props.error}</text>
    );
}
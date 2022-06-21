import '../index.css'

interface TextProps {
    value: string
}

export default function Text(props: TextProps) {
    return (
        <h4 className="text">{props.value}</h4>
    );
}
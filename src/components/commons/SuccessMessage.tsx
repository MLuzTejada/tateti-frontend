import './SuccessMessage.css';


interface TextProps {
    value: string
}

export default function SuccessMessage(props: TextProps) {
    return (
        <h3 className="animate-charcter"> {props.value} </h3>
    );
}
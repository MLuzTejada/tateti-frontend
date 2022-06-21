import '../index.css'

interface ButtonProps {
    className: string;
    value: string;
    onClick?: (() => any);
}

export default function Button(props: ButtonProps) {

    return (
        <div>
            <button
                type="button"
                className={props.className}
                onClick={props.onClick}
            >
                {props.value}
            </button>
            <br></br>
        </div>
    );
}

export default function Button(props: ButtonProps) {
    return (
        <button
            onClick={props.onclick}
            disabled={props.disabled ?? false}
            type={props.type ?? 'button'}
            className={props.className ?? "btn btn-primary"}>
            {props.children}
        </button>
    )
}

interface ButtonProps {
    children: React.ReactNode;
    onclick?(): void;
    type?: 'button' | 'submit';
    disabled?: boolean;
    className?: string;
}

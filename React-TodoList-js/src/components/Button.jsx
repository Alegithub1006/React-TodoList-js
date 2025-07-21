export function  Button({label,parenthMetod, changeMetod , className}){
    return(
        <button onChange={changeMetod} onClick={parenthMetod} className={className}>
            {label}
        </button>
    );
}

export default Button;
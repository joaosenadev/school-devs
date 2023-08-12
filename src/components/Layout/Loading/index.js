import ReactLoading from "react-loading";

export function Loading({ color, size }) {
    return (
        <ReactLoading height={size} width={size} type="spin" color={color} />
    )
}

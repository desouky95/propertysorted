import { ImageResponse } from "next/og";
import Logo from "../assets/logo";

export const size = {
    width: 32,
    height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
    return new ImageResponse((<Logo />), { ...size })
}
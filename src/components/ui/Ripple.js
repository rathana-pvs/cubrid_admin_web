import { createRipples } from 'react-ripples'
import Ripples from 'react-ripples'
const MyRipples = createRipples({
    color: 'var(--primary-color)',
    during: 500,
})


export default function () {
    return <Ripples during={500} colors={'var(--primary-color)'} />
};
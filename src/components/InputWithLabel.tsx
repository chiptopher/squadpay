import * as React from "react";

import './InputWithLabel.scss';

interface Props extends React.HTMLProps<HTMLInputElement> {
    label: string;
}

export function InputWithLabel(props: Props) {
    return <div className={'input-with-label'}>
        <span className={'label'}> {props.label} </span>
        <input className={'input'} {...props}/>
    </div>
}

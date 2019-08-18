import * as React from "react";

import "./Modal.scss";

interface Props {
    onClose: () => void;
}

export const Modal: React.FunctionComponent<Props> = (props) => {
    return <div className={'modal'}>
        <div className={'modal-content'}>
            {props.children}
        </div>
    </div>;
};

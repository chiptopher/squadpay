import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faAngleRight} from "@fortawesome/free-solid-svg-icons";


export const ToggleArrow: React.FunctionComponent<{ toggled: boolean }> = (props) => {
    return !props.toggled ? <FontAwesomeIcon icon={faAngleRight}/> :
        <FontAwesomeIcon icon={faAngleDown}/>;
};

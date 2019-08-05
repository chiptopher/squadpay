import * as React from "react";

import "./Page.scss";

interface Props {

}

export const Page : React.FunctionComponent<Props> = props =>
    <div className={"Page"}>{props.children}</div>;


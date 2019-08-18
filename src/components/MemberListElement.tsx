import * as React from "react";
import {Member} from "../models/Member";
import {Squad} from "../models/Squad";

import "./MemberListElement.scss";

interface Props {
    member: Member
    squad: Squad
}

export function MemberListElement(props: Props) {
    return <div className={"MemberListElement"}>
        <div id={props.member.name.replace(/\s+/g, "-")}>
            <div className={"memberHeader"}>
                <div>
                    {props.member.name}
                </div>
            </div>
        </div>
    </div>;
}

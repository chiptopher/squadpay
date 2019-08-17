import * as React from "react";
import {Member} from "../models/Member";
import {Squad} from "../models/Squad";
import {money} from "../util/money";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faAngleRight} from "@fortawesome/free-solid-svg-icons";

import "./MemberListElement.scss";

interface Props {
    member: Member
    squad: Squad
}

interface State {
    toggled: boolean
}

export class MemberListElement extends React.Component<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            toggled: false
        };
        this.otherSquadMembers = this.otherSquadMembers.bind(this);
    }

    render() {
        return <div className={"MemberListElement"}>
            <div id={this.props.member.name.replace(/\s+/g, "-")}
                 onClick={() => {
                     this.setState({
                         toggled: !this.state.toggled
                     })
                 }}>
                <div className={"memberHeader"}>
                    <div>
                        {this.props.member.name}
                    </div>
                </div>
            </div>
        </div>
    }

    otherSquadMembers(): Member[] {
        return this.props.squad.squadMembers.filter((member: Member) => {
            return member !== this.props.member;
        });
    }
}

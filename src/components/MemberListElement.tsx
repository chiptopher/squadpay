import * as React from "react";
import {Member} from "../models/Member";


interface Props {
    member: Member
}

interface State {

}

export class MemberListElement extends React.Component<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {}
    }

    render() {
        return <div>
            {this.props.member.name} contributed ${this.props.member.contribution.toFixed(2)}
        </div>
    }

}

import * as React from "react";
import {Squad} from "../models/Squad";
import {Member} from "../models/Member";
import {AddMember} from "../components/AddMember";
import {MemberListElement} from "../components/MemberListElement";
import {money} from "../util/money";
import logo from "../logo.png"

import "./Dashboard.scss";

export interface Props {

}

interface State {
    squad: Squad;
    currentInput: string;
    width: number;
}

export class Dashboard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            squad: new Squad(),
            currentInput: '',
            width: window.innerWidth
        };
        this.generateContainerStyle = this.generateContainerStyle.bind(this);
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({width: window.innerWidth});
    };

    generateContainerStyle(): string {
        const isMobile = this.state.width <= 500;
        let finalStyle = isMobile ? 'mobileSquadContainer' : 'squadContainer';
        return finalStyle;
    }

    render() {
        return <div className={"Dashboard"}>
            <div className={"title"}>
                <img className={"logo"} src={logo}/>
                <span className={"titleSquad"}>squad</span>
                <span className={"titlePay"}>pay</span>
            </div>
            <div className={this.generateContainerStyle()}>
                <div className={"costOfTrip"}>
                    <span className={"costOfTripText"}>Trip Cost:</span>
                    <span className={"costOfTripMoney"}>{money(this.state.squad.costOfTrip())}</span>
                </div>
                <div className={"addMember"}>
                    <AddMember onMemberSubmit={(member) => {
                        const squad = this.state.squad;
                        squad.addSquadMember(member);
                        this.setState({
                            squad: squad
                        })
                    }}/>
                </div>
                <div className={"membersContainer"}>
                    {
                        this.state.squad.squadMembers.map((member) => {
                            return <div key={member.name} className={"member"}>
                                <MemberListElement member={member} squad={this.state.squad}/>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>;
    }
}

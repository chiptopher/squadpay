import * as React from "react";
import {Squad} from "../models/Squad";
import {Page} from "../components/Page";
import {AddMember} from "../components/AddMember";
import {MemberListElement} from "../components/member-list-element/MemberListElement";
import {money} from "../util/money";

import "./Dashboard.scss";
import {addContributions, Member} from "../models/Member";

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
        this.loadMembers = this.loadMembers.bind(this);
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

    private onMemberSubmit = (member: Member) => {
        const squad = this.state.squad;
        squad.addSquadMember(member);
        this.setState({
            squad: squad
        })
    };

    private readonly loadMembers = () => {
        return this.state.squad.squadMembers.map((member) => {
            return <div key={member.name} className={"member"}>
                <MemberListElement addContribution={(name: string, amount: number) => {
                    addContributions(member, name, amount);
                    this.setState({
                        squad: this.state.squad
                    })
                }} member={member} squad={this.state.squad}/>
            </div>
        })
    };

    render() {
        return <Page>
            <div className={"Dashboard"}>
                <div className={"title"}>
                    <span className={"titleSquad"}>squad</span>
                    <span className={"titlePay"}>pay</span>
                </div>
                <div className={'total-cost'}>
                        <span>Total Cost {money(this.state.squad.totalCostOfContributions())}</span>
                </div>
                <div className={"squadContainer"}>
                    <div className={"addMember"}>
                        <AddMember onMemberSubmit={this.onMemberSubmit}/>
                    </div>
                    <div className={"membersContainer"}>{this.loadMembers()}</div>
                </div>
            </div>
        </Page>;
    }
}

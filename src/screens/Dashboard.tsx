import * as React from "react";
import {Squad} from "../models/Squad";
import {Member} from "../models/Member";
import {AddMember} from "../components/AddMember";
import {MemberListElement} from "../components/MemberListElement";

export interface Props {

}

interface State {
    squad: Squad;
    currentInput: string;
}

export class Dashboard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            squad: new Squad(),
            currentInput: '',
        };
    }


    render() {
        return <div>
            <h1>Squad Mates</h1>
            <div>
                Trip Cost: ${this.state.squad.costOfTrip().toFixed(2)}
            </div>
            <div>
                {
                    this.state.squad.squadMembers.map((member) => {
                        return <MemberListElement key={member.name} member={member}/>
                    })
                }
            </div>
            <AddMember onMemberSubmit={(member) => {
                const squad = this.state.squad;
                squad.addSquadMember(member);
                this.setState({
                    squad: squad
                })
            }}/>
        </div>;
    }
}

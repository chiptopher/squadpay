import * as React from "react";
import {Squad} from "../models/Squad";
import {Member} from "../models/Member";
import {AddMember} from "../components/AddMember";

export interface Props {

}

interface State {
    squad: Squad;
    currentInput: string;
    addingMember: boolean;
}

export class Dashboard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            squad: new Squad(),
            currentInput: '',
            addingMember: false
        };

        this.addSquadMate = this.addSquadMate.bind(this);
    }


    render() {
        return <div>
            <h1>Squad Mates</h1>
            <div>{
                this.state.squad.squadMembers.map(this.addSquadMate)
            }
            </div>
            <AddMember onMemberSubmit={(member) => {
                const squad = this.state.squad;
                squad.addSquadMember(member);
                this.setState({
                    addingMember: false,
                    squad: squad
                })
            }}/>
        </div>;
    }

    addSquadMate(squadMate: Member) {
        return <div key={squadMate.name}>
            <div>
                {squadMate.name} contributed ${squadMate.contribution.toFixed(2)}
            </div>
        </div>;
    }
}

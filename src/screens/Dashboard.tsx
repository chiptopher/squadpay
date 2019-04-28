import * as React from "react";
import {Squad} from "../models/Squad";
import {Member} from "../models/Member";
import {AddMember} from "../components/AddMember";
import {MemberListElement} from "../components/MemberListElement";
import {money} from "../util/money";

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
        return <div style={styles.container}>
            <div style={styles.title}>
                <span style={styles.titleSquad}>app</span>
                <span style={styles.titlePay}>doodad</span>
            </div>
            <div style={styles.squadContainer}>
                <div style={styles.costOfTrip}>
                    <span style={styles.costOfTripText}>Trip Cost:</span>
                    <span style={styles.costOfTripMoney}>{money(this.state.squad.costOfTrip())}</span>
                </div>
                <div>
                    {
                        this.state.squad.squadMembers.map((member) => {
                            return <MemberListElement key={member.name} member={member} squad={this.state.squad}/>
                        })
                    }
                </div>
                <div style={styles.addMember}>
                    <AddMember onMemberSubmit={(member) => {
                        const squad = this.state.squad;
                        squad.addSquadMember(member);
                        this.setState({
                            squad: squad
                        })
                    }}/>
                </div>
            </div>
        </div>;
    }
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column" as "column",
        alignItems: "center",
        padding: 20
    },
    title: {
        fontWeight: 700,
        fontSize: 64,
        marginBottom: 50,
    },
    titleSquad: {
        color: "#34495e"
    },
    titlePay: {
        color: "#f1c40f"
    },
    squadContainer: {
        width: "60%"
    },
    costOfTrip: {
        fontSize: 24,
        marginTop: 10,
        marginBottom: 10
    },
    costOfTripText: {
        fontWeight: 700,
        color: "#34495e"
    },
    costOfTripMoney: {
        color: "#16a085",
        paddingLeft: 15
    },
    addMember: {
        marginTop: 10,
        marginBottom: 10
    }
};

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

    generateContainerStyle() {
        const isMobile = this.state.width <= 500;
        let finalStyle = isMobile ? {...styles.squadContainer, ...{width: "100%"}} : styles.squadContainer;
        return finalStyle
    }

    render() {
        return <div style={styles.container}>
            <div style={styles.title}>
                <span style={styles.titleSquad}>squad</span>
                <span style={styles.titlePay}>pay</span>
            </div>
            <div style={this.generateContainerStyle()}>
                <div style={styles.costOfTrip}>
                    <span style={styles.costOfTripText}>Trip Cost:</span>
                    <span style={styles.costOfTripMoney}>{money(this.state.squad.costOfTrip())}</span>
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
                <div style={styles.membersContainer}>
                    {
                        this.state.squad.squadMembers.map((member) => {
                            return <div key={member.name} style={styles.member}>
                                <MemberListElement member={member} squad={this.state.squad}/>
                            </div>
                        })
                    }
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
        width: "40%",
        height: "100%",
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
        width: "100%",
        marginTop: 10,
        marginBottom: 10
    },
    membersContainer: {
        paddingTop: 30,
    },
    member: {
        marginBottom: 15
    }
};

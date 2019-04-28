import * as React from "react";
import {Member} from "../models/Member";
import {Squad} from "../models/Squad";
import {money} from "../util/money";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faAngleRight} from "@fortawesome/free-solid-svg-icons";


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
        }
        this.otherSquadMembers = this.otherSquadMembers.bind(this);
    }

    render() {
        return <div>
            <div id={this.props.member.name.replace(/\s+/g, "-")}
                 onClick={() => {
                     this.setState({
                         toggled: !this.state.toggled
                     })
                 }}>
                <div style={styles.header}>
                    <div style={styles.toggleIndicator}>
                        {this.state.toggled ?
                            <FontAwesomeIcon icon={faAngleDown}/> :
                            <FontAwesomeIcon icon={faAngleRight}/>
                        }
                    </div>
                    <div>
                        {this.props.member.name}: {money(this.props.member.contribution)}
                    </div>
                </div>
            </div>
            {
                this.state.toggled && <div>
                    {this.otherSquadMembers().map((member: Member, index) => {
                        const owedAmount = this.props.squad.debtOfMemberToMember(member, this.props.member);
                        const text = owedAmount > 0 ?
                            `owed from ${member.name}: ${money(owedAmount)}` :
                            `owed to ${member.name}: ${money(-1 * owedAmount)}`;
                        return <div style={styles.debtorsContainer} key={index}>{text}</div>
                    })}
                </div>
            }
        </div>
    }

    otherSquadMembers(): Member[] {
        return this.props.squad.squadMembers.filter((member: Member) => {
            return member !== this.props.member;
        });
    }
}

const styles = {
    header: {
        display: "flex",
    },
    debtorsContainer: {
        paddingLeft: 44
    },
    toggleIndicator: {
        width: 24,
        paddingRight: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center" as "center"

    }
}

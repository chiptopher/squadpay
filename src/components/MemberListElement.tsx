import * as React from "react";
import {Member} from "../models/Member";
import {Squad} from "../models/Squad";
import {money} from "../util/money";


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
                 onClick={() => {this.setState({
                     toggled: !this.state.toggled
                 })}}>
                {this.props.member.name} contributed ${this.props.member.contribution.toFixed(2)}
            </div>
            {
                this.state.toggled && <div>
                    {this.otherSquadMembers().map((member: Member, index) => {
                        const owedAmount = this.props.squad.debtOfMemberToMember(member, this.props.member);
                        return <div style={styles.debtorsContainer} key={index}>
                            owed from {member.name}: {money(owedAmount)}
                        </div>
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
    debtorsContainer: {
        paddingLeft: 10
    }
}
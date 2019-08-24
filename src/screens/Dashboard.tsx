import * as React from "react";
import {Squad} from "../models/Squad";
import {Page} from "../components/Page";
import {AddMember} from "../components/AddMember";
import {MemberListElement} from "../components/member-list-element/MemberListElement";
import {money} from "../util/money";

import "./Dashboard.scss";
import {addContributions, Member} from "../models/Member";
import {useState} from "react";

export interface Props {
}

export function Dashboard(props: Props){

    const [squad, setSquad] = useState(new Squad());

    const deepCopyOfSquad = (): Squad => {
        const newSquad = new Squad();
        squad.squadMembers.forEach((member) => {
            newSquad.addSquadMember(member);
        });
        return newSquad;
    }

    const onMemberSubmit = (member: Member) => {
        const newSquad = deepCopyOfSquad();
        newSquad.addSquadMember(member);
        setSquad(newSquad);
    };

    const loadMembers = () => {
        return squad.squadMembers.map((member) => {
            return <div key={member.name} className={"member"}>
                <MemberListElement addContribution={(name: string, amount: number) => {
                    addContributions(member, name, amount);
                    setSquad(deepCopyOfSquad());
                }} member={member} squad={squad}/>
            </div>
        })
    };

        return <Page>
            <div className={"Dashboard"}>
                <div className={"title"}>
                    <span className={"titleSquad"}>squad</span>
                    <span className={"titlePay"}>pay</span>
                </div>
                <div className={"squadContainer"}>
                    <div className={'total-cost'}>
                        <span>Total Cost {money(squad.totalCostOfContributions())}</span>
                    </div>
                    <div className={"addMember"}>
                        <AddMember onMemberSubmit={onMemberSubmit}/>
                    </div>
                    <div className={"membersContainer"}>{loadMembers()}</div>
                </div>
            </div>
        </Page>;

}

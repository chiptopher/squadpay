import {Squad} from "../../models/Squad";
import {Member} from "../../models/Member";
import * as React from "react";

interface Props {
    squad: Squad
    member: Member;
}

export function PaymentsList(props: Props) {
    return <div>
        {
            props.squad.otherSquadMembers(props.member).map((other) => {
                return <div key={other.name}>Owed by {other.name}</div>
            })
        }
    </div>
}

import {Squad} from "../../models/Squad";
import {Member} from "../../models/Member";
import * as React from "react";
import {money} from "../../util/money";

interface Props {
    squad: Squad
    member: Member;
}

export function PaymentsList(props: Props) {
    return <div>
        {
            props.squad.otherSquadMembers(props.member).map((other) => {
                const amountOwed = props.squad.debtOfMemberToMember(other, props.member);
                return <div key={other.name}>
                    <span>Owed {amountOwed < 0 ? 'to' : 'by'} {other.name}&nbsp;</span>
                    <span className={amountOwed < 0 ? 'debt-text' : 'credit-text'}>{money(amountOwed)}</span>
                </div>
            })
        }
    </div>
}

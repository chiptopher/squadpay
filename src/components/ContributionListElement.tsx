import * as React from "react";
import {Contribution} from "../models/Contribution";
import {money} from "../util/money";

interface Props {
    contribution: Contribution
}
export function ContributionListElement(props: Props) {
    return <div>
        {props.contribution.name} {money(props.contribution.amount)}
    </div>
}

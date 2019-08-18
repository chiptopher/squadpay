import * as React from "react";
import {Contribution} from "../../models/Contribution";
import {money} from "../../util/money";

import "./ContributionListElement.scss";

interface Props {
    contribution: Contribution
}

export function ContributionListElement(props: Props) {
    return <div className={'contribution-list-element'}>
        {props.contribution.name} {money(props.contribution.amount)}
    </div>
}

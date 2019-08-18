import * as React from "react";
import {Member} from "../../models/Member";
import {Contribution} from "../../models/Contribution";
import {ContributionListElement} from "./ContributionListElement";


export const ContributionsList: React.FunctionComponent<{ member: Member }> = (props) => {
    return <div> {
        props.member.contributions && props.member.contributions.map((contribution: Contribution) => {
            return <ContributionListElement key={props.member.name + contribution.name}
                                            contribution={contribution}/>;
        })
    }</div>
};

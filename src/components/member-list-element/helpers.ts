import {formatNameToId, Member} from "../../models/Member";

export const createContributionId = (member: Member) => formatNameToId(member) + '-contribution';

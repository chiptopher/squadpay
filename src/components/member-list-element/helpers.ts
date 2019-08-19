import {formatMemberToId, Member} from "../../models/Member";

export const createContributionId = (member: Member) => formatMemberToId(member) + '-contribution';

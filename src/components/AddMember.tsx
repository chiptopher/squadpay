import * as React from "react";
import {Member} from "../models/Member";


interface Props {

    onMemberSubmit(member: Member): void
}

interface State {
    addingMember: boolean,
    nameInput: string,
    contributionInput: string
}

export class AddMember extends React.Component<Props, State> {

    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            addingMember: false,
            nameInput: "",
            contributionInput: ""
        };
    }

    render() {

        const buttonBehavior = !this.state.addingMember ? (event: any) => {
            this.setState({addingMember: true})
        } : (event: any) => {
            let createdMember = {
                name: this.state.nameInput,
                contribution: Number.parseFloat(this.state.contributionInput)
            };
            this.props.onMemberSubmit(createdMember);
            this.setState({
                addingMember: false,
                nameInput: ""
            })
        }
        return <div style={styles.container}>
            <div>
                <button id={"squadMemberAddActivate"}
                        onClick={buttonBehavior}>
                    +
                </button>
            </div>
            {
                this.state.addingMember && <div>
                    <input
                        id={'squadMemberAddName'}
                        type={'text'}
                        value={this.state.nameInput}
                        onChange={(event: any) => {
                            this.setState({
                                nameInput: event.target.value
                            });
                        }}
                    />
                    contributed $
                    <input
                        id={'squadMemberAddContribution'}
                        type={'text'}
                        value={this.state.contributionInput}
                        onChange={(event: any) => {
                            this.setState({
                                contributionInput: event.target.value
                            });
                        }}
                    />
                </div>
            }
        </div>
    }
}

const styles = {
    container: {
        display: "flex"
    }
};

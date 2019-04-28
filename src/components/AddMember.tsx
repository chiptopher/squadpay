import * as React from "react";
import {Member} from "../models/Member";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faPlus} from "@fortawesome/free-solid-svg-icons";


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
                <button style={this.state.addingMember ? styles.confirmButton : styles.defaultButton}
                        id={"squadMemberAddActivate"}
                        onClick={buttonBehavior}>
                    {this.state.addingMember ?
                        <FontAwesomeIcon icon={faCheck}/> :
                        <FontAwesomeIcon icon={faPlus}/>}
                </button>
            </div>
            {
                this.state.addingMember && <div style={{display: "flex"}}>
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
                    <span style={{paddingLeft: 5, paddingRight: 12}}>
                        contributed
                    </span>
                    <span>$</span>
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
        display: "flex",
        alignItems: "center" as "center"
    },
    defaultButton: {
        backgroundColor: "#f1c40f",
        padding: 3,
        fontSize: 24,
        borderRadius: 5,
        width: 64,
        textDecoration: "none",
        color: "#fff",
        boxShadow: "0px 5px 0px 0px #d8af0a",
        borderStyle: "none"
    },
    confirmButton: {
        backgroundColor: "#2ecc71",
        padding: 3,
        fontSize: 24,
        borderRadius: 5,
        width: 64,
        textDecoration: "none",
        color: "#fff",
        boxShadow: "0px 5px 0px 0px #25a85b",
        borderStyle: "none"
    }
};

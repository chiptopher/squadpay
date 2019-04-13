import * as React from "react";
import {SquadMate} from "../models/SquadMate";

export interface Props {

}

interface State {
    squadMates: SquadMate[];
    currentInput: string;
}

export class Dashboard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            squadMates: [],
            currentInput: ''
        }

        this.addSquadMate = this.addSquadMate.bind(this);
    }


    render() {
        return <div>
            <h1>Squad Mates</h1>
            <input
                id={'squadMateInput'}
                type={'text'}
                value={this.state.currentInput}
                onChange={(event: any) => {
                    this.setState({
                        currentInput: event.target.value
                    });
                }}
            />
            <button
                id={'squadMateButton'}
                onClick={(event) => {
                    const currentSquadMates = this.state.squadMates;
                    currentSquadMates.push({
                        name: this.state.currentInput,
                        amountSpent: 0,
                        amountContributed: 0
                    });
                    this.setState({
                        squadMates: currentSquadMates,
                        currentInput: ''
                    })
                }}>
                Add Squad Mate
            </button>
            <div>{
                this.state.squadMates.map(this.addSquadMate)
            }
            </div>
        </div>;
    }

    addSquadMate(squadMate: SquadMate) {
        return <div key={squadMate.name}>
            <div>
                {squadMate.name}
            </div>
            <div>
                <span>Amount Paid</span><input/>
            </div>
        </div>;
    }
}

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardContent, Avatar, IconButton, Divider, Collapse, Typography, CardActions, Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckIcon from '@material-ui/icons/Check';
import MoreInfoPopover from './MoreInfoPopover';
import Step1Admin from '../Step1/Step1Admin';
import Step1Client from '../Step1/Step1Client';
import Step2Admin from '../Step2/Step2Admin';
import Step2Client from '../Step2/Step2Client';
import Step3Admin from '../Step3/Step3Admin';
import Step3Client from '../Step3/Step3Client';
import Step4Admin from '../Step4/Step4Admin';
import Step4Client from '../Step4/Step4Client';
import Step5Admin from '../Step5/Step5Admin';
import Step5Client from '../Step5/Step5Client';
import Step6Admin from '../Step6/Step6Admin';
import Step6Client from '../Step6/Step6Client';
import Step7Admin from '../Step7/Step7Admin';
import Step7Client from '../Step7/Step7Client';
import Step8Admin from '../Step8/Step8Admin';
import Step8Client from '../Step8/Step8Client';
import Step9Admin from '../Step9/Step9Admin';
import Step9Client from '../Step9/Step9Client';
import Step10Admin from '../Step10/Step10Admin';
import Step10Client from '../Step10/Step10Client';
import Step11Admin from '../Step11/Step11Admin';
import Step11Client from '../Step11/Step11Client';
import VoilaVaultLink from './VoilaVaultLink';

const styles = {
    card: {
        margin: 10,
        textAlign: 'center'
    },
    expanded: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
    },
    expandedOpen: {
        transform: 'rotate(180deg)',
        marginLeft: 'auto'
    },
    cardHeader: {
        textAlign: 'center',
        fontSize: '18pt',
    },
    avatarCompleted: {
        color: '#81c784',
        backgroundColor: 'white'
    },
    completed: {
        backgroundColor: '#81c784'
    },
    vault: {
        marginLeft: 'auto'
    },
    uncompleted: {
        backgroundColor: 'black'
    },
    avatarUncompleted: {
        backgroundColor: '#af1419',
        // color: '#000',
        // fontWeight: 'bold'
    }
};

class StepCard extends Component {
    state = {
        expanded: false,
        completed: this.props.step.completed,
    };

    componentToRender = (stepNum, roleId) => {
        switch (stepNum) {
            case 1:
                if (roleId === 3) {
                    return <Step1Client userStepId={this.props.step.id} complete={this.props.step.completed} buyerName={this.props.step.firstName} />
                } else {
                    return <Step1Admin userStepId={this.props.step.id} complete={this.props.step.completed} buyerName={this.props.step.firstName} />
                }
            case 2:
                if (roleId === 3) {
                    return <Step2Client userStepId={this.props.step.id} complete={this.props.step.completed} buyerName={this.props.step.firstName} />
                } else {
                    return <Step2Admin userStepId={this.props.step.id} complete={this.props.step.completed} buyerName={this.props.step.firstName} />
                }
            case 3:
                if (roleId === 3) {
                    return <Step3Client userStepId={this.props.step.id} complete={this.props.step.completed} buyerFirstName={this.props.step.firstName} buyerLastName={this.props.step.lastName} />
                } else {
                    return <Step3Admin userStepId={this.props.step.id} complete={this.props.step.completed} buyerFirstName={this.props.step.firstName} buyerLastName={this.props.step.lastName} />
                }
            case 4:
                if (roleId === 3) {
                    return <Step4Client userStepId={this.props.step.id} complete={this.props.step.completed} buyerName={this.props.step.firstName} />
                } else {
                    return <Step4Admin userStepId={this.props.step.id} complete={this.props.step.completed} buyerName={this.props.step.firstName} />
                }
            case 5:
                if (roleId === 3) {
                    return <Step5Client userStepId={this.props.step.id} complete={this.props.step.completed} buyerName={this.props.step.firstName} />
                } else {
                    return <Step5Admin userStepId={this.props.step.id} complete={this.props.step.completed} buyerName={this.props.step.firstName} />
                }
            case 6:
                if (roleId === 3) {
                    return <Step6Client userStepId={this.props.step.id} complete={this.props.step.completed} buyerName={this.props.step.firstName} />
                } else {
                    return <Step6Admin userStepId={this.props.step.id} complete={this.props.step.completed} buyerName={this.props.step.firstName} />
                }
            case 7:
                if (roleId === 3) {
                    return <Step7Client userStepId={this.props.step.id} complete={this.props.step.completed} buyerName={this.props.step.firstName} />
                } else {
                    return <Step7Admin userStepId={this.props.step.id} complete={this.props.step.completed} buyerName={this.props.step.firstName} />
                }
            case 8:
                if (roleId === 3) {
                    return <Step8Client userStepId={this.props.step.id} complete={this.props.step.completed} buyerName={this.props.step.firstName} />
                } else {
                    return <Step8Admin userStepId={this.props.step.id} complete={this.props.step.completed} buyerName={this.props.step.firstName} />
                }
            case 9:
                if (roleId === 3) {
                    return <Step9Client userStepId={this.props.step.id} complete={this.props.step.completed} buyerName={this.props.step.firstName} />
                } else {
                    return <Step9Admin userStepId={this.props.step.id} complete={this.props.step.completed} buyerName={this.props.step.firstName} />
                }
            case 10:
                if (roleId === 3) {
                    return <Step10Client userStepId={this.props.step.id} complete={this.props.step.completed} buyerName={this.props.step.firstName} />
                } else {
                    return <Step10Admin userStepId={this.props.step.id} complete={this.props.step.completed} buyerName={this.props.step.firstName} />
                }
            case 11:
                if (roleId === 3) {
                    return <Step11Client userStepId={this.props.step.id} complete={this.props.step.completed} buyerName={this.props.step.firstName} />
                } else {
                    return <Step11Admin userStepId={this.props.step.id} complete={this.props.step.completed} buyerName={this.props.step.firstName} />
                }
            default:
                console.log('Invalid step. If you have created more steps, please add them here');

                break;
        }
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    handleComplete = () => {
        this.setState({ completed: !this.state.completed })
        setTimeout(() => {
            this.props.dispatch({ type: 'COMPLETE_STEP', id: this.props.step.id, completed: !this.props.step.completed, user_id: this.props.step.user_id })
        }, 250);

    }

    render() {

        return (
            <div>
                <Card style={styles.card}>
                    <CardHeader
                        style={this.state.completed ? styles.completed : null}
                        avatar={this.state.completed ? <Avatar style={styles.avatarCompleted}><CheckIcon /></Avatar> : <Avatar style={styles.avatarUncompleted}>{this.props.step.order}</Avatar>}
                        title={<Typography style={styles.cardHeader}>{this.props.step.name}</Typography>}
                        action={<MoreInfoPopover content={this.props.step.description} />}
                    />
                    <CardActions disableSpacing sizes="small">
                        {this.props.showVault(this.props.step.order) ? <VoilaVaultLink link={this.props.step.dropboxUrl}/> : ''}
                        <IconButton style={this.state.expanded ? styles.expandedOpen : styles.expanded}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="Show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent >
                            {this.componentToRender(this.props.step.order, this.props.user.role_id)}

                            {this.props.user.role_id === 3
                                ? ''
                                :
                                <>
                                    <br />
                                    <Divider variant="middle" />
                                    <br />
                                    <Button
                                        variant="outlined"
                                        style={this.state.completed ? styles.completed : null}
                                        onClick={this.handleComplete}>
                                        Complete
                                    </Button>
                                </>
                            }
                        </CardContent>
                    </Collapse>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(StepCard);
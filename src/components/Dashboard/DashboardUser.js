import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RadialProgress } from 'react-radial-progress-indicator';
import './Dashboard.css';
import { withRouter } from 'react-router-dom'

// Material UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

//this component shows the client's dashboard with their buying journey status.

const styles = {
    card: {
        maxWidth: 300,
        margin: 'auto',
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        },
        marginTop: 40,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    media: {
        height: 200,
        width: '100%'
    },
    radialDiv: {
        marginBottom: 12,
    }
};


class DashboardUser extends Component {
    state = {
        stepsCompleted: 0
    }

    componentDidMount() {
        this.props.dispatch({ type: 'GET_JOURNEY' })
        setTimeout(() => {
            this.getStatusPercentage()
        }, 1000);
    }

    getStatusPercentage = () => {
        if (this.props.userJourney.loading) {
            return false;
        }
        else {
            this.props.userJourney.forEach(step => {
                if (step.completed) {
                    this.setState({ stepsCompleted: this.state.stepsCompleted + 1 })
                }
            })
        }
    }

    journey = () => {
        this.props.history.push(`/buyer-journey/${this.props.user.id}`)
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <h3 className="h3User">Buying Journey</h3>
                <Card className={classes.card} onClick={this.journey}>
                    <CardContent>
                        <Typography className={classes.title} gutterBottom color="secondary">
                            Check Your Progress
                        </Typography>
                        <Typography className={classes.radialDiv}>
                            {this.props.userJourney.loading ? <CircularProgress color="secondary" /> : <RadialProgress
                                width={60}
                                height={60}
                                ringBgColour="#ccc"
                                ringFgColour="#3c763d"
                                ringIntermediateColour="#aaa"
                                ringThickness={0.3}
                                backgroundColour="#dff0d8"
                                backgroundTransparent
                                duration={5000}
                                fontRatio={2}
                                steps={11}
                                step={this.state.stepsCompleted}
                            />}
                        </Typography>
                        <CardMedia
                            className={classes.media}
                            image={require('./real.jpg')}
                            title="House"
                        />
                    </CardContent>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    userJourney: state.userJourney,
});

DashboardUser.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(connect(mapStateToProps)(DashboardUser)));
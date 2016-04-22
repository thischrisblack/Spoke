import React from 'react'
import AppBar from 'material-ui/AppBar'
import { AssignmentSummaryList } from '../components/assignment_summary_list'
import { Assignments } from '../../api/assignments/assignments.js'
import { Texter } from '../components/texter'
import Drawer from 'material-ui/Drawer'
import { FlowRouter } from 'meteor/kadira:flow-router'

export class AssignmentPage extends React.Component {
  constructor(props) {
    super(props)
    this.handleTouchTapLeftIconButton = this.handleTouchTapLeftIconButton.bind(this)
    this.onChangeList = this.onChangeList.bind(this)
    this.state = { navDrawerOpen: false }
  }

  componentWillReceiveProps({ loading, assignment }) {
    // redirect / to an assignment if possible
    // TODO this is not the right way to do this
    if (!loading && !assignment) {
      const newAssignment = Assignments.findOne()
      this.navigateToAssignmentId(newAssignment._id)
    }
  }

  onChangeList(assignmentId) {
    this.navigateToAssignmentId(assignmentId)
    this.setState({ navDrawerOpen: false })
  }

  navigateToAssignmentId(assignmentId) {
    FlowRouter.go(`/assignments/${assignmentId}`)
  }

  handleTouchTapLeftIconButton() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    })
  }

  render() {
    const { assignment, assignments, contacts } = this.props
    return (<div>
      <Drawer open={this.state.navDrawerOpen}
        docked={false}
        onRequestChange={(navDrawerOpen) => this.setState({ navDrawerOpen })}
      >
        <AssignmentSummaryList onChangeList={this.onChangeList} assignments={assignments} />
      </Drawer>
      <AppBar
        title="Townsquare Texting"
        onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
      />
      {assignment && contacts.length > 0 ? <Texter assignment={assignment} contacts={contacts} /> : ''}
    </div>)
  }
}

AssignmentPage.propTypes = {
  assignment: React.PropTypes.object,      // current assignment
  assignments: React.PropTypes.array,   // all assignments for showing in sidebar
  loading: React.PropTypes.bool,     // subscription status
  contacts: React.PropTypes.array   // contacts for current assignment
}
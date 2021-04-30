import React from 'react';
import { connect } from 'react-redux'
import Searchbox from '../Components/Searchbox.js'
import CardList from '../Components/CardList.js';
import Scroll from '../Components/Scroll.js';
import ErrorBoundry from '../Components/ErrorBoundry.js'
import './App.css';

import { requestRobots, setSearchField } from '../action.js'

const mapStateToProps = (state) => {
    return {
        searchField: state.searchRobots.searchField, //creates a prop and maps a state from store to it and passes it to App.js
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)), //takes the searchChange prop dispatches it as an action which is passed on to the reducer
    onRequestRobots: () => dispatch(requestRobots())
    }
}

class App extends React.Component {

    componentDidMount() {
        this.props.onRequestRobots();
    }   
    
    render() {
        const { searchField, onSearchChange, robots, isPending } = this.props 
        const filteredRobots = robots.filter(
            robot=> {
                return robot.name.toLowerCase().includes(searchField.toLowerCase())
            }
        )

        return isPending ?
        <h1>Loading</h1> :    
        (
            <div className='tc'>
                <h1 className="f-headline">Robofriends</h1>
                <Searchbox searchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots = { filteredRobots }/>
                    </ErrorBoundry>
                    
                </Scroll>
            </div>        
        );
    }
}
  

export default connect(mapStateToProps, mapDispatchToProps)(App);
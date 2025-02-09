import {Component} from 'react'
import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="bgCont">
          <h1 className="FindThe">Find The Job That Fits Your Life</h1>
          <p className="Millions">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button className="FindJobs" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </>
    )
  }
}

export default Home

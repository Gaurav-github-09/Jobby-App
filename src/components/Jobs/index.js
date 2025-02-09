import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import Header from '../Header'

import ProfileCard from '../ProfileCard'

import SalaryList from '../SalaryList'

import EmploymentTypesList from '../EmploymentTypesList'

import JobItemDetails from '../JobItemDetails'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const result = {loading: 'load', success: 'success', failed: 'fail'}

class Jobs extends Component {
  state = {
    apiStatus: result.loading,
    salaryChange: '',
    employmentChanges: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({
      apiStatus: result.loading,
    })

    const jwtToken = Cookies.get('jwt_token')
    const {salaryChange, employmentChanges, searchInput} = this.state
    const search = searchInput
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentChanges.join(
      ',',
    )}&minimum_package=${salaryChange}&search=${search}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: result.success,
      })
    } else {
      this.setState({
        apiStatus: result.failed,
      })
    }
  }

  salarytypes = salary => {
    this.setState({salaryChange: salary}, this.getJobDetails)
  }

  employementTypes = type => {
    const {employmentChanges} = this.state

    const check = employmentChanges.includes(type)

    if (check) {
      const list = employmentChanges.filter(each => each !== type)
      this.setState({employmentChanges: list}, this.getJobDetails)
      return
    }

    this.setState(
      prev => ({
        employmentChanges: [...prev.employmentChanges, type],
      }),
      this.getJobDetails,
    )
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterKey = event => {
    if (event.key === 'Enter') {
      this.getJobDetails()
    }
  }

  loader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  jobsRenderFailed = () => (
    <div className="failureCont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failureImg"
      />
      <h1 className="failureHeading">Oops! Something Went Wrong</h1>
      <p className="failurePara">
        we cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        data-testid="button"
        className="jobsFailureBtn"
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  noJobsList = () => (
    <div className="failureCont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="failureImg"
      />
      <h1 className="failureHeading">No jobs found</h1>
      <p className="failurePara">
        we could not find any jobs. Try other filters.
      </p>
    </div>
  )

  jobListResult = () => {
    const {jobsList, apiStatus} = this.state

    switch (apiStatus) {
      case result.loading:
        return this.loader()
      case result.success:
        return jobsList.length > 0 ? (
          <ul className="jobsUnordered">
            {jobsList.map(each => (
              <JobItemDetails key={each.id} jobItem={each} />
            ))}
          </ul>
        ) : (
          this.noJobsList()
        )
      case result.failed:
        return this.jobsRenderFailed()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <>
        <Header />
        <div className="jobCont">
          <div className="mainCard1">
            <div className="search-input">
              <input
                type="search"
                className="searchInput"
                placeholder="Search"
                value={searchInput}
                onChange={this.changeSearchInput}
                onKeyDown={this.onEnterKey}
              />
              <button
                onClick={this.getJobDetails}
                className="searchBtn"
                data-testid="searchButton"
                type="button"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <ProfileCard />
            <hr className="horizontal" />
            <h1 className="headingTypes">Type of Employment</h1>
            <ul className="unord">
              {employmentTypesList.map(each => (
                <EmploymentTypesList
                  updateEmpTypes={this.employementTypes}
                  key={each.employmentTypeId}
                  employmentDetails={each}
                />
              ))}
            </ul>
            <hr className="horizontal" />
            <h1 className="headingTypes">Salary Range</h1>
            <ul className="unord">
              {salaryRangesList.map(each => (
                <SalaryList
                  salaryRange={this.salarytypes}
                  key={each.salaryRangeId}
                  salaryDetails={each}
                />
              ))}
            </ul>
          </div>
          <div className="mainCard2">
            <div className="search-input2">
              <input
                type="search"
                className="searchInput"
                placeholder="Search"
                value={searchInput}
                onChange={this.changeSearchInput}
                onKeyDown={this.onEnterKey}
              />
              <button
                className="searchBtn"
                data-testid="searchButton"
                type="button"
                onClick={this.getJobDetails}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.jobListResult()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs

import {Component} from 'react'

import {AiFillStar} from 'react-icons/ai'

import {MdLocationOn} from 'react-icons/md'

import {BsBriefcaseFill} from 'react-icons/bs'

import {BiLinkExternal} from 'react-icons/bi'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import SkillItemCard from '../SkillItemCard'

import SimilarItem from '../SimilarItem'

import './index.css'

const result = {loading: 'load', success: 'success', failed: 'fail'}

class JobCard extends Component {
  state = {
    apiStatus: result.loading,
    jobItem: '',
    similarJobItems: [],
    idUpdate: '',
  }

  componentDidMount() {
    this.getJobSpecificDetails()
  }

  getJobSpecificDetails = async () => {
    this.setState({
      apiStatus: result.loading,
    })
    window.scrollTo(0, 0)

    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    let url = `https://apis.ccbp.in/jobs/${id}`

    const {idUpdate} = this.state
    if (idUpdate !== '') {
      url = `https://apis.ccbp.in/jobs/${idUpdate}`
    }

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobitemData = data.job_details
      const updatedJobdata = {
        companyLogoUrl: jobitemData.company_logo_url,
        companyWebsiteUrl: jobitemData.company_website_url,
        employmentType: jobitemData.employment_type,
        jobDescription: jobitemData.job_description,
        lifeAtCompany: jobitemData.life_at_company,
        location: jobitemData.location,
        packagePerAnnum: jobitemData.package_per_annum,
        rating: jobitemData.rating,
        skills: jobitemData.skills,
        title: jobitemData.title,
        id: jobitemData.id,
      }
      this.setState({
        jobItem: updatedJobdata,
        similarJobItems: data.similar_jobs,
        apiStatus: result.success,
      })
    } else {
      this.setState({
        apiStatus: result.failed,
      })
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
        className="failureImg failedimg2"
      />
      <h1 className="failureHeading">Oops! Something Went Wrong</h1>
      <p className="failurePara">
        we cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        data-testid="button"
        className="jobsFailureBtn"
        onClick={this.getJobSpecificDetails}
      >
        Retry
      </button>
    </div>
  )

  refresh = id => {
    this.setState({idUpdate: id}, this.getJobSpecificDetails)
  }

  onSuccess = () => {
    const {jobItem, similarJobItems} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobItem

    return (
      <>
        <div className="JobItemListCont JobItemListCont2">
          <div className="logoContainerJob">
            <img
              className="companyLogo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="titleContJI">
              <h1 className="titleJI">{title}</h1>
              <div className="ratingCont">
                <AiFillStar className="star" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="typeAndLocCont">
            <div className="typeAndLoc">
              <div className="typeAndLoc">
                <MdLocationOn className="location" />
                <p className="loc">{location}</p>
              </div>
              <div className="typeAndLoc">
                <BsBriefcaseFill className="location" />
                <p className="loc">{employmentType}</p>
              </div>
            </div>
            <p className="loc">{packagePerAnnum}</p>
          </div>
          <hr className="horizontal1" />
          <div>
            <div className="descCont">
              <h1 className="Description">Description</h1>
              <a className="visit-link" href={companyWebsiteUrl} target="blank">
                Visit
                <BiLinkExternal className="bi-link" />
              </a>
            </div>
            <p className="jobDescription">{jobDescription}</p>
          </div>
          <h1 className="SkillsHeading">Skills</h1>
          <ul className="skillUnorderedCont">
            {skills.map(each => (
              <SkillItemCard key={each.name} eachSkill={each} />
            ))}
          </ul>
          <h1 className="lifeAtCompany">Life At Company</h1>
          <div className="lifeAtCont">
            <p className="lifeAtCompanyDesc">{lifeAtCompany.description}</p>
            <img
              className="lifeAtCompanyLogo"
              src={lifeAtCompany.image_url}
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="similarJobs">Similar Jobs</h1>
        <ul className="similarJobsCont">
          {similarJobItems.map(each => (
            <SimilarItem
              refresh={this.refresh}
              key={each.id}
              eachSimilarItem={each}
            />
          ))}
        </ul>
      </>
    )
  }

  getResult = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case result.success:
        return this.onSuccess()
      case result.loading:
        return this.loader()
      case result.failed:
        return this.jobsRenderFailed()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobSpeCont">{this.getResult()}</div>
      </>
    )
  }
}

export default JobCard

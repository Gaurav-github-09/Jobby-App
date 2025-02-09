import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const result = {loading: 'load', success: 'success', failed: 'fail'}

class ProfileCard extends Component {
  state = {apiStatus: result.loading}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: result.loading, profileDetails: []})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const profileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: profileData,
        apiStatus: result.success,
      })
    } else {
      this.setState({
        apiStatus: result.failed,
      })
    }
  }

  onSuccess = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profileCont">
        <img className="profPic" src={profileImageUrl} alt="profile" />
        <h1 className="nameProf">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  onFailed = () => (
    <div className="failureContainer">
      <button
        type="button"
        className="profileFailButton"
        onClick={this.getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  onLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case result.success:
        return this.onSuccess()
      case result.failed:
        return this.onFailed()
      case result.loading:
        return this.onLoading()
      default:
        return null
    }
  }
}

export default ProfileCard

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {Link} from 'react-router-dom'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobItemDetails = props => {
  const {jobItem} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobItem

  return (
    <li className="JobItemListCont">
      <Link to={`/jobs/${id}`} className="JobCardlLink">
        <div className="logoContainerJob">
          <img
            className="companyLogo"
            src={companyLogoUrl}
            alt="company logo"
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
          <h1 className="Description">Description</h1>
          <p className="jobDescription">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobItemDetails

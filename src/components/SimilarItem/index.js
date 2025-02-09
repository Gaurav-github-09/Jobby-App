import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import {MdLocationOn} from 'react-icons/md'

import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarItem = props => {
  const {eachSimilarItem, refresh} = props
  const {rating, title, location, id} = eachSimilarItem

  const cardClicked = () => {
    refresh(id)
  }

  return (
    <Link className="SimilarItemListCont" to={`/jobs/${id}`}>
      <li onClick={cardClicked} className="JobItemListCont JobItemListCont0">
        <div className="logoContainerJob">
          <img
            className="companyLogo"
            src={eachSimilarItem.company_logo_url}
            alt="similar job company logo"
          />
          <div className="titleContJI">
            <h1 className="titleJI">{title}</h1>
            <div className="ratingCont">
              <AiFillStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div>
          <h1 className="Description">Description</h1>
          <p className="jobDescription">{eachSimilarItem.job_description}</p>
        </div>
        <div className="typeAndLoc">
          <div className="typeAndLoc">
            <MdLocationOn className="location" />
            <p className="loc">{location}</p>
          </div>
          <div className="typeAndLoc">
            <BsBriefcaseFill className="location" />
            <p className="loc">{eachSimilarItem.employment_type}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default SimilarItem

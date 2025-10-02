import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsBoxArrowUpRight} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn, MdWork} from 'react-icons/md'
import SimilarJobItem from '../SimilarJobItem'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  formatJobDetails = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    skills: data.skills.map(skill => ({
      name: skill.name,
      imageUrl: skill.image_url,
    })),
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
  })

  formatSimilarJob = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const jobDetails = this.formatJobDetails(data.job_details)
      const similarJobs = data.similar_jobs.map(each =>
        this.formatSimilarJob(each),
      )
      this.setState({
        jobDetails,
        similarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getJobDetails()
  }

  renderFailureView = () => (
    <div className="job-details-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetailsView = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails

    return (
      <>
        <Header />
        <div className="job-item-details-success">
          <div className="job-item-card">
            <div className="job-card-header">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="job-card-logo"
              />
              <div className="job-card-title-section">
                <h1 className="job-title">{title}</h1>
                <div className="rating-section">
                  <AiFillStar className="rating-star" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>

            <div className="job-card-details">
              <div className="location-employment">
                <div className="detail-item">
                  <MdLocationOn className="detail-icon" />
                  <p className="detail-text">{location}</p>
                </div>
                <div className="detail-item">
                  <MdWork className="detail-icon" />
                  <p className="detail-text">{employmentType}</p>
                </div>
              </div>
              <p className="package">{packagePerAnnum}</p>
            </div>

            <hr className="divider" />

            <div className="description-header">
              <h1 className="description-heading">Description</h1>
              <a
                href={companyWebsiteUrl}
                target="_blank"
                rel="noreferrer"
                className="visit-link"
              >
                Visit <BsBoxArrowUpRight />
              </a>
            </div>

            <p className="description">{jobDescription}</p>

            <h1 className="skills-heading">Skills</h1>
            <ul className="skills-list">
              {skills.map(skill => (
                <li key={skill.name} className="skill-item">
                  <img
                    src={skill.imageUrl}
                    alt={skill.name}
                    className="skill-image"
                  />
                  <p className="skill-name">{skill.name}</p>
                </li>
              ))}
            </ul>

            <h1 className="life-heading">Life at Company</h1>
            <div className="life-at-company-section">
              <p className="life-description">{lifeAtCompany.description}</p>
              <img
                src={lifeAtCompany.imageUrl}
                alt="life at company"
                className="life-image"
              />
            </div>
          </div>

          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list">
            {similarJobs.map(job => (
              <SimilarJobItem jobDetails={job} key={job.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default JobItemDetails

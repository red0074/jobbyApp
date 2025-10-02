import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Profile from '../Profile'
import FiltersGroup from '../FiltersGroup'
import JobCard from '../JobCard'
import FailureView from '../FailureView'
import NoJobsView from '../NoJobsView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobsRoute extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    employmentTypes: [],
    minimumPackage: '',
    activeLocations: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {
      employmentTypes,
      minimumPackage,
      activeLocations,
      searchInput,
    } = this.state
    const employmentString = employmentTypes.join(',')
    const locationString = activeLocations.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentString}&minimum_package=${minimumPackage}&search=${searchInput}&location=${locationString}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const updatedJobs = data.jobs.map(job => ({
        id: job.id,
        title: job.title,
        rating: job.rating,
        location: job.location,
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        packagePerAnnum: job.package_per_annum,
        jobDescription: job.job_description,
      }))
      this.setState({
        jobsList: updatedJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeEmployment = type => {
    this.setState(prevState => {
      const updatedTypes = prevState.employmentTypes.includes(type)
        ? prevState.employmentTypes.filter(each => each !== type)
        : [...prevState.employmentTypes, type]
      return {employmentTypes: updatedTypes}
    }, this.getJobs)
  }

  onChangeSalary = salary => {
    this.setState({minimumPackage: salary}, this.getJobs)
  }

  onChangeLocation = locationId => {
    this.setState(prevState => {
      const updatedLocations = prevState.activeLocations.includes(locationId)
        ? prevState.activeLocations.filter(each => each !== locationId)
        : [...prevState.activeLocations, locationId]
      return {activeLocations: updatedLocations}
    }, this.getJobs)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getJobs()
  }

  renderJobs = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return <NoJobsView />
    }

    return (
      <ul className="jobs-list">
        {jobsList.map(job => (
          <JobCard key={job.id} jobDetails={job} />
        ))}
      </ul>
    )
  }

  renderJobsContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobs()
      case apiStatusConstants.failure:
        return <FailureView onRetry={this.getJobs} />
      case apiStatusConstants.inProgress:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    const {
      employmentTypes,
      minimumPackage,
      activeLocations,
      searchInput,
    } = this.state

    return (
      <>
        <Header />
        <div className="jobs-route">
          <div className="jobs-filters-section">
            <Profile />
            <FiltersGroup
              selectedTypes={employmentTypes}
              selectedSalary={minimumPackage}
              selectedLocations={activeLocations}
              onChangeType={this.onChangeEmployment}
              onChangeSalary={this.onChangeSalary}
              onChangeLocation={this.onChangeLocation}
            />
          </div>
          <div className="jobs-content-section">
            <div className="search-bar">
              <input
                type="search"
                value={searchInput}
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.onClickSearch}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/search-icon.png"
                  alt="search icon"
                  className="search-icon"
                />
              </button>
            </div>
            {this.renderJobsContent()}
          </div>
        </div>
      </>
    )
  }
}

export default JobsRoute

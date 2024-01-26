import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = props => {
  const onClickFindJobs = () => {
    const {history} = props
    history.push('/jobs')
  }

  return (
    <>
      <Header />
      <div className="home_container">
        <h1 className="home_heading">Find The Job That Fits Your Life</h1>
        <p className="home_para">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button className="job_btn" type="button" onClick={onClickFindJobs}>
            Find Jobs
          </button>
        </Link>
      </div>
    </>
  )
}
export default Home

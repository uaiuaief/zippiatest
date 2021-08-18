import React, { Component } from 'react';
import Card from "../../components/Card"
import Head from 'next/head'


class jobs extends Component {
    state = {
        jobs: null,

        companyNameFilter: null,
        dateFilter: false,
    }

    filterJobs = (jobs) => {
        const filtered = this.filterByDate(this.filterByCompanyName(jobs))
        return filtered
    }

    filterByCompanyName = (jobs) => {
        if (!this.state.companyNameFilter) return jobs


        let regex = new RegExp(this.state.companyNameFilter.toLowerCase())
        const filtered = jobs.filter(each => {
            if (regex.test(each.companyName.toLowerCase())) {
                return true
            }
            else {
                return false
            }

        })

        return filtered
    }

    filterByDate = (jobs) => {
        if (!this.state.dateFilter) return jobs

        const filtered = jobs.filter(each => {
            let postdate = new Date(each.OBJpostingDate)
            let today = new Date;
            let oneweekago = new Date().setDate(today.getDate() - 7)

            if (postdate > oneweekago) {
                return true
            }
            else {
                return false
            }
        })

        return filtered
    }

    componentDidMount() {
        fetch("https://www.zippia.com/api/jobs/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "companySkills": true,
                "dismissedListingHashes": [],
                "fetchJobDesc": true,
                "jobTitle": "Business Analyst",
                "locations": [],
                "numJobs": 20,
                "previousListingHashes": []
            })
        }).then(res => {
            res.json().then(data => {
                this.setState({
                    jobs: data.jobs
                })
            })
        })
    }
    render() {
        return (
            <div id="main-container">
                <Head>
                    <title>Zippia Test</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <h1 className="title">Developer Jobs Near me</h1>
                <div id="jobs-container">
                    <div className="search-options">
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            this.setState({
                                companyNameFilter: document.getElementById('search-input').value
                            })
                        }}>
                            <input
                                id="search-input"
                                placeholder="Enter a Company Name"
                            />
                            <button
                                className="primary-btn"
                                type="submit"
                            >
                                Search
                            </button>
                            <button
                                className={this.state.dateFilter ? "secondary-btn active" : "secondary-btn"}
                                type="submit"
                                onClick={() => {
                                    this.setState({
                                        dateFilter: !this.state.dateFilter
                                    })
                                }}
                            >
                                Recent Jobs
                            </button>
                        </form>
                    </div>
                    <div className="job-list">
                        {
                            this.state.jobs
                                ?
                                this.filterJobs(this.state.jobs.slice(0, 10)).map(job => {
                                    return (
                                        <Card
                                            key={job.listingHash}
                                            jobTitle={job.jobTitle}
                                            companyName={job.companyName}
                                            shortDesc={job.shortDesc}
                                        />
                                    )
                                })
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default jobs;

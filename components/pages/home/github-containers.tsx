import moment from 'moment';
import { useEffect, useState } from 'react';
import { GitHubUserRepo } from '../../../lib/types/github/github-user-data.type';
import RepoRecord from './github-repo';

export interface GitHubContainersProps {
  gitHubData: GitHubUserRepo[];
}

export type GHDataState = {
  forks: GitHubUserRepo[];
  repos: GitHubUserRepo[];
};

const GitHubContainers = ({ gitHubData }: GitHubContainersProps) => {
  const [data, setData] = useState<GHDataState>({
    forks: [],
    repos: [],
  });

  useEffect(() => {
    let repos: GitHubUserRepo[] = [];
    let forks: GitHubUserRepo[] = [];

    // Todo: Separate fork repos from my repos into 2 different arrays
    gitHubData.forEach((repo: GitHubUserRepo) => {
      if (repo.fork) {
        forks.push(repo);
      } else {
        repos.push(repo);
      }
    });

    const repoData: GHDataState = {
      forks,
      repos,
    };

    setData(repoData);
  }, []);

  return (
    <section id="accordion-collapse" data-accordion="collapse">
      <h2 id="accordion-collapse-heading-1">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          data-accordion-target="#accordion-collapse-body-1"
          aria-controls="accordion-collapse-body-1"
        >
          <span>Open-Source Projects</span>
          <svg
            data-accordion-icon
            className="w-6 h-6 rotate-180 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </h2>
      <div
        id="accordion-collapse-body-1"
        className="hidden"
        aria-labelledby="accordion-collapse-heading-1"
      >
        {/* Inside Content of Header 1 */}
        <div className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          {data.forks.length > 0 ? (
            data.forks.slice(0, 4).map((fork) => <RepoRecord key={fork.name} repo={fork} />)
          ) : (
            <NoDataToDisplay />
          )}
        </div>
      </div>

      {/* <-- Separation --> */}
      <h2 id="accordion-collapse-heading-2">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          data-accordion-target="#accordion-collapse-body-2"
          aria-expanded="false"
          aria-controls="accordion-collapse-body-2"
        >
          <span>My Own Projects</span>
          <svg
            data-accordion-icon
            className="w-6 h-6 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </h2>
      <div
        id="accordion-collapse-body-2"
        className="hidden"
        aria-labelledby="accordion-collapse-heading-2"
      >
        <div className="p-5 font-light border border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          {data.repos.length > 0 ? (
            data.repos.slice(0, 4).map((repo) => <RepoRecord key={repo.name} repo={repo} />)
          ) : (
            <NoDataToDisplay />
          )}
        </div>
      </div>
    </section>
  );
};

const NoDataToDisplay = () => {
  return <p className="text-center font-medium">No data to display</p>;
};

export default GitHubContainers;
